import React, { useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import getHistoricalTemperatures from "../../services/getHistoricalTemperatures";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorComponent from "../Error/ErrorComponent";
import Counter from "./Counter";
import TempIncrease from "./TempIncrease";
import { State } from "../../interfaces/Country";
import { format } from "date-fns";
import { SpinnerLoader } from "../Loader/SpinnerLoader";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import useIsMobile from "../../mediaqueries/useIsMobile";

interface TemperatureChartProps {
  state: State;
}

function TemperatureChart({ state }: TemperatureChartProps) {
  const [lungArray, setLungArray] = useState(5);
  const isMobile = useIsMobile();

  const WeatherStorageKey = useSelector(
    (state: RootState) => state.stateSelection.WeatherStorageKey,
  );

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
        lungArray,
      ),
    enabled: !!lungArray,
  });

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <ErrorComponent error={error} />;

  const formatXAxis = (tickItem: Date) => format(tickItem, "dd/MM/yyyy");
  const fontSize = isMobile ? 12 : 14;
  // Custom Tooltip for rounding values to 2 decimal places
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip rounded bg-white p-2 shadow-md">
          <p className="label">{`Data: ${formatXAxis(new Date(label))}`}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.stroke }}>
              {`${item.name}: ${(item.value as number).toFixed(2)}°C`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
              tick={{ fontSize: fontSize }}
              tickFormatter={formatXAxis}
            />
            <YAxis unit={"°C"} />
            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                />
              )}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature2mMean"
              name="Media"
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
