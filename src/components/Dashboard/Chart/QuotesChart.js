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

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Quotes</h5>
          <Line options={{ responsive: true }} data={data} />
        </div>
      </div>
    </div>
  );
};

export default QuotesChart;