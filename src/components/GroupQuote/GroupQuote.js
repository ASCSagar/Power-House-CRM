import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import EditIcon from "../../UI/Icons/EditIcon";

const GroupQuote = () => {
  const [groupQuoteData, setGroupQuoteData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `quote/group-quote/?ordering=-date_created`,
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
          setGroupQuoteData(response?.data?.results);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const groupType = (params) => {
    return params?.data?.group_detail
      ?.map((data, index, arr) => {
        const separator = index !== arr.length - 1 ? ", " : "";
        return `${data.supplier}${separator}`;
      })
      .join("");
  };

  const editGroupQuotes = (params) => (
    <Link
      to={`/group-quotes/edit/${params.data.id}`}
      className="enquiryAction"
      title="Edit Group Quote"
    >
      <EditIcon />
    </Link>
  );

  const columns = [
    {
      headerClass: "ag-grid-header",
      resizable: false,
      width: 60,
      cellRenderer: editGroupQuotes,
    },
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
      <Breadcrumbs title="Group Quotes" middle="Quote" main="Dashboard" />
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Group Quotes</h5>
                <Table rowData={groupQuoteData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GroupQuote;