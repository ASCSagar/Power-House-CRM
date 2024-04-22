import React from "react";

const MeterDetailsElectricity = () => {
  return (
    <>
      <div className="row mt-2">
        <div className="col-md-3">
          <label className="form-label">MPAN Top Line</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">MPAN Bottom Line</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Meter Type</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Serial Number</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Capacity (KVA)</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Voltage</label>
          <input type="number" className="form-control" />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Measurement Class</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mt-2 d-flex flex-wrap gap-3">
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Smart Meter (AMR)
            </label>
          </div>
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Related Meter
            </label>
          </div>
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Key Meter
            </label>
          </div>
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Green Deal
            </label>
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-4">Submit</button>
    </>
  );
};

export default MeterDetailsElectricity;
