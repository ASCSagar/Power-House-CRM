import React, { useState } from "react";
import Tab from "../../UI/Tab/Tab";
import Select from "../../UI/Select/Select";
import Quotation from "./Quotation";

const tabs = [
  { id: "1", title: "Basic Details" },
  { id: "2", title: "Usage Details" },
  { id: "3", title: "Contract Details" },
  { id: "4", title: "Additional Details" },
];

const leadType = "GAS";

const CreateQuotes = ({ setShowCreateQuote }) => {
  const [site, setSite] = useState("");
  const [siteId, setSiteId] = useState("");
  const [showQuotation, setShowQuotation] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSite(siteId);
    setShowQuotation(true);
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
              <div
                className="tab-pane fade show active"
                id="bordered-1"
                role="tabpanel"
                aria-labelledby="1-tab"
              >
                <div className="row mt-2">
                  <Select
                    className="col-4"
                    label="Site Name"
                    name="site"
                    isSearch={true}
                    objKey={["site_name"]}
                    url="sites/get/site/"
                    onChange={(e) => {
                      setSiteId(e);
                    }}
                  />
                  <div className="col-md-4">
                    <label className="form-label">Post Code</label>
                    <input type="text" className="form-control" />
                  </div>
                  {leadType === "GAS" ? (
                    <div className="col-md-4">
                      <label className="form-label">MPR</label>
                      <input type="text" className="form-control" />
                    </div>
                  ) : (
                    <>
                      <div className="col-md-4">
                        <label className="form-label">Top Line</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4 mt-2">
                        <label className="form-label">Bottom Line</label>
                        <input type="text" className="form-control" />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="bordered-2"
                role="tabpanel"
                aria-labelledby="2-tab"
              >
                <div className="row mt-2">
                  {leadType === "GAS" ? (
                    <>
                      <div className="col-md-4">
                        <label className="form-label">Annual Usage (kWh)</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">
                          Old Rate (pence/kWh)
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">
                          Standing Charge (pence/day)
                        </label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="mt-2">Current Cost (£) : 0.00</div>
                    </>
                  ) : (
                    <>
                      {[
                        { label: "Annual Day Usage (kWh)", type: "number" },
                        { label: "Old day rate (pence/kWh)", type: "number" },
                        { label: "Annual Night Usage", type: "number" },
                        { label: "Old Night Rate", type: "number" },
                        { label: "Annual Weekend Usage", type: "number" },
                        { label: "Old Weekend Rate", type: "number" },
                        {
                          label: "Feed-In Tariff (FiT) (pence/kWh)",
                          type: "number",
                        },
                        {
                          label: "Standing Charge (pence/day)",
                          type: "number",
                        },
                      ].map((field, index) => (
                        <div
                          key={index}
                          className={`col-md-4 ${index % 3 !== 0 && "mt-2"}`}
                        >
                          <label className="form-label">{field.label}</label>
                          <input type={field.type} className="form-control" />
                        </div>
                      ))}
                      <div className="mt-2">Current Cost (£) : 0.00</div>
                    </>
                  )}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="bordered-3"
                role="tabpanel"
                aria-labelledby="3-tab"
              >
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label className="form-label">Payment Type</label>
                    <select className="form-select">
                      {[
                        "Monthly Direct Debit",
                        "Quarterly Direct Debit",
                        "Cash / Cheque",
                        "Variable Direct Debit",
                        "BACS",
                        "PrePayment",
                        "Unspecified",
                      ].map((option, index) => (
                        <option
                          key={index}
                          value={index + 1}
                          selected={index === 0}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Current Supplier</label>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Renewal Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Unit Rate Uplift</label>
                    <select className="form-select">
                      {["Maximum", "Minimum", "Invariable"].map(
                        (option, index) => (
                          <option
                            key={index}
                            value={index + 1}
                            selected={index === 0}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="bordered-4"
                role="tabpanel"
                aria-labelledby="4-tab"
              >
                <div className="row mt-2">
                  {leadType === "GASs" ? (
                    <>
                      <div className="col-md-4">
                        <label className="form-label">Credit Score</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Custom End Date </label>
                        <input type="date" className="form-control" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-4">
                        <label className="form-label">Credit Score</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Custom End Date </label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Measurement Class</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4 mt-2">
                        <label className="form-label">Meter Type</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4 mt-2">
                        <label className="form-label">SSC</label>
                        <input type="text" className="form-control" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">
                Save & Compare
              </button>
            </div>
          </form>
        </div>
      </div>
      {showQuotation && (
        <div className="card">
          <div className="card-body">
            <Quotation siteId={site} setShowQuotation={setShowQuotation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuotes;
