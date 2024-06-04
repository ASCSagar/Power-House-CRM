import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Tab from "../../UI/Tab/Tab";
import Select from "../../UI/Select/Select";
import Quotation from "./Quotation";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const initialData = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  postcode: "",
  g_mpr: "",
  e_meter_type: "",
  credit_score: 0,
  custom_end_date: moment().format("YYYY-MM-DD"),
  measurement_class: "",
  payment_method: "MONTHLY DIRECT DEBIT",
  current_supplier: "",
  renewal_date: moment().format("YYYY-MM-DD"),
  unit_rate_uplift: "MAXIMUM",
  invariable_uplift:0,
  annual_day_usage: 0,
  day_rate: 0,
  feed_in_tariff: 0,
  stading_charge: 0,
  annual_usage: 0,
};

const reducerData = (state, action) => {
  switch (action.type) {
    case "reset":
      return { ...initialData, ...action.payload };
    case "update":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const tabs = [
  { id: "1", title: "Basic Details" },
  { id: "2", title: "Usage Details" },
  { id: "3", title: "Contract Details" },
  { id: "4", title: "Additional Details" },
];

const TextInput = ({
  className,
  label,
  value,
  readOnly = false,
  field,
  dispatchFormData,
}) => (
  <div className={className}>
    <label className="form-label">{label}</label>
    <input
      type="text"
      className="form-control"
      value={value}
      readOnly={readOnly}
      onChange={(e) =>
        !readOnly &&
        dispatchFormData({ type: "update", field, value: e.target.value })
      }
    />
  </div>
);

const NumberInput = ({ className, label, value, field, dispatchFormData }) => (
  <div className={className}>
    <label className="form-label">{label}</label>
    <input
      type="number"
      className="form-control"
      value={value}
      onChange={(e) =>
        dispatchFormData({ type: "update", field, value: e.target.value })
      }
    />
  </div>
);

const DateInput = ({ className, label, value, field, dispatchFormData }) => (
  <div className={className}>
    <label className="form-label">{label}</label>
    <input
      type="date"
      className="form-control"
      value={value}
      onChange={(e) =>
        dispatchFormData({ type: "update", field, value: e.target.value })
      }
    />
  </div>
);

const SelectInput = ({
  className,
  label,
  value,
  field,
  options,
  dispatchFormData,
}) => (
  <div className={className}>
    <label className="form-label">{label}</label>
    <select
      className="form-select"
      value={value}
      onChange={(e) =>
        dispatchFormData({ type: "update", field, value: e.target.value })
      }
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const paymentMethods = [
  { value: "MONTHLY DIRECT DEBIT", label: "Monthly Direct Debit" },
  { value: "QUARTERLY DIRECT DEBIT", label: "Quarterly Direct Debit" },
  { value: "CASH CHEQUE", label: "Cash / Cheque" },
  { value: "VARIALBE DIRECT DEBIT", label: "Variable Direct Debit" },
  { value: "BACS", label: "BACS" },
  { value: "PREPAYEMENT", label: "PrePayment" },
  { value: "UNSPECIFIED", label: "Unspecified" },
];

const unitRateUplifts = [
  { value: "MAXIMUM", label: "Maximum" },
  { value: "MINIMUM", label: "Minimum" },
  { value: "INVARIABLE", label: "Invariable" },
];

const CreateQuote = ({ setShowCreateQuote }) => {
  const [site, setSite] = useState("");
  const [siteId, setSiteId] = useState("");
  const [leadType, setLeadType] = useState("ELECTRICITY");
  const [showQuotation, setShowQuotation] = useState(false);
  const [formData, dispatchFormData] = useReducer(reducerData, initialData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  useEffect(() => {
    if (!siteId) return;

    const fetchSiteDetails = async () => {
      try {
        const response = await ajaxCall(
          `sites/extra-details/${siteId}/`,
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

        const data = response?.data;
        setLeadType(data?.lead_type);
        const newData = {
          postcode: data?.basic_detail?.postcode || "",
          e_mpan_topline: data?.basic_detail?.e_mpan_topline || "",
          e_mpan_bottomline: data?.basic_detail?.e_mpan_bottomline || "",
          g_mpr: data?.basic_detail?.g_mpr || "",
          e_meter_type: data?.basic_detail?.e_meter_type || "",
          credit_score: data?.additional_detail?.credit_score || "",
          custom_end_date: data?.additional_detail?.custom_end_date || "",
          measurement_class: data?.additional_detail?.measurement_class || "",
          current_supplier: data?.contract_detail?.current_supplier || "",
          payment_method: data?.contract_detail?.payment_method || "",
          renewal_date: data?.contract_detail?.renewal_date || "",
          unit_rate_uplift: data?.contract_detail?.unit_rate_uplift || "",
          invariable_uplift: data?.contract_detail?.invariable_uplift || "",
          annual_day_usage: data?.usage_detail?.annual_day_usage || "",
          day_rate: data?.usage_detail?.day_rate || "",
          feed_in_tariff: data?.usage_detail?.feed_in_tariff || "",
          stading_charge: data?.usage_detail?.stading_charge || "",
          annual_usage: data?.usage_detail?.annual_usage || "",
        };

        dispatchFormData({ type: "reset", payload: newData });
      } catch (error) {
        console.error("Error fetching site details:", error);
      }
    };
    fetchSiteDetails();
  }, [siteId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSite(siteId);
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const sendData = {
      contract_detail: {
        payment_method: formData.payment_method,
        renewal_date: formData.renewal_date,
        unit_rate_uplift: formData.unit_rate_uplift,
        invariable_uplift: formData.invariable_uplift,
      },
      additional_detail: {
        credit_score: formData.credit_score,
        custom_end_date: formData.custom_end_date,
        measurement_class: formData.measurement_class,
      },
      usage_detail: {
        annual_day_usage: formData.annual_day_usage,
        day_rate: formData.day_rate,
        feed_in_tariff: formData.feed_in_tariff,
        stading_charge: formData.stading_charge,
        annual_usage: formData.annual_usage,
      },
    };

    try {
      const response = await ajaxCall(
        `sites/extra-details/${siteId}/`,
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

      if (response.status === 200) {
        setShowQuotation(true);
      } else {
        toast.error("Some problem occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some problem occurred. Please try again.");
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Quote</h5>
          <ul
            className="nav nav-tabs nav-tabs-bordered"
            id="borderedTab"
            role="tablist"
          >
            {tabs.map((tab, index) => (
              <Tab key={tab.id} id={tab.id} isActive={index === 0}>
                {tab.title}
              </Tab>
            ))}
          </ul>
          <form onSubmit={handleOnSubmit}>
            <div className="tab-content pt-2" id="borderedTabContent">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade ${
                    index === 0 ? "show active" : ""
                  }`}
                  id={`bordered-${tab.id}`}
                  role="tabpanel"
                >
                  {tab.id === "1" && (
                    <div className="row mt-2">
                      <Select
                        className="col-4"
                        label="Site Name"
                        name="site"
                        isSearch={true}
                        objKey={["site_name"]}
                        url="sites/get/site/"
                        onChange={(e) => setSiteId(e)}
                      />
                      <TextInput
                        className="col-md-4"
                        label="Post Code"
                        value={formData.postcode}
                        readOnly
                      />
                      {leadType === "GAS" ? (
                        <TextInput
                          className="col-md-4"
                          label="MPR"
                          value={formData.g_mpr}
                          readOnly
                        />
                      ) : (
                        <>
                          <TextInput
                            className="col-md-4"
                            label="Top Line"
                            value={formData.e_mpan_topline}
                            readOnly
                          />
                          <TextInput
                            className="col-md-4 mt-2"
                            label="Bottom Line"
                            value={formData.e_mpan_bottomline}
                            readOnly
                          />
                        </>
                      )}
                    </div>
                  )}
                  {tab.id === "2" && (
                    <div className="row mt-2">
                      {leadType === "GAS" ? (
                        <>
                          <NumberInput
                            className="col-md-4"
                            label="Annual Usage (kWh)"
                            value={formData.annual_usage}
                            field="annual_usage"
                            dispatchFormData={dispatchFormData}
                          />
                          <TextInput
                            className="col-md-4"
                            label="Old Rate (pence/kWh)"
                            value=""
                            readOnly
                          />
                          <NumberInput
                            className="col-md-4"
                            label="Standing Charge (pence/day)"
                            value={formData.stading_charge}
                            field="stading_charge"
                            dispatchFormData={dispatchFormData}
                          />
                          <div className="mt-2">Current Cost (£): 0.00</div>
                        </>
                      ) : (
                        <>
                          <NumberInput
                            className="col-md-4"
                            label="Annual Day Usage (kWh)"
                            value={formData.annual_day_usage}
                            field="annual_day_usage"
                            dispatchFormData={dispatchFormData}
                          />
                          <NumberInput
                            className="col-md-4"
                            label="Day Rate (pence/kWh)"
                            value={formData.day_rate}
                            field="day_rate"
                            dispatchFormData={dispatchFormData}
                          />
                          <NumberInput
                            className="col-md-4"
                            label="Feed-In Tariff (FiT) (pence/kWh)"
                            value={formData.feed_in_tariff}
                            field="feed_in_tariff"
                            dispatchFormData={dispatchFormData}
                          />
                          <NumberInput
                            className="col-md-4"
                            label="Standing Charge (pence/day)"
                            value={formData.stading_charge}
                            field="stading_charge"
                            dispatchFormData={dispatchFormData}
                          />
                          <div className="mt-2">Current Cost (£): 0.00</div>
                        </>
                      )}
                    </div>
                  )}
                  {tab.id === "3" && (
                    <div className="row mt-2">
                      <SelectInput
                        className="col-md-4"
                        label="Payment Type"
                        value={formData.payment_method}
                        field="payment_method"
                        options={paymentMethods}
                        dispatchFormData={dispatchFormData}
                      />
                      <TextInput
                        className="col-md-4"
                        label="Current Supplier"
                        value={formData.current_supplier}
                        readOnly
                      />
                      <DateInput
                        className="col-md-4"
                        label="Renewal Date"
                        value={formData.renewal_date}
                        field="renewal_date"
                        dispatchFormData={dispatchFormData}
                      />
                      <SelectInput
                        className="col-md-4 mt-2"
                        label="Unit Rate Uplift"
                        value={formData.unit_rate_uplift}
                        field="unit_rate_uplift"
                        options={unitRateUplifts}
                        dispatchFormData={dispatchFormData}
                      />
                      <NumberInput
                        className="col-md-4 mt-2"
                        label="Up Lift"
                        value={formData.invariable_uplift}
                        field="invariable_uplift"
                        dispatchFormData={dispatchFormData}
                      />
                      <TextInput
                        className="col-md-4 mt-2"
                        label="Email"
                        value={formData.email}
                        field="email"
                        dispatchFormData={dispatchFormData}
                      />
                    </div>
                  )}
                  {tab.id === "4" && (
                    <div className="row mt-2">
                      <NumberInput
                        className="col-md-4"
                        label="Credit Score"
                        value={formData.credit_score}
                        field="credit_score"
                        dispatchFormData={dispatchFormData}
                      />
                      <DateInput
                        className="col-md-4"
                        label="Custom End Date"
                        value={formData.custom_end_date}
                        field="custom_end_date"
                        dispatchFormData={dispatchFormData}
                      />
                      {leadType !== "GAS" && (
                        <>
                          <TextInput
                            className="col-md-4"
                            label="Measurement Class"
                            value={formData.measurement_class}
                            field="measurement_class"
                            dispatchFormData={dispatchFormData}
                          />
                          <TextInput
                            className="col-md-4 mt-2"
                            label="Meter Type"
                            value={formData.e_meter_type}
                            readOnly
                          />
                          <TextInput
                            className="col-md-4 mt-2"
                            label="SSC"
                            value={formData.ssc}
                            field="ssc"
                            dispatchFormData={dispatchFormData}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Loading color="primary" text="Comparing..." />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formStatus.isSubmitting}
                >
                  Compare
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {showQuotation && (
        <div className="card">
          <div className="card-body">
            <Quotation
              siteId={site}
              upLiftRate={formData.invariable_uplift}
              setShowQuotation={setShowQuotation}
              setShowCreateQuote={setShowCreateQuote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuote;
