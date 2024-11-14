import { fetchWeatherApi } from 'openmeteo';
import { getData, saveData } from '../db';
import { PollutionData } from '../interfaces/PollutionInterface';


async function getPollutionData(storageKey: string,
    _lat: number,
    _long: number
) {

    const params = {
        "latitude": _lat,
        "longitude": _long,
        "hourly": ["pm10", "pm2_5", "carbon_monoxide", "carbon_dioxide", "nitrogen_dioxide", "dust", "european_aqi"],
        "timezone": "Europe/London",
        "past_days": 7,
        "forecast_days": 1
    };

    // console.log("PollutionStorageKey", storageKey);

    const cachedData = await getData(storageKey);

    if (cachedData) {
        const now = new Date();
        const lastFetched = new Date(cachedData.data.timestamp);
        const isDataRecent =
            now.getTime() - lastFetched.getTime() < 24 * 60 * 60 * 1000;

        if (isDataRecent) {
            //  console.log("Dati recuperati da IndexedDB:", cachedData.data.data);
            return cachedData.data.data;
        }
    }

    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const hourlyPollutionData = {

        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            pm10: hourly.variables(0)!.valuesArray()!,
            pm25: hourly.variables(1)!.valuesArray()!,
            carbonMonoxide: hourly.variables(2)!.valuesArray()!,
            carbonDioxide: hourly.variables(3)!.valuesArray()!,
            nitrogenDioxide: hourly.variables(4)!.valuesArray()!,
            dust: hourly.variables(5)!.valuesArray()!,
            europeanAqi: hourly.variables(6)!.valuesArray()!,
        },

    };


    const dataOutput = transformPollutionData(hourlyPollutionData.hourly);

    // Salva i dati in IndexedDB
    await saveData(storageKey, {
        data: dataOutput,
        timestamp: new Date().toISOString(),
    });

    // console.log("Salvato");
    return dataOutput;
}

function transformPollutionData(hourlyData: any): PollutionData[] {
    const { time, pm10, pm25, carbonMonoxide, carbonDioxide, nitrogenDioxide, dust, europeanAqi } =
        hourlyData;

    return time.map((date: Date, index: number) => ({
        time: date,
        pm10: pm10[index],
        pm25: pm25[index],
        carbonMonoxide: carbonMonoxide[index],
        carbonDioxide: carbonDioxide[index],
        nitrogenDioxide: nitrogenDioxide[index],
        dust: dust[index],
        europeanAqi: europeanAqi[index],
    }));
}

export default getPollutionData