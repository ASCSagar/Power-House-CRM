import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const CompanyChart = ({ companyData }) => {
  const chartData = {
    labels: companyData?.map((company) => company.name),
    datasets: [
      {
        label: "Estimated Turnover",
        data: companyData?.map((company) => company.estimated_turnover),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body pb-0">
          <h5 className="card-title">Company</h5>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyChart;