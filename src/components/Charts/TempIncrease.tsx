import calculateTemperatureIncrease from "../../services/TemperatureIncrease";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../Error/ErrorComponent";
import { SpinnerLoader } from "../Loader/SpinnerLoader";

interface TempIncreaseProps {
  storageKey: string;
}

function TempIncrease({ storageKey }: TempIncreaseProps) {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["calculateTemperatureIncrease"],
    queryFn: () => calculateTemperatureIncrease(storageKey, 10),
  });

  if (isLoading) return <SpinnerLoader />;
  if (isError) return <ErrorComponent error={error} />;

  if (!data) {
    return <span>Nessun dato disponibile</span>;
  }

  return (
    <div className="flex w-1/2 flex-col gap-2 rounded-xl border-2 border-base-content/20 bg-base-100 p-2">
      {data.increase !== null && data.percentageIncrease !== null ? (
        <>
          <div>
            <h2 className="text-2xl">Aumento di:</h2>
          </div>
          <div className="text-center text-4xl font-bold">
            <div>
              {data.increase >= 0 ? "+" : ""}
              {data.increase.toFixed(2)}°C
            </div>

            {/* <div>{data.percentageIncrease.toFixed(2)}%</div> */}
          </div>
        </>
      ) : (
        <span>Nessun dato disponibile</span>
      )}
    </div>
  );
}

export default TempIncrease;
