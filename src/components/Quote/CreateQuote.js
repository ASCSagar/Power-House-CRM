import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Select from "../../UI/Select/Select";
import Loading from "../../UI/Loading/Loading";
import Rates from "./Rates/Rates";
import SmallModal from "../../UI/Modal/Modal";

const initialQuoteData = {
  site: "",
  supplier: "",
  product: "",
  term: 0,
  day_rate: 0.0,
  night_rate: 0.0,
  standing_charge: 0.0,
  kva_charge: 0.0,
  additional_charge: 0.0,
  extra_info: "",
  up_lift: 0.0,
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

const CreateQuote = ({ refreshTableMode, setShowCreateQuote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [quoteData, dispatchQuote] = useReducer(reducerQuote, initialQuoteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `sites/update/site/${quoteData.site}/`,
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
        if (response?.status === 200) {
          setSiteData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [quoteData.site]);

  const handleQuotes = (data) => {
    dispatchQuote({
      type: "supplier",
      value: data?.Supplier,
    });
    dispatchQuote({
      type: "product",
      value: siteData?.lead_type,
    });
    dispatchQuote({
      type: "term",
      value: data?.Term,
    });
    dispatchQuote({
      type: "day_rate",
      value: data?.DayUnitrate,
    });
    dispatchQuote({
      type: "night_rate",
      value: data?.NightUnitrate,
    });
    dispatchQuote({
      type: "standing_charge",
      value: data?.StandingCharge,
    });
    dispatchQuote({
      type: "extra_info",
      value: data?.ExtraInfo || "--",
    });
    dispatchQuote({
      type: "up_lift",
      value: data?.Uplift,
    });
  };

  const handleCloseCreateQuote = () => {
    resetReducerForm();
    refreshTableMode();
    setShowCreateQuote(false);
  };

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
        handleCloseCreateQuote();
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
    <>
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
                  console.log(val);
                  dispatchQuote({
                    type: "site",
                    value: val,
                  });
                  setIsModalOpen(true);
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
                <label
                  className="form-check-label"
                  for="flexSwitchCheckDefault"
                >
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
      <SmallModal
        size="xl"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Choose The Rate For ${siteData.site_name} Quotation`}
      >
        <Rates
          siteID={quoteData.site}
          onRowSelect={handleQuotes}
          setIsModalOpen={setIsModalOpen}
        />
      </SmallModal>
    </>
  );
};

export default CreateQuote;
