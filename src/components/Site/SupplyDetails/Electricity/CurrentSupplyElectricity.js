import React, { useState } from "react";

const CurrentSupplyElectricity = () => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="col-md-3">
          <label className="form-label">Supplier</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Product</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Contract Type</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Won Date</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Start Date</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract End Date</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Length (Months)</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Contract Back Date</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Supplier Reference</label>
          <input type="text" className="form-control" />
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
      </div>
      <p className="mt-3">Notice of termination for this contract sent by : </p>
      <div className="mt-2 d-flex flex-wrap gap-3">
        <div className="form-check form-switch mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
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
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">
              Standing Charge Uplift (pence/day)
            </label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">KVA Rate (pence/kwh)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Unit Rate Uplift</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Feed-in Tariff (FiT)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Annual Day Usage (kwh)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Day Rate (kwh)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Annual Night Usage (kwh)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Night Rate (pence/kwh)</label>
            <input type="number" className="form-control" />
          </div>
          <div className="d-flex gap-4 mt-2">
            <div>Total Annual Usage (£) : 0.00</div>
            <div>Total Commission (£) : 0.00</div>
            <div>Annual Commission (£) : 0.00</div>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary mt-3"
        style={{ marginLeft: open ? "" : "10px" }}
      >
        Submit
      </button>
    </>
  );
};

export default CurrentSupplyElectricity;
