import React from "react";

const Details = ({ companyData }) => {
  return (
    <div>
      <div className="row gap-4 mt-2 d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Company Information
            </h5>
            <div className="company_info">
              Parent Company : <span>{companyData?.parent_company}</span>
            </div>
            <div className="company_info">
              Reference : <span>{companyData?.reference}</span>
            </div>
            <div className="company_info">
              No Of Employees : <span>{companyData?.number_of_employees}</span>
            </div>
            <div className="company_info">
              Registration No : <span>{companyData?.registration_no}</span>
            </div>
            <div className="company_info">
              Company Type : <span>{companyData?.business_type}</span>
            </div>
            <div className="company_info">
              Estimated Turnover :{" "}
              <span>{companyData?.estimated_turnover}</span>
            </div>
            <div className="company_info">
              Micro Business :{" "}
              <span>{companyData?.is_macro_business ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Company Address
            </h5>
            <div className="company_info">
              Address Line 1 : <span>{companyData?.addressline1_company}</span>
            </div>
            <div className="company_info">
              Address Line 2 : <span>{companyData?.addressline2_company}</span>
            </div>
            <div className="company_info">
              Address Line 3 : <span>{companyData?.addressline3_company}</span>
            </div>
            <div className="company_info">
              Postcode : <span>{companyData?.postcode}</span>
            </div>
            <div className="company_info">
              Country : <span>{companyData?.country_of_company}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row gap-4 d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Bank Details
            </h5>
            <div className="company_info">
              Account Name : <span>{companyData?.account_name}</span>
            </div>
            <div className="company_info">
              Bank Name : <span> {companyData?.bank_name}</span>
            </div>
            <div className="company_info">
              Account No : <span>{companyData?.account_no}</span>
            </div>
            <div className="company_info">
              Shortcode : <span>{companyData?.shortcode}</span>
            </div>
            <div className="company_info">
              SIC Code : <span>{companyData?.sic_code}</span>
            </div>
          </div>
        </div>
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Partner Details
            </h5>
            <div className="company_info">
              Partner Name : <span>{companyData?.partner_name}</span>
            </div>
            <div className="company_info">
              Partner DOB : <span>{companyData?.partner_dob}</span>
            </div>
            <div className="company_info">
              Address : <span>{companyData?.address}</span>
            </div>
            <div className="company_info">
              Home Postcode : <span>{companyData?.home_post_code}</span>
            </div>
            <div className="company_info">
              Time At Address (Years) :{" "}
              <span>{companyData?.time_at_address_years}</span>
            </div>
            <div className="company_info">
              Time At Address (Months) :{" "}
              <span>{companyData?.time_at_address_months}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Contact
            </h5>
            <div className="company_info">
              First Name : <span>{companyData?.contacts?.first_name}</span>
            </div>
            <div className="company_info">
              Last Name : <span>{companyData?.contacts?.last_name}</span>
            </div>
            <div className="company_info">
              Contact Title :{" "}
              <span>{companyData?.contacts?.contact_title}</span>
            </div>
            <div className="company_info">
              Position : <span>{companyData?.contacts?.position}</span>
            </div>
            <div className="company_info">
              Telephone Number :{" "}
              <span>{companyData?.contacts?.telephone_number}</span>
            </div>
            <div className="company_info">
              Email : <span>{companyData?.contacts?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
