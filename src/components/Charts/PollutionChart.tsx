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
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorComponent from "../Error/ErrorComponent";
import { State } from "../../interfaces/Country";
import getPollutionData from "../../services/getPollutionData";
import { format } from "date-fns";
import AirQuality from "./AirQuality";
import { SpinnerLoader } from "../Loader/SpinnerLoader";

interface PollutionChartProps {
  state: State;
}

interface PollutionDataEntry {
  time: Date;
  pm10: number;
  pm25: number;
  carbonDioxide: number;
  carbonMonoxide: number;
  nitrogenDioxide: number;
  dust: number;
  europeanAqi: number;
}

const PollutionChart: React.FC<PollutionChartProps> = ({ state }) => {
  const pollutionStorageKey = useSelector(
    (state: RootState) => state.stateSelection.PollutionStorageKey
  );

  const [visibleLines, setVisibleLines] = useState({
    pm10: true,
    pm25: true,
    carbonDioxide: true,
    carbonMonoxide: true,
    nitrogenDioxide: true,
    dust: true,
  });

  const toggleLineVisibility = (lineKey: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({
      ...prev,
      [lineKey]: !prev[lineKey],
    }));
  };

  const { data, isError, isLoading, error } = useQuery<PollutionDataEntry[]>({
    queryKey: [
      "pollutionDataTemp",
      state.latitudeNumber,
      state.longitudeNumber,
    ],
    queryFn: () =>
      getPollutionData(
        pollutionStorageKey,
        state.latitudeNumber,
        state.longitudeNumber
      ),
  });

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <ErrorComponent error={error} />;
  if (!data) return <span>No data available</span>;

  const latestEntry = data.reduce(
    (latest, entry) =>
      new Date(entry.time) > new Date(latest.time) ? entry : latest,
    data[0]
  );

  const formatXAxis = (tick: Date) => format(tick, "dd/MM");

  const renderTooltip = (props: { active?: boolean; payload?: any }) => {
    if (props.active && props.payload && props.payload.length) {
      const { time } = props.payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`Date: ${format(time, "dd/MM")}`}</p>
          <p>{`Time: ${format(time, "HH:mm")}`}</p>
          {props.payload.map(
            (
              entry: { color: string; name: string; value: number },
              index: number
            ) => (
              <p key={index} style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}`}
              </p>
            )
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <AirQuality AQI={latestEntry.europeanAqi} />
      <div className="flex h-[300px]">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 10 }}
            />
            <YAxis yAxisId="left" unit="μg/m³" tick={{ fontSize: 10 }} />
            <YAxis
              yAxisId="right"
              unit="ppm"
              orientation="right"
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={renderTooltip} />
            <Legend
              onClick={(e) =>
                toggleLineVisibility(e.dataKey as keyof typeof visibleLines)
              }
              wrapperStyle={{ cursor: "pointer" }}
            />

            <Line
              type="monotone"
              dataKey="pm25"
              name="Pm2.5"
              stroke="#544fc5"
              yAxisId="left"
              hide={!visibleLines.pm25}
            />
            <Line
              type="monotone"
              dataKey="pm10"
              name="Pm10"
              stroke="#2caffe"
              yAxisId="left"
              hide={!visibleLines.pm10}
            />
            <Line
              type="monotone"
              dataKey="carbonMonoxide"
              name="CO"
              stroke="#00e272"
              yAxisId="left"
              hide={!visibleLines.carbonMonoxide}
            />
            <Line
              type="monotone"
              dataKey="carbonDioxide"
              name="CO2"
              stroke="#fe6a35"
              yAxisId="right"
              hide={!visibleLines.carbonDioxide}
            />
            <Line
              type="monotone"
              dataKey="nitrogenDioxide"
              name="NO2"
              stroke="#6b8abc"
              yAxisId="left"
              hide={!visibleLines.nitrogenDioxide}
            />
            <Line
              type="monotone"
              dataKey="dust"
              name="Dust"
              stroke="#d568fb"
              yAxisId="left"
              hide={!visibleLines.dust}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default PollutionChart;
