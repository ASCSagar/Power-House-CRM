import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../helpers/ajaxCall";
import CheckIcon from "../../../UI/Icons/CheckIcon";
import CancelIcon from "../../../UI/Icons/Cancel";

const MeterDetail = () => {
  const mpanID = JSON.parse(localStorage.getItem("MPAN_ID"));
  const [meterDetail, setMeterDetails] = useState([]);

  console.log("-----meterDetail------->", meterDetail);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "lookup/Electricity/SearchBypMpan/",
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
              query: mpanID,
              isQueryTicket: true,
            }),
          },
          8000
        );
        console.log("response", response);
        if (response?.status === 200) {
          setMeterDetails(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [mpanID]);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    { headerName: "MPAN", field: "mpan" },
    { headerName: "PC", field: "pc" },
    { headerName: "MTC", field: "mtc" },
    { headerName: "LLF", field: "llf" },
    { headerName: "SSC", field: "ssc" },
    { headerName: "ES", field: "es" },
    { headerName: "ES Date", field: "esDate" },
    { headerName: "Current Supplier", field: "currentSupplier" },
    { headerName: "Supplier MPID", field: "supplierMpid" },
    { headerName: "Supplier EFD", field: "supplierEfd" },
    { headerName: "Data Aggregator", field: "dataAggregator" },
    { headerName: "Data Aggregator MPID", field: "dataAggregatorMpid" },
    { headerName: "Data Aggregator EFD", field: "dataAggregatorEfd" },
    { headerName: "Data Collector", field: "dataCollector" },
    { headerName: "Data Collector MPID", field: "dataCollectorMpid" },
    { headerName: "Data Collector EFD", field: "dataCollectorEfd" },
    { headerName: "Meter Operator", field: "meterOperator" },
    { headerName: "Meter Operator MPID", field: "meterOperatorMpid" },
    { headerName: "Meter Operator EFD", field: "meterOperatorEfd" },
    { headerName: "Full Address", field: "fullAddress" },
    {
      headerName: "Address Breakdown",
      field: "addressBreakdown",
      minWidth: 400,
    },
    {
      headerName: "Meter",
      field: "meter",
      valueGetter: (params) => params.data?.meters[0]?.meter,
    },
    {
      headerName: "Meter MapM ID",
      field: "meterMapMpid",
      valueGetter: (params) => params.data?.meters[0]?.meterMapMpid,
    },
    {
      headerName: "Meter Type",
      field: "meterType",
      valueGetter: (params) => params.data?.meters[0]?.meterType,
    },
    {
      headerName: "Is Smart",
      field: "isSmart",
      cellRenderer: renderItemAvailable,
    },
  ];

  const gridOptions = {
    rowData: meterDetail,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div className="ag-theme-quartz">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default MeterDetail;
