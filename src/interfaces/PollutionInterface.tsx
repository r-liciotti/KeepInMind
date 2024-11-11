export interface HourlyPollutionData {
  time: string[];
  pm10: { [key: string]: number };
  pm25: { [key: string]: number };
  carbonMonoxide: { [key: string]: number };
  carbonDioxide: { [key: string]: number };
  nitrogenDioxide: { [key: string]: number };
  dust: { [key: string]: number };
  europeanAqi: { [key: string]: number };
}

export interface PollutionData {
  time: Date;
  pm10: number;
  pm25: number;
  carbonMonoxide: number;
  tempercarbonDioxideature2mMean: number;
  nitrogenDioxide: number;
  dust: number;
  europeanAqi: number;
}
