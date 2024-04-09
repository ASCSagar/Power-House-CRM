import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../helpers/ajaxCall";
import { Link } from "react-router-dom";

const ViewCompany = () => {
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `company/?ordering=-date_created`,
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
          setCompanyData(response?.data?.results);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? "Yes" : "No";
  };

  const columns = [
    {
      headerClass: "ag-grid-header",
      resizable: false,
      width: 60,
      cellRenderer: (params) => {
        return (
          <Link
            to={`/companies/edit/${params.data.id}`}
            className="enquiryAction"
            title="Edit Company"
          >
            <i className="bi bi-pencil-fill"></i>
          </Link>
        );
      },
    },
    {
      headerName: "Company Name",
      field: "name",
      cellRenderer: (params) => {
        return <Link to={`/companies/${params.data.id}`}>{params.value}</Link>;
      },
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

  const gridOptions = {
    rowData: companyData,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };
  return (
    <>
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>View Companies</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/Dashboard">Home</Link>
              </li>
              <li class="breadcrumb-item">Company</li>
              <li class="breadcrumb-item active">View Companies</li>
            </ol>
          </nav>
        </div>

        <section class="section">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">View Companies</h5>
                  <div className="ag-theme-quartz">
                    <AgGridReact {...gridOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ViewCompany;