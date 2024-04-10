import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";

const GroupSite = () => {
  const [groupSiteData, setGroupSiteData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `multisite/?ordering=-date_created`,
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
          setGroupSiteData(response?.data?.results);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

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
      <Breadcrumbs title="Group Sites" middle="Site" main="Dashboard" />
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Group Sites</h5>
                <Table rowData={groupSiteData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupSite;