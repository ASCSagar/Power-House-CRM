import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const Table = ({ rowData, columnDefs, paginationPageSize = 10 }) => {
  const gridOptions = {
    rowData,
    columnDefs,
    pagination: true,
    paginationPageSize,
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

export default Table;
