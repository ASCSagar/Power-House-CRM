import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Rates = ({ siteID, onRowSelect, setIsModalOpen }) => {
  const [ratesData, setRatesData] = useState([]);

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 30];
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "udpcore/quotations/",
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
              site_id: siteID,
            }),
          },
          8000
        );
        if (response.status === 200) {
          setRatesData(response?.data?.GetElectricRatesResult?.Rates);
        }
      } catch (error) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    })();
  }, [siteID]);

  let selectedRowData = null;

  const columns = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      resizable: false,
      width: 100,
    },
    {
      headerName: "Supplier",
      field: "Supplier",
      filter: true,
    },
    {
      headerName: "Term",
      field: "Term",
      filter: true,
    },
    {
      headerName: "Day Rate (pence/kwh)",
      field: "DayUnitrate",
      filter: true,
    },
    {
      headerName: "Night Rate (pence/kwh)",
      field: "NightUnitrate",
      filter: true,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "StandingCharge",
      filter: true,
    },
    {
      headerName: "Extra Info",
      field: "ExtraInfo",
      filter: true,
      valueGetter: (params) => {
        return params.data?.ExtraInfo || "--";
      },
    },
    {
      headerName: "Up Lift",
      field: "Uplift",
      filter: true,
    },
  ];

  const onSelectionChanged = (event) => {
    const selectedNode = event.api.getSelectedNodes()[0];
    selectedRowData = selectedNode ? selectedNode.data : null;
    if (selectedRowData) {
      onRowSelect(selectedRowData);
      setIsModalOpen(false);
    }
  };

  const gridOptions = {
    rowData: ratesData,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: paginationPageSizeSelector,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    rowSelection: "single",
    onSelectionChanged: onSelectionChanged,
  };

  return (
    <div className="ag-theme-quartz">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default Rates;
