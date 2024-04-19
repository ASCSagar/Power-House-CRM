import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import Table from "../../UI/Table/Table";
import CreateSite from "./CreateSite";

const Site = () => {
  const [siteData, setSiteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showCreateSite, setShowCreateSite] = useState(false);

  const openCreateSite = () => {
    setShowCreateSite((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "sites/get/site/",
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
  }, [refreshTable]);

  const siteDashboard = (params) => (
    <Link to={`/site/${params.data.id}`}>{params.value}</Link>
  );

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Site Name",
      field: "site_name",
      cellRenderer: siteDashboard,
      filter: true,
    },
    { headerName: "Type Of Owner", field: "type_of_owner", filter: true },
    { headerName: "Owner Name", field: "owner_name", filter: true },
    { headerName: "Company", field: "company.name", filter: true },
    { headerName: "Agent Email", field: "agent_email", filter: true },
    {
      headerName: "Bill To Sent",
      field: "bill_to_sent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Change Of Tenancy",
      field: "change_of_tenancy",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Customer Consent",
      field: "customer_consent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    { headerName: "Notes", field: "notes", filter: true },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Sites"
          middle="Site"
          middleUrl="Sites"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openCreateSite}>
          <i className="bi bi-plus-square"></i> Create Site
        </button>
      </div>
      {showCreateSite && <CreateSite refreshTableMode={refreshTableMode} />}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sites</h5>
                <Table rowData={siteData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Site;
