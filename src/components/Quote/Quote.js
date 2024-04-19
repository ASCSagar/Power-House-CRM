import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import CreateQuote from "./CreateQuote";

const Quote = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showCreateQuote, setShowCreateQuote] = useState(false);

  const openCreateQuote = () => {
    setShowCreateQuote((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "quote/generate-quote/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setQuoteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Site Name",
      field: "site.site_name",
      filter: true,
    },
    {
      headerName: "Supplier",
      field: "supplier",
      filter: true,
    },
    {
      headerName: "Product",
      field: "product",
      filter: true,
    },
    {
      headerName: "Term",
      field: "term",
      filter: true,
    },
    {
      headerName: "Day Rate (pence/kWh)",
      field: "day_rate",
      filter: true,
    },
    {
      headerName: "Night Rate (pence/kWh)",
      field: "night_rate",
      filter: true,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "standing_charge",
      filter: true,
    },
    {
      headerName: "KVA Charge (pence)",
      field: "kva_charge",
      filter: true,
    },
    {
      headerName: "Additional Charge(£)",
      field: "additional_charge",
      filter: true,
    },
    {
      headerName: "Extra info",
      field: "extra_info",
      filter: true,
    },
    {
      headerName: "Up Lift",
      field: "up_lift",
      filter: true,
    },
    {
      headerName: "Rates Already Include At Uplift",
      field: "rates_already_include_at_uplift",
      filter: true,
      cellRenderer: renderItemAvailable,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Quotes"
          middle="Quote"
          middleUrl="Quotes"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openCreateQuote}>
          <i className="bi bi-plus-square"></i> Create Quote
        </button>
      </div>
      {showCreateQuote && <CreateQuote refreshTableMode={refreshTableMode} />}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Quotes</h5>
                <Table rowData={quoteData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Quote;
