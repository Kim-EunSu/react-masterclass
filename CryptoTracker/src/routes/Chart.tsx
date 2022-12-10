import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const coinId = useOutletContext();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart... "
      ) : (
        <ApexChart
          type="line"
          series={[
            // series는 보내고 싶은 모든 data
            {
              name: "sales",
              data: data?.map((price) => Number(+price.close)) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
            },
            theme: {
              mode: "dark",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["yellow"], stops: [0, 100] },
            },

            xaxis: {
              type: "datetime",
              categories: data?.map((price) => +price.time_close * 1000),
            },
            colors: ["skyblue"],
            tooltip: {
              y: {
                // formatter는 값을 넘겨주는 함수
                formatter: (value) => `${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};
export default Chart;
