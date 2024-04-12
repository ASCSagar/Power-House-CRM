import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loading from "../../UI/Loading/Loading";

const initialDetails = {
  s_postcode: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialDetails;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const LookUp = ({ onRowSelect, onCloseModal }) => {
  const [addressData, setAddressData] = useState([]);
  const [apiData, dispatchapiData] = useReducer(reducer, initialDetails);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!apiData.s_postcode) {
      setFormError("Post Code is Required");
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
    dispatchapiData({
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

  const searchByPostCode = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    try {
      const response = await ajaxCall(
        "lookup/Property/SearchByPostcode/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            query: apiData.s_postcode,
            isQueryTicket: true,
          }),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        resetReducerForm();
        toast.success("Search Successfully");
        setAddressData(response.data);
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
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

  const renderItemAvailable = ({ value }) => {
    return value ? "Yes" : "No";
  };

  let selectedRowData = null;

  const columns = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerClass: "ag-grid-header",
      resizable: false,
      width: 60,
    },
    {
      headerName: "MPAN ID",
      field: "mpanId",
      filter: true,
    },
    {
      headerName: "Electricity",
      field: "matchedElectricity",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Gas",
      field: "matchedGas",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Address 1",
      cellRenderer: (params) => {
        const address1 = params.data.addressMatch?.address?.addressBreakdown[0];
        return address1 || "";
      },
      filter: true,
    },
    {
      headerName: "Address 2",
      cellRenderer: (params) => {
        const address2 = params.data.addressMatch?.address?.addressBreakdown[1];
        return address2 || "";
      },
      filter: true,
    },
    {
      headerName: "Address 3",
      cellRenderer: (params) => {
        const address3 = params.data.addressMatch?.address?.addressBreakdown[2];
        return address3 || "";
      },
      filter: true,
    },
    {
      headerName: "Address 4",
      cellRenderer: (params) => {
        const address4 = params.data.addressMatch?.address?.addressBreakdown[3];
        return address4 || "";
      },
      filter: true,
    },
    {
      headerName: "PostCode",
      field: "postCode",
      filter: true,
    },
  ];

  const onSelectionChanged = (event) => {
    const selectedNode = event.api.getSelectedNodes()[0];
    selectedRowData = selectedNode ? selectedNode.data : null;
    if (selectedRowData) {
      onRowSelect(selectedRowData);
      onCloseModal();
    }
  };

  const gridOptions = {
    rowData: addressData,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    rowSelection: "single",
    onSelectionChanged: onSelectionChanged,
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-md-4">
          <label className="form-label">Post Code</label>
          <div className="d-flex gap-3">
            <input
              type="email"
              className="form-control"
              value={apiData.s_postcode}
              onChange={(e) =>
                dispatchapiData({
                  type: "s_postcode",
                  value: e.target.value,
                })
              }
            />
            <div className="text-center">
              {formStatus.isSubmitting ? (
                <Loading color="primary" text={"Searching..."} />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formStatus.isSubmitting}
                  onClick={searchByPostCode}
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {addressData.length > 0 ? (
          <div className="ag-theme-quartz">
            <AgGridReact {...gridOptions} />
          </div>
        ) : (
          <h5 className="text-center text-danger">
            No Data Found By Given PostCode
          </h5>
        )}
      </div>
    </div>
  );
};

export default LookUp;
