import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";
import EditIcon from "../../UI/Icons/EditIcon";

const Note = () => {
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `notes/note/?`,
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
          setNoteData(response?.data?.results);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const editNote = (params) => (
    <Link
      to={`/notes/edit/${params.data.id}`}
      className="enquiryAction"
      title="Edit Note"
    >
      <EditIcon />
    </Link>
  );

  const columns = [
    {
      headerClass: "ag-grid-header",
      resizable: false,
      width: 60,
      cellRenderer: editNote,
    },
    {
      headerName: "Site Name",
      field: "select_site",
      filter: true,
    },
    {
      headerName: "Site Note",
      field: "site_notes",
      filter: true,
    },
    {
      headerName: "Company Note",
      field: "company_notes",
      filter: true,
    },
  ];

  return (
    <main id="main" className="main">
      <Breadcrumbs title="Notes" middle="Note" main="Dashboard" />
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Notes</h5>
                <Table rowData={noteData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Note;