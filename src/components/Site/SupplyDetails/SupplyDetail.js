import React, { useState } from "react";
import MeterDetailGas from "./Gas/MeterDetailGas";
import CurrentSupplyGas from "./Gas/CurrentSupplyGas";
import NewSupplyGas from "./Gas/NewSupplyGas";
import MeterDetailsElectricity from "./Electricity/MeterDetailsElectricity";
import CurrentSupplyElectricity from "./Electricity/CurrentSupplyElectricity";
import NewSupplyElectricity from "./Electricity/NewSupplyElectricity";

const SupplyDetail = () => {
  const [activeTab, setActiveTab] = useState("mGas");

  const tabs = [
    { id: "mGas", title: "Meter Details (Gas)", component: <MeterDetailGas /> },
    {
      id: "cGas",
      title: "Current Supply (Gas)",
      component: <CurrentSupplyGas />,
    },
    { id: "contact", title: "New Supply (Gas)", component: <NewSupplyGas /> },
    {
      id: "mElectricity",
      title: "Meter Details (Electricity)",
      component: <MeterDetailsElectricity />,
    },
    {
      id: "cElectricity",
      title: "Current Supply (Electricity)",
      component: <CurrentSupplyElectricity />,
    },
    {
      id: "nElectricity",
      title: "New Supply (Electricity)",
      component: <NewSupplyElectricity />,
    },
  ];

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