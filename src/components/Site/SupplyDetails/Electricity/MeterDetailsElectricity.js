import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../../../../UI/Loading/Loading";

const initialMDE = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  e_meter_type: "",
  e_serial_number: "",
  e_capacity: "",
  e_voltage: "",
  e_measurement_class: "",
  e_smart_meter: false,
  e_related_meter: false,
  e_ley_meter: false,
  e_green_deal: false,
};

const reducerMDE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialMDE;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const MeterDetailsElectricity = ({ meterDetails }) => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [meterElectricityData, dispatchMeterElectricityData] = useReducer(
    reducerMDE,
    initialMDE
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const resetReducerForm = () => {
    dispatchMeterElectricityData({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        try {
          const response = await ajaxCall(
            `supply/meter-detail/${siteId}/`,
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
          const { pc, mtc, llf } = meterDetails;
          const mpanTopLine = `${pc}${mtc}${llf}`;

          dispatchMeterElectricityData({
            type: "reset",
            payload: {
              ...response.data,
              e_mpan_topline: mpanTopLine,
              e_mpan_bottomline: meterDetails.mpan,
              e_meter_type: meterDetails.meters[0]?.meterType || "",
              e_smart_meter: meterDetails.meters[0]?.isSmart,
            },
          });
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [meterDetails, siteId]);

  const doMDE = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      e_mpan_topline: meterElectricityData.e_mpan_topline,
      e_mpan_bottomline: meterElectricityData.e_mpan_bottomline,
      e_meter_type: meterElectricityData.e_meter_type,
      e_serial_number: meterElectricityData.e_serial_number,
      e_capacity: meterElectricityData.e_capacity,
      e_voltage: meterElectricityData.e_voltage,
      e_measurement_class: meterElectricityData.e_measurement_class,
      e_smart_meter: meterElectricityData.e_smart_meter,
      e_related_meter: meterElectricityData.e_related_meter,
      e_ley_meter: meterElectricityData.e_ley_meter,
      e_green_deal: meterElectricityData.e_green_deal,
    };
    try {
      const response = await ajaxCall(
        `supply/meter-detail/${siteId}/`,
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
        toast.success("Meter Details For Electricity Edited Successfully");
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
    <form onSubmit={doMDE}>
      <div className="row mt-2">
        <div className="col-md-3">
          <label className="form-label">MPAN Top Line</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_mpan_topline}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_mpan_topline",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">MPAN Bottom Line</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_mpan_bottomline}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_mpan_bottomline",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Meter Type</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_meter_type}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_meter_type",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Serial Number</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_serial_number}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_serial_number",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Capacity (KVA)</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_capacity}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_capacity",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Voltage</label>
          <input
            type="number"
            className="form-control"
            value={meterElectricityData.e_voltage}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_voltage",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-3 mt-2">
          <label className="form-label">Measurement Class</label>
          <input
            type="text"
            className="form-control"
            value={meterElectricityData.e_measurement_class}
            onChange={(e) =>
              dispatchMeterElectricityData({
                type: "e_measurement_class",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-2 d-flex flex-wrap gap-3">
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={meterElectricityData.e_smart_meter}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_smart_meter",
                  value: e.target.checked,
                })
              }
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
              checked={meterElectricityData.e_related_meter}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_related_meter",
                  value: e.target.checked,
                })
              }
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
              checked={meterElectricityData.e_ley_meter}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_ley_meter",
                  value: e.target.checked,
                })
              }
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
              checked={meterElectricityData.e_green_deal}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_green_deal",
                  value: e.target.checked,
                })
              }
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Green Deal
            </label>
          </div>
        </div>
      </div>
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
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MeterDetailsElectricity;
