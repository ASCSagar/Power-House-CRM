import React from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const SiteChart = ({ siteData }) => {
  const data = {
    labels: siteData?.map(
      ({ date_created, site_name }) =>
        `${moment(date_created).format("ll")} - ${site_name}`
    ),
    datasets: [
      {
        label: "Site Data",
        data: siteData?.map(({ id }) => id),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={{ responsive: true }} data={data} />;
};

export default SiteChart;
