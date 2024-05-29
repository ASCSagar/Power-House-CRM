import React, { useEffect, useState } from "react";
import Tab from "../../UI/Tab/Tab";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../../UI/Modal/Modal";
import Details from "./Details";
import Table from "../../UI/Table/Table";
import SupplyDetail from "./SupplyDetails/SupplyDetail";
import Loading from "../../UI/Loading/Loading";
import CreateQuote from "../Quote/CreateQuote";

const SiteDashboard = () => {
  const { siteId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [siteQuotes, setSiteQuotes] = useState([]);

  const quotes = siteQuotes.filter((item) => item.site === parseInt(siteId));

  const tabs = [
    { id: "1", title: "Quotes" },
    {
      id: "2",
      title: `Supply Details (${
        siteData.lead_type === "GAS" ? "Gas" : "Electricity"
      })`,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `sites/update/site/${siteId}/`,
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
          setSiteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [siteId]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `supplierdatagetview/`,
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
          setSiteQuotes(response?.data);
          setIsLoading(false);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [siteId]);

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
      width: 210,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "standing_charge",
      filter: true,
      width: 210,
    },
    {
      headerName: "Up Lift",
      field: "up_lift",
      filter: true,
    },
  ];

  return (
    <>
      <main className="main" id="main">
        <Breadcrumbs
          title={siteData?.site_name}
          middle="Site"
          middleUrl="Sites"
          main="Dashboard"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{siteData?.site_name}</h5>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Site Details
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsQuoteOpen(true)}
                      >
                        <i className="bi bi-plus-square" /> Create Quote
                      </button>
                    </div>
                  </div>
                  <ul
                    className="nav nav-tabs nav-tabs-bordered"
                    id="borderedTab"
                    role="tablist"
                  >
                    {tabs.map((tab, index) => (
                      <Tab key={tab.id} id={tab.id} isActive={index === 0}>
                        {tab.title}
                      </Tab>
                    ))}
                  </ul>
                  <div className="tab-content pt-2" id="borderedTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="bordered-1"
                      role="tabpanel"
                      aria-labelledby="1-tab"
                    >
                      {isLoading ? (
                        <Loading color="primary" text="Loading..." />
                      ) : quotes.length > 0 ? (
                        <div className="mt-4">
                          <Table rowData={quotes} columnDefs={columns}></Table>
                        </div>
                      ) : (
                        <div className="text-center text-danger mt-4">{`No Quotes Available For This ${siteData.site_name} Site !!`}</div>
                      )}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="bordered-2"
                      role="tabpanel"
                      aria-labelledby="2-tab"
                    >
                      <SupplyDetail
                        leadType={siteData.lead_type}
                        MpanID={siteData.mpan_id}
                      />
                    </div>
                  </div>
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
        title={`${siteData?.site_name} Details`}
      >
        <Details siteData={siteData} />
      </SmallModal>
      <SmallModal
        size="xl"
        centered
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      >
        <CreateQuote />
      </SmallModal>
    </>
  );
};

export default SiteDashboard;
