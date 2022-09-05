import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function PieChart2({ sumsByStrategy }: { sumsByStrategy: any }) {
  const [series, setSeries] = useState<any>();
  const [labels, setLabels] = useState<any>();
  const [options, setOptions] = useState<ApexOptions>();

  useEffect(() => {
    getData();
    createOptions();
  }, [sumsByStrategy]);

  // Method to set series and labels
  function getData() {
    let seriesResults: any = [];
    let labelsResults: any = [];
    sumsByStrategy.forEach((item: any) => {
      seriesResults.push(item.sum);
      labelsResults.push(item.sum);
    });
    setSeries(seriesResults);
    setLabels(labelsResults);
  }
  // Method to set apex chart options
  function createOptions() {
    let labelsResults: any = [];
    sumsByStrategy.forEach((item: any) => {
      labelsResults.push(item.strategy);
    });
    const options: ApexOptions = {
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      labels: labelsResults,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    setOptions(options);
  }

  return (
    <div>
      {series && labels && options && (
        <Chart
          options={options}
          series={series}
          type="pie"
          width={550}
          height={550}
        />
      )}
    </div>
  );
}

export default PieChart2;
