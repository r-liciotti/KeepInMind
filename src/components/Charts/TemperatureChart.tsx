import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import getHistoricalTemperatures from "../../services/getHistoricalTemperatures";
import { useState } from "react";
import Counter from "./Counter";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import TempIncrease from "./TempIncrease";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorComponent from "../Error/ErrorComponent";
import { State } from "../../interfaces/Country";
import { format } from "date-fns";
import { SpinnerLoader } from "../Loader/SpinnerLoader";

interface TemperatureChartProps {
  state: State;
}
function TemperatureChart({ state }: TemperatureChartProps) {
  const [lungArray, setLungArray] = useState(5);

  const WeatherStorageKey = useSelector(
    (state: RootState) => state.stateSelection.WeatherStorageKey
  );

  console.log("TemperatureChart Compontent", WeatherStorageKey);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [
      "historicalDataTemp",
      state.name,
      state.latitudeNumber,
      state.longitudeNumber,
      lungArray,
    ],
    queryFn: () =>
      getHistoricalTemperatures(
        WeatherStorageKey,
        state.latitudeNumber,
        state.longitudeNumber,
        lungArray
      ),
    enabled: !!lungArray, // La query si attiva quando lungArray è valido (non nullo)
  });

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <ErrorComponent error={error} />;

  const formatXAxis = (tickItem: Date) => format(tickItem, "dd/MM/yyyy");

  return (
    <React.Fragment>
      <div className="flex gap-5">
        <Counter count={lungArray} setCount={setLungArray} />
        <TempIncrease storageKey={WeatherStorageKey} />
      </div>
      <div className="flex h-[300px]">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              tickFormatter={formatXAxis}
            />
            <YAxis unit={"°C"} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature2mMean"
              name="Mean"
              stroke="#fe6a35"
            />
            <Line
              type="monotone"
              dataKey="temperature2mMax"
              name="Max"
              stroke="#544fc5"
            />
            <Line
              type="monotone"
              dataKey="temperature2mMin"
              name="Min"
              stroke="#00e272"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}

export default TemperatureChart;
