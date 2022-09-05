import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function BarChart({
  tvpiArray,
  tvpiCountArray,
}: {
  tvpiArray: any;
  tvpiCountArray: any;
}) {
  const series = [
    {
      name: "COUNT",
      data: tvpiCountArray,
    },
  ];
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "95%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      type: "numeric",
      min: 0,
      max: 2,
      categories: tvpiArray,
      labels: { show: true },
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    title: {
      text: "Tvpi",
      offsetX: 500,
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

export default BarChart;

// class ApexChart extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {

//         series: [{
//           name: 'Net Profit',
//           data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
//         }, {
//           name: 'Revenue',
//           data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
//         }, {
//           name: 'Free Cash Flow',
//           data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
//         }],
//         options: {
//           chart: {
//             type: 'bar',
//             height: 350
//           },
//           plotOptions: {
//             bar: {
//               horizontal: false,
//               columnWidth: '55%',
//               endingShape: 'rounded'
//             },
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//           },
//           xaxis: {
//             categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//           },
//           yaxis: {
//             title: {
//               text: '$ (thousands)'
//             }
//           },
//           fill: {
//             opacity: 1
//           },
//           tooltip: {
//             y: {
//               formatter: function (val) {
//                 return "$ " + val + " thousands"
//               }
//             }
//           }
//         },

//       };
//     }

//     render() {
//       return (
