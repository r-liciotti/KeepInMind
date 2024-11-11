import { fetchWeatherApi } from "openmeteo";
import { WeatherDayData } from "../interfaces/WeatherInterface";
import { getData, saveData } from "../db";

async function getHistoricalTemperatures(
  storageKey: string,
  _lat: number,
  _long: number,
  desiredLength: number
): Promise<WeatherDayData[]> {
  const params = {
    latitude: _lat,
    longitude: _long,
    start_date: "1950-09-20",
    end_date: "2024-09-30",
    daily: ["temperature_2m_max", "temperature_2m_min", "temperature_2m_mean"],
    timezone: "Europe/London",
  };

  // Recupera i dati dalla cache IndexedDB
  const cachedData = await getData(storageKey);
  console.log("cachedData", cachedData);
  console.log("desiredLength ", desiredLength);



  if (
    cachedData &&
    ((cachedData.data.latitudeNumber && cachedData.data.longitudeNumber && _lat === cachedData.data.latitudeNumber && _long === cachedData.data.longitudeNumber) || (!cachedData.data.latitudeNumber && !cachedData.data.longitudeNumber))
  ) {

    const now = new Date();
    const lastFetched = new Date(cachedData.data.timestamp);
    const isDataRecent =
      now.getTime() - lastFetched.getTime() < 24 * 60 * 60 * 1000;

    if (isDataRecent) {
      console.log("Dati recuperati da IndexedDB:", cachedData.data);
      return adjustDataLength(cachedData.data.data, desiredLength);
    }
  }
  console.log("Non ci sono dati nella cache, li ricarichiamo dall'API");

  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const daily = response.daily()!;

  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      temperature2mMean: daily.variables(2)!.valuesArray()!,
    },
  };

  const dataOutput = transformWeatherData(weatherData.daily);
  console.log("Dati recuperati dall'API:", dataOutput);
  console.log("storageKey", storageKey);

  // Salva i dati in IndexedDB
  await saveData(storageKey, {
    data: dataOutput,
    timestamp: new Date().toISOString(),
  });
  console.log("Salvato");
  return adjustDataLength(dataOutput, desiredLength);
}

// Trasforma i dati ricevuti in un Array di oggetti adatti per l'utilizzo di Recharts.js
function transformWeatherData(dailyData: any): WeatherDayData[] {
  const { time, temperature2mMax, temperature2mMin, temperature2mMean } =
    dailyData;

  return time.map((date: Date, index: number) => ({
    time: date,
    TimeRanges: `${time[index]} - ${time[index + 1]}`,
    temperature2mMax: temperature2mMax[index],
    temperature2mMin: temperature2mMin[index],
    temperature2mMean: temperature2mMean[index],
  }));
}

// Riduce l'array nella grandezza desiderata facendo la media dei valori
function adjustDataLength(
  data: WeatherDayData[],
  desiredLength: number
): WeatherDayData[] {
  const dataLength = data.length;
  console.log("data", data);
  console.log(typeof data);


  if (dataLength <= desiredLength) {
    return data;
  }

  const subsetSize = Math.floor(dataLength / desiredLength);
  const result: WeatherDayData[] = [];

  for (let i = 0; i < desiredLength; i++) {
    let subset;

    if (i === desiredLength - 1) {
      subset = data.slice(i * subsetSize);
    } else {
      subset = data.slice(i * subsetSize, (i + 1) * subsetSize);
    }

    const averageData = calculateAverage(subset);
    result.push(averageData);
  }
  console.log("Dati aggregati:", result);

  return result;
}

// Funzione per calcolare la media dei valori di un sottoinsieme di dati
function calculateAverage(subset: WeatherDayData[]): WeatherDayData {
  const totalEntries = subset.length;

  const sum = subset.reduce(
    (acc, entry) => {
      acc.temperature2mMax += entry.temperature2mMax;
      acc.temperature2mMin += entry.temperature2mMin;
      acc.temperature2mMean += entry.temperature2mMean;
      return acc;
    },
    { temperature2mMax: 0, temperature2mMin: 0, temperature2mMean: 0 }
  );

  return {
    time: subset[totalEntries - 1].time,
    timeRange: `${subset[0].time} - ${subset[totalEntries - 1].time}`,
    temperature2mMax: sum.temperature2mMax / totalEntries,
    temperature2mMin: sum.temperature2mMin / totalEntries,
    temperature2mMean: sum.temperature2mMean / totalEntries,
  };
}

export default getHistoricalTemperatures;
