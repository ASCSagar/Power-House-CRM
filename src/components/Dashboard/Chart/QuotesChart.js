import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const QuotesChart = ({ quoteData }) => {
  const data = {
    labels: quoteData?.map(
      ({ date_created, product }) =>
        `${moment(date_created).format("ll")} - ${product}`
    ),
    datasets: [
      {
        label: "Day Rate",
        data: quoteData?.map((quote) => quote.day_rate),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Night Rate",
        data: quoteData?.map((quote) => quote.night_rate),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return <Line options={{ responsive: true }} data={data} />;
};

export default QuotesChart;
