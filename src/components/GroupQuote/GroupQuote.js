import React, { useState, useEffect } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import CreateGroupQuote from "./CreateGroupQuote";

const GroupQuote = () => {
  const [groupQuoteData, setGroupQuoteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showCreateGroupQuote, setShowCreateGroupQuote] = useState(false);

  const openCreateGroupQuote = () => {
    setShowCreateGroupQuote((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "quote/group-quote/",
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
          setGroupQuoteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const groupType = (params) => {
    return params?.data?.group_detail
      ?.map((data, index, arr) => {
        const separator = index !== arr.length - 1 ? ", " : "";
        return `${data.supplier}${separator}`;
      })
      .join("");
  };

  const columns = [
    {
      headerName: "Group Name",
      field: "group_name",
      filter: true,
    },

    {
      headerName: "Group Type",
      field: "group_type",
      filter: true,
      cellRenderer: groupType,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Group Quotes"
          middle="Quote"
          middleUrl="GroupQuotes"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openCreateGroupQuote}>
          <i className="bi bi-plus-square"></i> Create Group Quote
        </button>
      </div>
      {showCreateGroupQuote && (
        <CreateGroupQuote refreshTableMode={refreshTableMode} />
      )}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Group Quotes</h5>
                {groupQuoteData?.length > 0 ? (
                  <Table rowData={groupQuoteData} columnDefs={columns} />
                ) : (
                  <h5 className="text-center text-danger">
                    No Group Quotes Available !!
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

export default GroupQuote;
