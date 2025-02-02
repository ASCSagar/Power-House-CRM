import React, { useEffect, useState } from "react";
import MeterDetailGas from "./Gas/MeterDetailGas";
import CurrentSupplyGas from "./Gas/CurrentSupplyGas";
import NewSupplyGas from "./Gas/NewSupplyGas";
import MeterDetailsElectricity from "./Electricity/MeterDetailsElectricity";
import CurrentSupplyElectricity from "./Electricity/CurrentSupplyElectricity";
import NewSupplyElectricity from "./Electricity/NewSupplyElectricity";
import ajaxCall from "../../../helpers/ajaxCall";

const SupplyDetail = ({ leadType, MpanID }) => {
  const defaultTab = leadType === "GAS" ? "mGas" : "mElectricity";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [gasDetails, setGasDetails] = useState([]);
  const [electricityDetails, setElectricityDetails] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "lookup/Property/SearchByPropertyAddressId/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "POST",
            body: JSON.stringify({
              query: MpanID,
              isQueryTicket: true,
            }),
          },
          8000
        );
        if (response?.status === 200) {
          if (leadType === "GAS") {
            setGasDetails(response?.data?.gasInfo);
          } else {
            setElectricityDetails(response?.data?.elecInfo[0]);
          }
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [leadType, MpanID]);

  const gasTabs = [
    {
      id: "mGas",
      title: "Meter Details",
      component: <MeterDetailGas gasDetails={gasDetails} />,
    },
    {
      id: "cGas",
      title: "Current Supply",
      component: <CurrentSupplyGas gasDetails={gasDetails} />,
    },
    {
      id: "nGas",
      title: "New Supply",
      component: <NewSupplyGas />,
    },
  ];

  const electricityTabs = [
    {
      id: "mElectricity",
      title: "Meter Details",
      component: <MeterDetailsElectricity EleDetails={electricityDetails} />,
    },
    {
      id: "cElectricity",
      title: "Current Supply",
      component: <CurrentSupplyElectricity EleDetails={electricityDetails} />,
    },
    {
      id: "nElectricity",
      title: "New Supply",
      component: <NewSupplyElectricity />,
    },
  ];

  const tabs = leadType === "GAS" ? gasTabs : electricityTabs;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <ul
        className="nav nav-tabs nav-tabs-bordered"
        id="borderedTab"
        role="tablist"
      >
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              id={`${tab.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#bordered-${tab.id}`}
              type="button"
              role="tab"
              aria-controls={tab.id}
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content pt-2" id="borderedTabContent">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${
              activeTab === tab.id ? "show active" : ""
            }`}
            id={`bordered-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </>
  );
};

export default SupplyDetail;