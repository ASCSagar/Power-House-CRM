import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  const handleSiteEdit = async (siteId, fieldName, newValue) => {
    try {
      const response = await ajaxCall(`sites/update/site/${siteId}/`, {
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
        toast.success("Site Data Update Successfully");
        refreshTableMode();
      } else {
        toast.error("Something went wrong updating company data");
      }
    } catch (error) {
      console.error("Error updating company data", error);
    }
  };

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
      editable: true,
    },
    {
      headerName: "Type Of Owner",
      field: "type_of_owner",
      filter: true,
      editable: true,
    },
    {
      headerName: "Owner Name",
      field: "owner_name",
      filter: true,
      editable: true,
    },
    {
      headerName: "Company",
      field: "company",
      filter: true,
      valueGetter: (params) => {
        return params.data?.company?.name;
      },
    },
    {
      headerName: "Agent Email",
      field: "agent_email",
      filter: true,
      editable: true,
    },
    {
      headerName: "Bill To Sent",
      field: "bill_to_sent",
      cellRenderer: renderItemAvailable,
      filter: true,
      editable: true,
    },
    {
      headerName: "Change Of Tenancy",
      field: "change_of_tenancy",
      cellRenderer: renderItemAvailable,
      filter: true,
      editable: true,
    },
    {
      headerName: "Customer Consent",
      field: "customer_consent",
      cellRenderer: renderItemAvailable,
      filter: true,
      editable: true,
    },
    { headerName: "Notes", field: "notes", filter: true, editable: true },
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
      {showCreateSite && (
        <CreateSite
          refreshTableMode={refreshTableMode}
          setShowCreateSite={setShowCreateSite}
        />
      )}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sites</h5>
                <Table
                  rowData={siteData}
                  columnDefs={columns}
                  onCellValueChanged={(params) =>
                    handleSiteEdit(
                      params.data.id,
                      params.colDef.field,
                      params.newValue
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Site;
