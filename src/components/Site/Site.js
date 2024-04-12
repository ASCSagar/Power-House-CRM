import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import EditIcon from "../../UI/Icons/EditIcon";
import Table from "../../UI/Table/Table";
import CreateSite from "./CreateSite";

const Site = () => {
  const [siteData, setSiteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `sites/get/site/?ordering=-date_created`,
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
          setSiteData(response?.data?.results);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [refreshTable]);

  const editSite = (params) => (
    <Link
      to={`/sites/edit/${params.data.id}`}
      className="enquiryAction"
      title="Edit Site"
    >
      <EditIcon />
    </Link>
  );

  const siteDashboard = (params) => (
    <Link to={`/sites/${params.data.id}`}>{params.value}</Link>
  );

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerClass: "ag-grid-header",
      resizable: false,
      width: 60,
      cellRenderer: editSite,
    },
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
      <Breadcrumbs title="Sites" middle="Site" main="Dashboard" />
      <CreateSite refreshTableMode={refreshTableMode} />
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
