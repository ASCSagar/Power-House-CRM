import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "../../UI/Select/Select";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const initialNoteData = {
  select_site: "",
  site_notes: "",
  company_notes: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerNote = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialNoteData;
  }
  return { ...state, [action.type]: action.value };
};

const CreateNote = ({ refreshTableMode }) => {
  const navigate = useNavigate();
  const noteId = useParams().noteId;
  const [noteData, dispatchNote] = useReducer(reducerNote, initialNoteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  useEffect(() => {
    (async () => {
      if (noteId) {
        try {
          const response = await ajaxCall(
            `notes/note/${noteId}/`,
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
          dispatchNote({ type: "reset", payload: response.data });
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [noteId]);

  const validateForm = () => {
    if (!noteData.select_site) {
      setFormError("Site is Required");
      return false;
    }
    if (!noteData.site_notes) {
      setFormError("Site Note is Required");
      return false;
    }
    if (!noteData.company_notes) {
      setFormError("Company Note is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const resetReducerForm = () => {
    dispatchNote({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    try {
      const url = noteId ? `notes/note/${noteId}/` : "notes/note/";
      const method = noteId ? "PATCH" : "POST";
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method,
          body: JSON.stringify(noteData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        resetReducerForm();
        refreshTableMode();
        toast.success(`Note ${noteId ? "Updated" : "Created"} Successfully`);
        if (noteId) {
          navigate("/Notes");
        }
      } else if ([400, 404].includes(response.status)) {
        toast.error(response.data.select_site[0]);
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({
        ...formStatus,
        isSubmitting: false,
      });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{noteId ? "Edit Note" : "Add Note"}</h5>
        <form className="row g-3" onSubmit={createNote}>
          <Select
            className="col-md-4"
            label="Site Name"
            name="select_site"
            isSearch={true}
            value={noteData.select_site}
            onChange={(val) => {
              dispatchNote({
                type: "select_site",
                value: val,
              });
            }}
            objKey={["site_name"]}
            url="sites/get/site/"
          />
          <div className="col-md-4">
            <label className="form-label">Site Notes</label>
            <input
              type="text"
              className="form-control"
              value={noteData.site_notes}
              onChange={(e) =>
                dispatchNote({
                  type: "site_notes",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Company Notes</label>
            <input
              type="text"
              className="form-control"
              value={noteData.company_notes}
              onChange={(e) =>
                dispatchNote({
                  type: "company_notes",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="text-center">
            {formStatus.isError ? (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            ) : (
              <div className="text-success mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Loading
                color="primary"
                text={noteId ? "Updating Note..." : "Creating Note..."}
              />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus.isSubmitting}
              >
                {noteId ? "Update Note" : "Create Note"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
