import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

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
    field: "modifiedStandingCharge",
    filter: true,
  },
  {
    headerName: "Up Lift",
    field: "Uplift",
    filter: true,
  },
];

const Quotation = ({
  siteId,
  setShowQuotation,
  setShowCreateQuote,
  upLiftRate,
}) => {
  const [ratesData, setRatesData] = useState([]);
  const [isSiteLoading, setIsSiteLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 30];
  }, []);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (selectedRows.length === 0) {
      setFormError("Please select at least one Rate before saving. ");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  useEffect(() => {
    setIsSiteLoading(true);
    if (siteId !== "") {
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
                site_id: siteId,
              }),
            },
            8000
          );
          if (response.status === 200) {
            const dataWithUplift =
              response?.data?.GetElectricRatesResult?.Rates.map((rate) => ({
                ...rate,
                modifiedStandingCharge: rate.StandingCharge + upLiftRate,
              }));
            setRatesData(dataWithUplift);
          }
        } catch (error) {
          toast.error("Some Problem Occurred. Please try again.");
        } finally {
          setIsSiteLoading(false);
        }
      })();
    }
  }, [siteId, upLiftRate]);

  const createRates = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    try {
      for (const item of selectedRows) {
        const bodyData = {
          supplier: item?.Supplier,
          term: item?.Term,
          day_rate: item?.DayUnitrate,
          night_rate: item?.NightUnitrate,
          standing_charge: item?.StandingCharge + item?.Uplift,
          extra_info: item?.ExtraInfo,
          up_lift: item?.Uplift,
          site: siteId,
        };
        const response = await ajaxCall(
          "createsupplierdata/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "POST",
            body: JSON.stringify(bodyData),
          },
          8000
        );
        if (response.status !== 201) {
          toast.error("Some Problem Occurred. Please try again.");
          return;
        }
      }
      toast.success("Quotation Added Successfully.");
      setShowQuotation(false);
      setShowCreateQuote(false);
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({
        ...formStatus,
        isSubmitting: false,
      });
    }
  };

  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => {
      return {
        Supplier: node.data.Supplier,
        Term: node.data.Term,
        DayUnitrate: node.data.DayUnitrate,
        NightUnitrate: node.data.NightUnitrate,
        StandingCharge: node.data.StandingCharge,
        ExtraInfo: node.data.ExtraInfo,
        Uplift: node.data.Uplift,
      };
    });
    setSelectedRows(selectedData);
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
    rowSelection: "multiple",
    onSelectionChanged: onSelectionChanged,
  };

  return (
    <>
      {isSiteLoading ? (
        <div className="mt-3">
          <Loading color="primary" text="Loading Quotation..." />
        </div>
      ) : ratesData?.length > 0 ? (
        <div>
          <div className="ag-theme-quartz mt-3">
            <AgGridReact {...gridOptions} />
          </div>
          <h5 className="text-center mt-3">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
          </h5>
          <div className="mt-3 d-flex justify-content-center">
            {formStatus.isSubmitting ? (
              <Loading color="primary" text={"Saving Quotation..."} />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus.isSubmitting}
                onClick={createRates}
              >
                Save Quotation
              </button>
            )}
          </div>
        </div>
      ) : siteId === "" ? (
        <h5 className="text-center text-danger mt-3">
          Please Select Site For Quotation Rate
        </h5>
      ) : (
        <h5 className="text-center text-danger mt-3">No Quotation Found !!</h5>
      )}
    </>
  );
};

export default Quotation;
