import React, { useMemo, useReducer, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loading from "../../UI/Loading/Loading";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

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
  const [type, setType] = useState("Gas");
  const [gasData, setGasData] = useState([]);
  const [electricData, setElectricData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, dispatchApiData] = useReducer(reducer, initialDetails);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const paginationPageSizeOptions = useMemo(() => [10, 20, 30], []);

  useEffect(() => {
    setData(type === "Gas" ? gasData : electricData);
  }, [type, gasData, electricData]);

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

  const resetForm = () => {
    dispatchApiData({ type: "reset" });
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
    setIsLoading(true);
    setFormStatus((prevStatus) => ({
      ...prevStatus,
      isSubmitting: true,
    }));
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
        resetForm();
        toast.success("Search Successful");
        const gasResults = response.data.filter((item) => item.matchedGas);
        const electricResults = response.data.filter(
          (item) => item.matchedElectricity
        );
        setGasData(gasResults);
        setElectricData(electricResults);
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        isSubmitting: false,
      }));
    }
  };

  const renderItemAvailable = ({ value }) =>
    value ? <CheckIcon /> : <CancelIcon />;

  const commonColumns = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      resizable: false,
      width: 60,
    },
    { headerName: "MPAN ID", field: "mpanId", filter: true },
    {
      headerName: "Address 1",
      cellRenderer: (params) =>
        params.data.addressMatch?.address?.addressBreakdown[0] || "",
      filter: true,
    },
    {
      headerName: "Address 2",
      cellRenderer: (params) =>
        params.data.addressMatch?.address?.addressBreakdown[1] || "",
      filter: true,
    },
    {
      headerName: "Address 3",
      cellRenderer: (params) =>
        params.data.addressMatch?.address?.addressBreakdown[2] || "",
      filter: true,
    },
    {
      headerName: "Address 4",
      cellRenderer: (params) =>
        params.data.addressMatch?.address?.addressBreakdown[3] || "",
      filter: true,
    },
    { headerName: "PostCode", field: "postCode", filter: true },
  ];

  const gasColumn = {
    headerName: "Gas",
    field: "matchedGas",
    cellRenderer: renderItemAvailable,
    filter: true,
  };

  const electricityColumn = {
    headerName: "Electricity",
    field: "matchedElectricity",
    cellRenderer: renderItemAvailable,
    filter: true,
  };

  const columns = useMemo(() => {
    const baseColumns = [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        width: 60,
      },
      { headerName: "MPAN ID", field: "mpanId", filter: true },
    ];

    if (type === "Gas") {
      return [...baseColumns, gasColumn, ...commonColumns.slice(2)];
    } else {
      return [...baseColumns, electricityColumn, ...commonColumns.slice(2)];
    }
  }, [type]);

  const onSelectionChanged = (event) => {
    const selectedNode = event.api.getSelectedNodes()[0];
    if (selectedNode) {
      onRowSelect(selectedNode.data);
      onCloseModal();
    }
  };

  const gridOptions = {
    rowData: data,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: paginationPageSizeOptions,
    domLayout: "autoHeight",
    defaultColDef: { sortable: true, resizable: true },
    rowSelection: "single",
    onSelectionChanged,
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="col-md-4">
          <label className="form-label">Post Code</label>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control"
              value={apiData.s_postcode}
              onChange={(e) =>
                dispatchApiData({ type: "s_postcode", value: e.target.value })
              }
            />
            <div className="text-center">
              {formStatus.isSubmitting ? (
                <Loading color="primary" />
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
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-primary" onClick={() => setType("Gas")}>
          Gas
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setType("Electricity")}
        >
          Electricity
        </button>
      </div>
      <div className="mt-3">
        {isLoading ? (
          <Loading color="primary" text="Loading ..." />
        ) : data.length > 0 ? (
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
