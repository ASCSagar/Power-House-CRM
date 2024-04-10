import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ title, middle, main }) => {
  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/Dashboard">{main}</Link>
          </li>
          {middle && <li className="breadcrumb-item">{middle}</li>}
          <li className="breadcrumb-item active">{title}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;