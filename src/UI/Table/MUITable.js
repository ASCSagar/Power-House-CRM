import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const MUITable = ({ rows, columns }) => {
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      getRowClassName={({ indexRelativeToCurrentPage }) =>
        indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
      }
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#f6f9ff",
          fontSize: "14px",
          color: "#012970",
        }
      }}
    />
  );
};

export default MUITable;