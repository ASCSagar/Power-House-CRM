import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Select from "../../UI/Select/Select";
import Loading from "../../UI/Loading/Loading";

const initialQuoteData = {
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

const reducerQuote = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialQuoteData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateQuote = ({ refreshTableMode }) => {
  const [quoteData, dispatchQuote] = useReducer(reducerQuote, initialQuoteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!quoteData.site) {
      setFormError("Site is Required");
      return false;
    }
    if (!quoteData.supplier) {
      setFormError("Supplier is Required");
      return false;
    }
    if (!quoteData.product) {
      setFormError("Product is Required");
      return false;
    }
    if (!quoteData.term) {
      setFormError("Term is Required");
      return false;
    }
    if (!quoteData.day_rate) {
      setFormError("Day Rate is Required");
      return false;
    }
    if (!quoteData.night_rate) {
      setFormError("Night Rate is Required");
      return false;
    }
    if (!quoteData.standing_charge) {
      setFormError("Standing Charge Rate is Required");
      return false;
    }
    if (!quoteData.kva_charge) {
      setFormError("KVA Charge Rate is Required");
      return false;
    }
    if (!quoteData.up_lift) {
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
    dispatchQuote({
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

  const createQuote = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      site: quoteData.site,
      supplier: quoteData.supplier,
      product: quoteData.product,
      term: quoteData.term,
      day_rate: quoteData.day_rate,
      night_rate: quoteData.night_rate,
      standing_charge: quoteData.standing_charge,
      kva_charge: quoteData.kva_charge,
      additional_charge: quoteData.additional_charge,
      extra_info: quoteData.extra_info,
      up_lift: quoteData.up_lift,
      rates_already_include_at_uplift:
        quoteData.rates_already_include_at_uplift,
    };
    try {
      const response = await ajaxCall(
        "quote/generate-quote/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        resetReducerForm();
        refreshTableMode();
        toast.success("Quote Created Successfully");
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
        <h5 className="card-title">Create Quote</h5>
        <form onSubmit={createQuote}>
          <div className="row mt-2">
            <Select
              className="col-md-3"
              label="Site Name"
              name="site"
              isSearch={true}
              value={quoteData.site}
              onChange={(val) => {
                dispatchQuote({
                  type: "site",
                  value: val,
                });
              }}
              objKey={["site_name"]}
              url="sites/get/site/"
            />
            <div className="col-md-3">
              <label className="form-label">Supplier</label>
              <input
                type="text"
                className="form-control"
                value={quoteData.supplier}
                onChange={(e) =>
                  dispatchQuote({
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
                value={quoteData.product}
                onChange={(e) =>
                  dispatchQuote({
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
                value={quoteData.term}
                onChange={(e) =>
                  dispatchQuote({ type: "term", value: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mt-2">
              <label className="form-label">Day Rate (pence/kWh)</label>
              <input
                type="number"
                className="form-control"
                value={quoteData.day_rate}
                onChange={(e) =>
                  dispatchQuote({ type: "day_rate", value: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mt-2">
              <label className="form-label">Night Rate (pence/kWh)</label>
              <input
                type="number"
                className="form-control"
                value={quoteData.night_rate}
                onChange={(e) =>
                  dispatchQuote({ type: "night_rate", value: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mt-2">
              <label className="form-label">Standing Charge (pence)</label>
              <input
                type="number"
                className="form-control"
                value={quoteData.standing_charge}
                onChange={(e) =>
                  dispatchQuote({
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
                value={quoteData.kva_charge}
                onChange={(e) =>
                  dispatchQuote({ type: "kva_charge", value: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mt-2">
              <label className="form-label">Additional Charge(£)</label>
              <input
                type="number"
                className="form-control"
                value={quoteData.additional_charge}
                onChange={(e) =>
                  dispatchQuote({
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
                value={quoteData.extra_info}
                onChange={(e) =>
                  dispatchQuote({ type: "extra_info", value: e.target.value })
                }
              />
            </div>
            <div className="col-md-3 mt-2">
              <label className="form-label">Up Lift</label>
              <input
                type="number"
                className="form-control"
                value={quoteData.up_lift}
                onChange={(e) =>
                  dispatchQuote({ type: "up_lift", value: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={quoteData.rates_already_include_at_uplift}
                onChange={(e) => {
                  dispatchQuote({
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
                Create Quote
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuote;
