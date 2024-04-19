import React, { useEffect, useState } from "react";
import Tab from "../../UI/Tab/Tab";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../../UI/Modal/Modal";
import Details from "./Details";
import Table from "../../UI/Table/Table";

const tabs = [
  { id: "1", title: "Quotes" },
  { id: "2", title: "Supply Details" },
];

const SiteDashboard = () => {
  const { siteId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [siteQuotes, setSiteQuotes] = useState([]);

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
    (async () => {
      try {
        const response = await ajaxCall(
          `quote/generate-quote/?site=${siteId}`,
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
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [siteId]);

  const renderItemAvailable = ({ value }) => {
    return value ? "Yes" : "No";
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
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsModalOpen(true)}
                    >{`View ${siteData?.site_name} Details`}</button>
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
                  <div
                    className="tab-pane fade show active"
                    id="bordered-1"
                    role="tabpanel"
                    aria-labelledby="1-tab"
                  >
                    {siteQuotes.length > 0 ? (
                      <div className="mt-4">
                        <Table
                          rowData={siteQuotes}
                          columnDefs={columns}
                        ></Table>
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
                    Supply Details
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
    </>
  );
};

export default SiteDashboard;
