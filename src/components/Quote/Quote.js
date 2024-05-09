import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../../UI/Modal/Modal";
import Select from "../../UI/Select/Select";
import CreateQuote from "./CreateQuote";
import Loading from "../../UI/Loading/Loading";

const Quote = () => {
  const [site, setSite] = useState("");
  const [quoteData, setQuoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableData = quoteData.filter((item) => item.site === site);

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  const handleSiteChange = (selectedOption) => {
    setSite(selectedOption);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "supplierdatagetview/",
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
          setIsLoading(false);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const handleEditSupplyData = async (id, fieldName, newValue) => {
    try {
      const response = await ajaxCall(`supplierdatapatchview/${id}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "PATCH",
        body: JSON.stringify({ [fieldName]: newValue }),
      });
      if (response?.status === 200) {
        toast.success("Quote Data Update Successfully");
        refreshTableMode();
      } else {
        toast.error("Something went wrong updating company data");
      }
    } catch (error) {
      console.error("Error updating company data", error);
    }
  };

  const columns = [
    {
      headerName: "Supplier",
      field: "supplier",
      filter: true,
    },
    {
      headerName: "Term",
      field: "term",
      filter: true,
      editable: true,
    },
    {
      headerName: "Day Rate (pence/kWh)",
      field: "day_rate",
      filter: true,
      editable: true,
    },
    {
      headerName: "Night Rate (pence/kWh)",
      field: "night_rate",
      filter: true,
      editable: true,
      width: 210,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "standing_charge",
      filter: true,
      editable: true,
      width: 210,
    },
    {
      headerName: "Extra info",
      field: "extra_info",
      filter: true,
      editable: true,
      width: 280,
      valueGetter: (params) => {
        return params.data?.extra_info || "--";
      },
    },
    {
      headerName: "Up Lift",
      field: "up_lift",
      filter: true,
      editable: true,
    },
  ];

  return (
    <>
      <main id="main" className="main">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <Breadcrumbs
            title="Quotes"
            middle="Quote"
            middleUrl="Quotes"
            main="Dashboard"
          />
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="bi bi-plus-square"></i> Create Quote
          </button>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Quotes</h5>
                  <Select
                    className="col-4"
                    label="Site Name"
                    name="site"
                    isSearch={true}
                    objKey={["site_name"]}
                    url="sites/get/site/"
                    onChange={handleSiteChange}
                  />
                  {isLoading ? (
                    <Loading color="primary" text="Loading..." />
                  ) : tableData?.length > 0 ? (
                    <div className="mt-3">
                      <Table
                        rowData={tableData}
                        columnDefs={columns}
                        onCellValueChanged={(params) => {
                          handleEditSupplyData(
                            params.data.id,
                            params.colDef.field,
                            params.newValue
                          );
                        }}
                      />
                    </div>
                  ) : site === "" ? (
                    <h5 className="text-center text-danger">
                      Please Select Site For Quotes
                    </h5>
                  ) : (
                    <h5 className="text-center text-danger">
                      No Quotes Available !!
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SmallModal
        size="xl"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Supplier For Quotation"
      >
        <CreateQuote
          setIsModalOpen={setIsModalOpen}
          refreshTableMode={refreshTableMode}
        />
      </SmallModal>
    </>
  );
};

export default Quote;
