import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../UI/Loading/Loading";

const initialsMDG = {
  g_mpr: "",
  g_serial_number: "",
  g_smart_meter: false,
  g_igt_meter: false,
  g_green_deal: false,
};

const reducerMDG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialsMDG;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const MeterDetailGas = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [meterGasData, dispatchMeterGasData] = useReducer(
    reducerMDG,
    initialsMDG
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const resetReducerForm = () => {
    dispatchMeterGasData({
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
          dispatchMeterGasData({ type: "reset", payload: response.data });
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [siteId]);

  const doMDG = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      g_mpr: meterGasData.g_mpr,
      g_serial_number: meterGasData.g_serial_number,
      g_smart_meter: meterGasData.g_smart_meter,
      g_igt_meter: meterGasData.g_igt_meter,
      g_green_deal: meterGasData.g_green_deal,
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
        toast.success("Meter Details For GAS Edited Successfully");
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
    <form onSubmit={doMDG}>
      <div className="row mt-2">
        <div className="col-md-4">
          <label className="form-label">MRP</label>
          <input
            type="text"
            className="form-control"
            value={meterGasData.g_mpr}
            onChange={(e) =>
              dispatchMeterGasData({
                type: "g_mpr",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Serial Number</label>
          <input
            type="text"
            className="form-control"
            value={meterGasData.g_serial_number}
            onChange={(e) =>
              dispatchMeterGasData({
                type: "g_serial_number",
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
              checked={meterGasData.g_smart_meter}
              onChange={(e) => {
                dispatchMeterGasData({
                  type: "g_smart_meter",
                  value: e.target.checked,
                });
              }}
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
              checked={meterGasData.g_igt_meter}
              onChange={(e) => {
                dispatchMeterGasData({
                  type: "g_igt_meter",
                  value: e.target.checked,
                });
              }}
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              IGT Meter
            </label>
          </div>
          <div className="form-check form-switch mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={meterGasData.g_green_deal}
              onChange={(e) => {
                dispatchMeterGasData({
                  type: "g_green_deal",
                  value: e.target.checked,
                });
              }}
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

export default MeterDetailGas;
