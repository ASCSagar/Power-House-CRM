import React from "react";

const Tab = ({ id, isActive, children }) => {
  return (
    <li className="nav-item" role="presentation">
      <button
        className={`nav-link ${isActive ? "active" : ""}`}
        id={`${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#bordered-${id}`}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected={isActive ? "true" : "false"}
      >
        {children}
      </button>
    </li>
  );
};

export default Tab;
