import React from "react";

const Details = ({ siteData }) => {
  return (
    <div>
      <div className="row gap-4 mt-2 d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Site Information
            </h5>
            <div className="company_info">
              Group Name : <span>{siteData?.group_name}</span>
            </div>
            <div className="company_info">
              Company Name : <span>{siteData?.contacts?.company}</span>
            </div>
            <div className="company_info">
              Type Of Owner : <span>{siteData?.type_of_owner}</span>
            </div>
            <div className="company_info">
              Owner Name : <span>{siteData?.owner_name}</span>
            </div>
            <div className="company_info">
              Current Gas And Electricity Supply Deatils :{" "}
              <span>
                {siteData?.current_gas_and_electricity_supplier_details}
              </span>
            </div>
            <div className="company_info">
              Tenant : <span>{siteData?.tenant ? "Yes" : "No"}</span>
            </div>
            <div className="company_info">
              Vacant : <span>{siteData?.vacant ? "Yes" : "No"}</span>
            </div>
            <div className="company_info">
              Change Of Tenancy :{" "}
              <span>{siteData?.change_of_tenancy ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Our Details
            </h5>
            <div className="company_info">
              Site Reference : <span>{siteData?.site_reference}</span>
            </div>
            <div className="company_info">
              Support Contact : <span>{siteData?.support_contact}</span>
            </div>
            <div className="company_info">
              Lead Source : <span>{siteData?.lead_source}</span>
            </div>
            <div className="company_info">
              Notes : <span>{siteData?.notes}</span>
            </div>
            <div className="company_info">
              Lead Type : <span>{siteData?.lead_type}</span>
            </div>
            <div className="company_info">
              Bill To Sent : <span>{siteData?.bill_to_sent}</span>
            </div>
            <div className="company_info">
              Welcome Letter Sent : <span>{siteData?.welcome_letter_send}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row gap-4 d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Letter Of Authority
            </h5>
            <div className="company_info">
              Agent Email : <span>{siteData?.agent_email}</span>
            </div>
            <div className="company_info">
              LOA Header To Use : <span> {siteData?.loa_header_to_use}</span>
            </div>
            <div className="company_info">
              LOA Template : <span>{siteData?.loa_template}</span>
            </div>
          </div>
        </div>
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Site Address
            </h5>
            <div className="company_info">
              Address Line 1 :{" "}
              <span>{siteData?.site_address?.addressline1}</span>
            </div>
            <div className="company_info">
              Address Line 2 :{" "}
              <span>{siteData?.site_address?.addressline2}</span>
            </div>
            <div className="company_info">
              Address Line 3 :{" "}
              <span>{siteData?.site_address?.addressline3}</span>
            </div>
            <div className="company_info">
              Address Line 4 :{" "}
              <span>{siteData?.site_address?.addressline4}</span>
            </div>
            <div className="company_info">
              Postcode : <span>{siteData?.site_address?.postcode}</span>
            </div>
            <div className="company_info">
              Country : <span>{siteData?.site_address?.country}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row gap-4 d-flex justify-content-center">
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Billing Address
            </h5>
            <div className="company_info">
              Address Line 1 :{" "}
              <span>{siteData?.billing_address?.addressline1}</span>
            </div>
            <div className="company_info">
              Address Line 2 :{" "}
              <span> {siteData?.billing_address?.addressline2}</span>
            </div>
            <div className="company_info">
              Address Line 3 :{" "}
              <span>{siteData?.billing_address?.addressline3}</span>
            </div>
            <div className="company_info">
              Address Line 4 :{" "}
              <span>{siteData?.billing_address?.addressline4}</span>
            </div>
            <div className="company_info">
              Postcode : <span>{siteData?.billing_address?.postcode}</span>
            </div>
            <div className="company_info">
              Country : <span>{siteData?.billing_address?.country}</span>
            </div>
          </div>
        </div>
        <div className="card col-5">
          <div className="card-body">
            <h5 className="card-title" style={{ borderBottom: "1px solid" }}>
              Contact
            </h5>
            <div className="company_info">
              First Name : <span>{siteData?.contacts?.first_name}</span>
            </div>
            <div className="company_info">
              Last Name : <span>{siteData?.contacts?.last_name}</span>
            </div>
            <div className="company_info">
              Contact Title : <span>{siteData?.contacts?.contact_title}</span>
            </div>
            <div className="company_info">
              Position : <span>{siteData?.contacts?.position}</span>
            </div>
            <div className="company_info">
              Telephone Number :{" "}
              <span>{siteData?.contacts?.telephone_number}</span>
            </div>
            <div className="company_info">
              Email : <span>{siteData?.contacts?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
