import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import Table from "../../UI/Table/Table";
import ajaxCall from "../../helpers/ajaxCall";
import CreateNote from "./CreateNote";

const Note = () => {
  const [noteData, setNoteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showCreateNote, setShowCreateNote] = useState(false);

  const openCreateNote = () => {
    setShowCreateNote((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

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
          setNoteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const handleNoteEdit = async (noteId, fieldName, newValue) => {
    try {
      const response = await ajaxCall(`notes/note/${noteId}/`, {
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
        toast.success("Note Data Updated Successfully");
        refreshTableMode();
      } else {
        toast.error("Something went wrong updating note data");
      }
    } catch (error) {
      console.error("Error updating note data", error);
    }
  };

  const columns = [
    {
      headerName: "Site Name",
      field: "select_site",
      filter: true,
    },
    {
      headerName: "Site Note",
      field: "site_notes",
      filter: true,
      editable: true,
    },
    {
      headerName: "Company Note",
      field: "company_notes",
      filter: true,
      editable: true,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Notes"
          middle="Note"
          middleUrl="Notes"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openCreateNote}>
          <i className="bi bi-plus-square"> Create Note</i>
        </button>
      </div>
      {showCreateNote && <CreateNote refreshTableMode={refreshTableMode} />}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Notes</h5>
                <Table
                  rowData={noteData}
                  columnDefs={columns}
                  onCellValueChanged={(params) =>
                    handleNoteEdit(
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

export default Note;
