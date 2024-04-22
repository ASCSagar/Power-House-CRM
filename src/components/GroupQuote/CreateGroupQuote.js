import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import Select from "../../UI/Select/Select";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const initialGroupQuotesData = {
  site: "",
  supplier: "",
  product: "",
  term: "",
  day_rate: "",
  night_rate: "",
  standing_charge: "",
  kva_charge: "",
  additional_charge: "",
  extra_info: "",
  up_lift: "",
  rates_already_include_at_uplift: false,
};

const reducerGroupQuote = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialGroupQuotesData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateGroupQuote = ({ refreshTableMode }) => {
  const [groupQuoteData, dispatchGroupQuote] = useReducer(
    reducerGroupQuote,
    initialGroupQuotesData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!groupQuoteData.site) {
      setFormError("Site is Required");
      return false;
    }
    if (!groupQuoteData.supplier) {
      setFormError("Supplier is Required");
      return false;
    }
    if (!groupQuoteData.product) {
      setFormError("Product is Required");
      return false;
    }
    if (!groupQuoteData.term) {
      setFormError("Term is Required");
      return false;
    }
    if (!groupQuoteData.day_rate) {
      setFormError("Day Rate is Required");
      return false;
    }
    if (!groupQuoteData.night_rate) {
      setFormError("Night Rate is Required");
      return false;
    }
    if (!groupQuoteData.standing_charge) {
      setFormError("Standing Charge Rate is Required");
      return false;
    }
    if (!groupQuoteData.kva_charge) {
      setFormError("KVA Charge Rate is Required");
      return false;
    }
    if (!groupQuoteData.up_lift) {
      setFormError("UP Lift Charge Rate is Required");
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
    dispatchGroupQuote({
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

  const createGroupSite = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let body = {
      supplier: groupQuoteData.supplier,
      product: groupQuoteData.product,
      term: groupQuoteData.term,
      day_rate: groupQuoteData.day_rate,
      night_rate: groupQuoteData.night_rate,
      standing_charge: groupQuoteData.standing_charge,
      kva_charge: groupQuoteData.kva_charge,
      additional_charge: groupQuoteData.additional_charge,
      extra_info: groupQuoteData.extra_info,
      up_lift: groupQuoteData.up_lift,
      rates_already_include_at_uplift:
        groupQuoteData.rates_already_include_at_uplift,
    };
    try {
      const response = await ajaxCall(
        `quote/generate-quote/multisite/${groupQuoteData.site}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(body),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        resetReducerForm();
        refreshTableMode();
        toast.success("Group Quote Created Successfully");
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

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create Group Quote</h5>
        <form className="row" onSubmit={createGroupSite}>
          <Select
            className="col-md-3"
            label="Group"
            name="site"
            isSearch={true}
            value={groupQuoteData.site}
            onChange={(val) => {
              dispatchGroupQuote({
                type: "site",
                value: val,
              });
            }}
            objKey={["group_name"]}
            url="multisite/"
          />
          <div className="col-md-3">
            <label className="form-label">Supplier</label>
            <input
              type="text"
              className="form-control"
              value={groupQuoteData.supplier}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "supplier",
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
              value={groupQuoteData.product}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "product",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Term</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.term}
              onChange={(e) =>
                dispatchGroupQuote({ type: "term", value: e.target.value })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Day Rate (pence/kWh)</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.day_rate}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "day_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Night Rate (pence/kWh)</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.night_rate}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "night_rate",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Standing Charge (pence)</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.standing_charge}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "standing_charge",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">KVA Charge (pence)</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.kva_charge}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "kva_charge",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Additional Charge(£)</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.additional_charge}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "additional_charge",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Extra Info</label>
            <input
              type="text"
              className="form-control"
              value={groupQuoteData.extra_info}
              onChange={(e) =>
                dispatchGroupQuote({
                  type: "extra_info",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Up Lift</label>
            <input
              type="number"
              className="form-control"
              value={groupQuoteData.up_lift}
              onChange={(e) =>
                dispatchGroupQuote({ type: "up_lift", value: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={groupQuoteData.rates_already_include_at_uplift}
                onChange={(e) => {
                  dispatchGroupQuote({
                    type: "rates_already_include_at_uplift",
                    value: e.target.checked,
                  });
                }}
              />
              <label className="form-check-label" for="flexSwitchCheckDefault">
                Rates Already Include At UpLift
              </label>
            </div>
          </div>
          <div className="text-center mt-2">
            {formStatus.isError ? (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            ) : (
              <div className="text-success mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Loading color="primary" text={"Creating Quote..."} />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus.isSubmitting}
              >
                Create Group Quote
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupQuote;
