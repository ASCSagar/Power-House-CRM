import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";
import CreateGroupSite from "./CreateGroupSite";

const GroupSite = () => {
  const [groupSiteData, setGroupSiteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showGroupSites, setShowGroupSites] = useState(false);

  const openGroupSites = () => {
    setShowGroupSites((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "multisite/",
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
          setGroupSiteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const renderItemAvailable = ({ value }) => {
    return value === "MULTI" ? "Multi Site GROUP" : "BASIC SITE GROUP";
  };

  const columns = [
    {
      headerName: "Group Name",
      field: "group_name",
      filter: true,
    },
    {
      headerName: "Site In Group",
      field: "sites.length",
      filter: true,
    },
    {
      headerName: "Group Type",
      field: "group_type",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Group Sites"
          middle="Site"
          middleUrl="GroupSites"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openGroupSites}>
          <i className="bi bi-plus-square"></i> Create Group Site
        </button>
      </div>
      {showGroupSites && (
        <CreateGroupSite refreshTableMode={refreshTableMode} />
      )}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Group Sites</h5>
                {groupSiteData?.length > 0 ? (
                  <Table rowData={groupSiteData} columnDefs={columns} />
                ) : (
                  <h5 className="text-center text-danger">
                    No Group Sites Available !!{" "}
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupSite;
