import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../../UI/Loading/Loading";

const initialNSE = {
  e_supplier: "",
  e_product: "",
  e_contract_type: "",
  e_won_date: "",
  e_contract_start_date: "",
  e_contract_end_date: "",
  e_contract_length_months: "",
  e_contract_back_date: "",
  e_supplier_reference: "",
  e_supplier_information1: "",
  e_supplier_information2: "",
  e_supplier_information3: "",
  e_notes: "",
  e_agent: false,
  e_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  kva_rate: "",
  unit_rate_uplift: "",
  feed_in_tariff: "",
  annual_day_usage: "",
  day_rate: "",
  annual_night_usage: "",
  night_rate: "",
  annual_evening_usage: "",
  evening_rate: "",
};

const reducerNSE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialNSE;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const NewSupplyElectricity = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [NSElectricityData, dispatchNSElectricityData] = useReducer(
    reducerNSE,
    initialNSE
  );

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const resetReducerForm = () => {
    dispatchNSElectricityData({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        try {
          const response = await ajaxCall(
            `supply/new-supply/${siteId}/`,
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
              e_supplier: response.data.e_supplier,
              e_product: response.data.e_product,
              e_contract_type: response.data.e_contract_type,
              e_won_date: response.data.e_won_date,
              e_contract_start_date: response.data.e_contract_start_date,
              e_contract_end_date: response.data.e_contract_end_date,
              e_contract_length_months: response.data.e_contract_length_months,
              e_contract_back_date: response.data.e_contract_back_date,
              e_supplier_reference: response.data.e_supplier_reference,
              e_supplier_information1: response.data.e_supplier_information1,
              e_supplier_information2: response.data.e_supplier_information2,
              e_supplier_information3: response.data.e_supplier_information3,
              e_notes: response.data.e_notes,
              e_agent: response.data.e_agent,
              e_customer: response.data.e_customer,
              stading_charge: response.data.electric_usage_rate.stading_charge,
              standing_charge_uplift:
                response.data.electric_usage_rate.standing_charge_uplift,
              kva_rate: response.data.electric_usage_rate.kva_rate,
              unit_rate_uplift:
                response.data.electric_usage_rate.unit_rate_uplift,
              feed_in_tariff: response.data.electric_usage_rate.feed_in_tariff,
              annual_day_usage:
                response.data.electric_usage_rate.annual_day_usage,
              day_rate: response.data.electric_usage_rate.day_rate,
              annual_night_usage:
                response.data.electric_usage_rate.annual_night_usage,
              night_rate: response.data.electric_usage_rate.night_rate,
              annual_evening_usage:
                response.data.electric_usage_rate.annual_evening_usage,
              evening_rate: response.data.electric_usage_rate.evening_rate,
            };
            dispatchNSElectricityData({ type: "reset", payload: responseData });
          }
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [siteId]);

  const doNSElectricity = async function (e) {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      e_supplier: NSElectricityData.e_supplier,
      e_product: NSElectricityData.e_product,
      e_contract_type: NSElectricityData.e_contract_type,
      e_won_date: NSElectricityData.e_won_date,
      e_contract_start_date: NSElectricityData.e_contract_start_date,
      e_contract_end_date: NSElectricityData.e_contract_end_date,
      e_contract_length_months: NSElectricityData.e_contract_length_months,
      e_contract_back_date: NSElectricityData.e_contract_back_date,
      e_supplier_reference: NSElectricityData.e_supplier_reference,
      e_supplier_information1: NSElectricityData.e_supplier_information1,
      e_supplier_information2: NSElectricityData.e_supplier_information2,
      e_supplier_information3: NSElectricityData.e_supplier_information3,
      e_notes: NSElectricityData.e_notes,
      e_agent: NSElectricityData.e_agent,
      e_customer: NSElectricityData.e_customer,
    };
    const electricUsageRate = {
      electric_usage_rate: {
        stading_charge: NSElectricityData.stading_charge,
        standing_charge_uplift: NSElectricityData.standing_charge_uplift,
        kva_rate: NSElectricityData.kva_rate,
        unit_rate_uplift: NSElectricityData.unit_rate_uplift,
        feed_in_tariff: NSElectricityData.feed_in_tariff,
        annual_day_usage: NSElectricityData.annual_day_usage,
        day_rate: NSElectricityData.day_rate,
        annual_night_usage: NSElectricityData.annual_night_usage,
        night_rate: NSElectricityData.night_rate,
        annual_evening_usage: NSElectricityData.annual_evening_usage,
        evening_rate: NSElectricityData.evening_rate,
      },
    };
    if (
      electricUsageRate.electric_usage_rate.stading_charge ||
      electricUsageRate.electric_usage_rate.standing_charge_uplift ||
      electricUsageRate.electric_usage_rate.kva_rate ||
      electricUsageRate.electric_usage_rate.unit_rate_uplift ||
      electricUsageRate.electric_usage_rate.feed_in_tariff ||
      electricUsageRate.electric_usage_rate.annual_day_usage ||
      electricUsageRate.electric_usage_rate.day_rate ||
      electricUsageRate.electric_usage_rate.annual_night_usage ||
      electricUsageRate.electric_usage_rate.night_rate ||
      electricUsageRate.electric_usage_rate.annual_evening_usage ||
      electricUsageRate.electric_usage_rate.evening_rate
    ) {
      sendData = { ...sendData, ...electricUsageRate };
    }
    try {
      const response = await ajaxCall(
        `supply/new-supply/${siteId}/`,
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
        toast.success("New Supply Details For Electricity Edited Successfully");
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
          <label className="form-label">Supplier</label>
          <input
            type="text"
            className="form-control"
            value={NSElectricityData.e_supplier}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_supplier",
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
            value={NSElectricityData.e_product}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_product",
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
            value={NSElectricityData.e_won_date}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_won_date",
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
            value={NSElectricityData.e_contract_start_date}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_contract_start_date",
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
            value={NSElectricityData.e_contract_end_date}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_contract_end_date",
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
            value={NSElectricityData.e_contract_length_months}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_contract_length_months",
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
            value={NSElectricityData.e_contract_back_date}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_contract_back_date",
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
            value={NSElectricityData.e_supplier_reference}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_supplier_reference",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 1</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 2</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Information 3</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Notes</label>
          <input
            type="text"
            className="form-control"
            value={NSElectricityData.e_notes}
            onChange={(e) =>
              dispatchNSElectricityData({
                type: "e_notes",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
      <p className="mt-3">Notice of termination for this contract sent by :</p>
      <div className="mt-2 d-flex flex-wrap gap-3">
        <div className="form-check form-switch mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={NSElectricityData.e_agent}
            onChange={(e) => {
              dispatchNSElectricityData({
                type: "e_agent",
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
            checked={NSElectricityData.e_customer}
            onChange={(e) => {
              dispatchNSElectricityData({
                type: "e_customer",
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
          <div className="col-md-3 mt-2">
            <label className="form-label">Standing Charge (pence/day)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.stading_charge}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "stading_charge",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">
              Standing Charge Uplift (pence/day)
            </label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.standing_charge_uplift}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "standing_charge_uplift",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">KVA Rate (pence/kwh)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.kva_rate}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "kva_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Unit Rate Uplift</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.unit_rate_uplift}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "unit_rate_uplift",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Feed-in Tariff (FiT)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.feed_in_tariff}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "feed_in_tariff",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Annual Day Usage (kwh)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.annual_day_usage}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "annual_day_usage",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Day Rate (kwh)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.day_rate}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "day_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Annual Night Usage (kwh)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.annual_night_usage}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "annual_night_usage",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Night Rate (pence/kwh)</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.night_rate}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "night_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Annual Evening/Weekend Usage</label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.annual_evening_usage}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "annual_evening_usage",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">
              Evening/Weekend Rate (pence/kWh)
            </label>
            <input
              type="number"
              className="form-control"
              value={NSElectricityData.evening_rate}
              onChange={(e) =>
                dispatchNSElectricityData({
                  type: "evening_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="d-flex gap-4 mt-2">
            <div>Total Annual Usage (£) : 0.00</div>
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
            onClick={doNSElectricity}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default NewSupplyElectricity;
