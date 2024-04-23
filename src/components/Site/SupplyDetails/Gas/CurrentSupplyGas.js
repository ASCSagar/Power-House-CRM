import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../../UI/Loading/Loading";

const initialCSG = {
  g_supplier: "",
  g_product: "",
  g_contract_type: "",
  g_won_date: "",
  g_contract_start_date: "",
  g_contract_end_date: "",
  g_contract_length_months: "",
  g_contract_back_date: "",
  g_supplier_reference: "",
  g_supplier_information1: "",
  g_supplier_information2: "",
  g_supplier_information3: "",
  g_agent: false,
  g_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  unit_rate_uplift: "",
  rate: "",
  annual_usage: "",
};

const reducerCSG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialCSG;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CurrentSupplyGas = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [CSGasData, dispatchCSGasData] = useReducer(reducerCSG, initialCSG);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const resetReducerForm = () => {
    dispatchCSGasData({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        try {
          const response = await ajaxCall(
            `supply/current-supply/${siteId}/`,
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
          if (response.status === 200) {
            const responseData = {
              g_supplier: response.data.g_supplier,
              g_product: response.data.g_product,
              g_contract_type: response.data.g_contract_type,
              g_won_date: response.data.g_won_date,
              g_contract_start_date: response.data.g_contract_start_date,
              g_contract_end_date: response.data.g_contract_end_date,
              g_contract_length_months: response.data.g_contract_length_months,
              g_contract_back_date: response.data.g_contract_back_date,
              g_supplier_reference: response.data.g_supplier_reference,
              g_supplier_information1: response.data.g_supplier_information1,
              g_supplier_information2: response.data.g_supplier_information2,
              g_supplier_information3: response.data.g_supplier_information3,
              g_agent: response.data.g_agent,
              g_customer: response.data.g_customer,
              stading_charge: response.data.gas_usage_rate.stading_charge,
              standing_charge_uplift:
                response.data.gas_usage_rate.standing_charge_uplift,
              unit_rate_uplift: response.data.gas_usage_rate.unit_rate_uplift,
              rate: response.data.gas_usage_rate.rate,
              annual_usage: response.data.gas_usage_rate.annual_usage,
            };
            dispatchCSGasData({ type: "reset", payload: responseData });
          }
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [siteId]);

  const doCSGas = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      g_supplier: CSGasData.g_supplier,
      g_product: CSGasData.g_product,
      g_contract_type: CSGasData.g_contract_type,
      g_won_date: CSGasData.g_won_date,
      g_contract_start_date: CSGasData.g_contract_start_date,
      g_contract_end_date: CSGasData.g_contract_end_date,
      g_contract_length_months: CSGasData.g_contract_length_months,
      g_contract_back_date: CSGasData.g_contract_back_date,
      g_supplier_reference: CSGasData.g_supplier_reference,
      g_supplier_information1: CSGasData.g_supplier_information1,
      g_supplier_information2: CSGasData.g_supplier_information2,
      g_supplier_information3: CSGasData.g_supplier_information3,
      g_agent: CSGasData.g_agent,
      g_customer: CSGasData.g_customer,
    };
    const gasUsageRate = {
      gas_usage_rate: {
        stading_charge: CSGasData.stading_charge,
        standing_charge_uplift: CSGasData.standing_charge_uplift,
        unit_rate_uplift: CSGasData.unit_rate_uplift,
        rate: CSGasData.rate,
        annual_usage: CSGasData.annual_usage,
      },
    };
    if (
      gasUsageRate.gas_usage_rate.stading_charge ||
      gasUsageRate.gas_usage_rate.standing_charge_uplift ||
      gasUsageRate.gas_usage_rate.rate ||
      gasUsageRate.gas_usage_rate.unit_rate_uplift ||
      gasUsageRate.gas_usage_rate.annual_usage
    ) {
      sendData = { ...sendData, ...gasUsageRate };
    }
    try {
      const response = await ajaxCall(
        `supply/current-supply/${siteId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        navigate("/sites");
        resetReducerForm();
        toast.success("Current Supply For GAS Edited Successfully");
      } else if ([400, 404, 401].includes(response.status)) {
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

  return (
    <>
      <div className="row mt-2">
        <div className="col-md-3">
          <label className="form-label">Supply</label>
          <input
            type="text"
            className="form-control"
            value={CSGasData.g_supplier}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_supplier",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Product</label>
          <input
            type="text"
            className="form-control"
            value={CSGasData.g_product}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_product",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Contract Type</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Won Date</label>
          <input
            type="date"
            className="form-control"
            value={CSGasData.g_won_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_won_date",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Start Date</label>
          <input
            type="date"
            className="form-control"
            value={CSGasData.g_contract_start_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_start_date",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract End Date</label>
          <input
            type="date"
            className="form-control"
            value={CSGasData.g_contract_end_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_end_date",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Length (Months)</label>
          <input
            type="number"
            className="form-control"
            value={CSGasData.g_contract_length_months}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_length_months",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Back Date</label>
          <input
            type="date"
            className="form-control"
            value={CSGasData.g_contract_back_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_back_date",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Reference</label>
          <input
            type="text"
            className="form-control"
            value={CSGasData.g_supplier_reference}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_supplier_reference",
                value: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 1</label>
          <input type="text" className="form-control"></input>
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 2</label>
          <input type="text" className="form-control"></input>
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 3</label>
          <input type="text" className="form-control"></input>
        </div>
      </div>
      <p className="mt-3">Notice of termination for this contract sent by : </p>
      <div className="mt-2 d-flex flex-wrap gap-3">
        <div className="form-check form-switch mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={CSGasData.g_agent}
            onChange={(e) => {
              dispatchCSGasData({
                type: "g_agent",
                value: e.target.checked,
              });
            }}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Agent
          </label>
        </div>
        <div className="form-check form-switch mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={CSGasData.g_customer}
            onChange={(e) => {
              dispatchCSGasData({
                type: "g_customer",
                value: e.target.checked,
              });
            }}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Customer
          </label>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleButtonClick}>
        Usage & Rates
      </button>
      {open && (
        <div className="row mt-2">
          <div className="col-md-4 mt-2">
            <label className="form-label">Standing Charge (pence/day)</label>
            <input
              type="number"
              className="form-control"
              value={CSGasData.stading_charge}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "stading_charge",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">
              Standing Charge Uplift(pence/day)
            </label>
            <input
              type="number"
              className="form-control"
              value={CSGasData.standing_charge_uplift}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "standing_charge_uplift",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Rate (pence/kwh)</label>
            <input
              type="number"
              className="form-control"
              value={CSGasData.rate}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "rate",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Unit Rate Uplift</label>
            <input
              type="number"
              className="form-control"
              value={CSGasData.unit_rate_uplift}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "unit_rate_uplift",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label">Annual Usage (KWH)</label>
            <input
              type="number"
              className="form-control"
              value={CSGasData.annual_usage}
              onChange={(e) => {
                dispatchCSGasData({
                  type: "annual_usage",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <div className="d-flex gap-4 mt-2">
            <div>Total Commission (£) : 0.00</div>
            <div>Annual Commission (£) : 0.00</div>
          </div>
        </div>
      )}
      <div className="text-center">
        {formStatus.isError ? (
          <div className="text-danger mb-2">{formStatus.errMsg}</div>
        ) : (
          <div className="text-success mb-2">{formStatus.errMsg}</div>
        )}
        {formStatus.isSubmitting ? (
          <Loading color="primary" text={"Submiting..."} />
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formStatus.isSubmitting}
            style={{ marginLeft: open ? "" : "10px" }}
            onClick={doCSGas}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default CurrentSupplyGas;
