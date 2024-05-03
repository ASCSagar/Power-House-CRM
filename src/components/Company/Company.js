import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

  const handleCompanyEdit = async (companyId, fieldName, newValue) => {
    try {
      const response = await ajaxCall(`company/${companyId}/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "PATCH",
        body: JSON.stringify({ [fieldName]: newValue }),
      });
      if (response?.status === 200) {
        toast.success("Company Data Update Successfully");
        refreshTableMode();
      } else {
        toast.error("Something went wrong updating company data");
      }
    } catch (error) {
      console.error("Error updating company data", error);
    }
  };

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
      editable: true,
    },
    {
      headerName: "Number Of Employees",
      field: "number_of_employees",
      filter: true,
      editable: true,
    },
    {
      headerName: "Registration Number",
      field: "registration_no",
      filter: true,
      editable: true,
    },
    {
      headerName: "Estimated Turnover",
      field: "estimated_turnover",
      filter: true,
      editable: true,
    },
    {
      name: "Account Name",
      field: "account_name",
      filter: true,
      editable: true,
    },
    {
      name: "Account No",
      field: "account_no",
      filter: true,
      editable: true,
    },
    {
      name: "Address",
      field: "address",
      filter: true,
      editable: true,
    },
    {
      name: "Address line1",
      field: "addressline1_company",
      filter: true,
      editable: true,
    },
    {
      name: "Address line2",
      field: "addressline2_company",
      filter: true,
      editable: true,
    },
    {
      name: "Address line3",
      field: "addressline3_company",
      filter: true,
      editable: true,
    },
    {
      name: "Bank Name",
      field: "bank_name",
      filter: true,
      editable: true,
    },
    {
      name: "Business Type",
      field: "business_type",
      filter: true,
      editable: true,
    },
    {
      name: "Country Of Company",
      field: "country_of_company",
      filter: true,
      editable: true,
    },
    {
      name: "Home Postcode",
      field: "home_post_code",
      filter: true,
      editable: true,
    },
    {
      name: "Macro Business",
      field: "is_macro_business",
      cellRenderer: renderItemAvailable,
      filter: true,
      editable: true,
    },
    {
      name: "Partner DOB",
      field: "partner_dob",
      cellRenderer: (params) => (
        <input
          type="date"
          className="form-control"
          value={params.value}
          onChange={(e) =>
            handleCompanyEdit(
              params.data.id,
              params.colDef.field,
              e.target.value
            )
          }
        />
      ),
      filter: true,
      editable: true,
    },
    {
      name: "Partner Name",
      field: "partner_name",
      filter: true,
      editable: true,
    },
    {
      name: "Registration No",
      field: "registration_no",
      filter: true,
      editable: true,
    },
    {
      name: "Shortcode",
      field: "shortcode",
      filter: true,
      editable: true,
    },
    {
      name: "Postcode",
      field: "postcode",
      filter: true,
      editable: true,
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
        <CreateCompany refreshTableMode={refreshTableMode} setShowCreateCompany={setShowCreateCompany} />
      )}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Companies</h5>
                <Table
                  rowData={companyData}
                  columnDefs={columns}
                  onCellValueChanged={(params) =>
                    handleCompanyEdit(
                      params.data.id,
                      params.colDef.field,
                      params.newValue
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Company;
