import { ApexOptions } from "apexcharts";
import { Card, CardContent } from "@mui/material";
import { CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = () => {
  const series = [
    {
      name: "Iphone 13",
      data: [0, 31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Oneplue 9",
      data: [0, 11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 3,
    },

    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
      ],
    },
  };
  return (
    <Card>
      <CardContent>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={options}
          series={series}
        ></Chart>
      </CardContent>
    </Card>
  );
};

export default PieChart;
