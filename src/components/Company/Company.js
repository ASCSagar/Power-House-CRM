import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import Table from "../../UI/Table/Table";
import CreateCompany from "./CreateCompany";

const Company = () => {
  const [companyData, setCompanyData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const openCreateCompany = () => {
    setShowCreateCompany((prev) => !prev);
  };

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "company/",
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
        if (response?.status === 200) {
          setCompanyData(response?.data);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const companyDashboard = (params) => (
    <Link to={`/company/${params.data.id}`}>{params.value}</Link>
  );

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Company Name",
      field: "name",
      cellRenderer: companyDashboard,
      filter: true,
    },
    {
      headerName: "Number Of Employees",
      field: "number_of_employees",
      filter: true,
    },
    {
      headerName: "Registration Number",
      field: "registration_no",
      filter: true,
    },
    {
      headerName: "Estimated Turnover",
      field: "estimated_turnover",
      filter: true,
    },
    {
      name: "Account Name",
      field: "account_name",
      filter: true,
    },
    {
      name: "Account No",
      field: "account_no",
      filter: true,
    },
    {
      name: "Address",
      field: "address",
      filter: true,
    },
    {
      name: "Address line1",
      field: "addressline1_company",
      filter: true,
    },
    {
      name: "Address line2",
      field: "addressline2_company",
      filter: true,
    },
    {
      name: "Address line3",
      field: "addressline3_company",
      filter: true,
    },
    {
      name: "Bank Name",
      field: "bank_name",
      filter: true,
    },
    {
      name: "Business Type",
      field: "business_type",
      filter: true,
    },
    {
      name: "Country Of Company",
      field: "country_of_company",
      filter: true,
    },
    {
      name: "Home Postcode",
      field: "home_post_code",
      filter: true,
    },
    {
      name: "Macro Business",
      field: "is_macro_business",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      name: "Partner DOB",
      field: "partner_dob",
      filter: true,
    },
    {
      name: "Partner Name",
      field: "partner_name",
      filter: true,
    },
    {
      name: "Registration No",
      field: "registration_no",
      filter: true,
    },
    {
      name: "Shortcode",
      field: "shortcode",
      filter: true,
    },
    {
      name: "Postcode",
      field: "postcode",
      filter: true,
    },
  ];

  return (
    <main id="main" className="main">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <Breadcrumbs
          title="Companies"
          middle="Company"
          middleUrl="Companies"
          main="Dashboard"
        />
        <button className="btn btn-primary" onClick={openCreateCompany}>
          <i className="bi bi-plus-square"></i> Create Company
        </button>
      </div>
      {showCreateCompany && (
        <CreateCompany refreshTableMode={refreshTableMode} />
      )}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Companies</h5>
                <Table rowData={companyData} columnDefs={columns} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Company;
