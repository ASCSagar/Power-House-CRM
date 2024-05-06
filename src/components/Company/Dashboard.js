import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../UI/Table/Table";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../../UI/Modal/Modal";
import Details from "./Details";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [companySites, setCompanySites] = useState();

  useEffect(() => {
    const fetchData = async (url, setData) => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
        }`,
      };
      try {
        const response = await ajaxCall(
          `${url}?company=${companyId}`,
          { headers, method: "GET" },
          8000
        );
        if (response?.status === 200) {
          setData(response?.data);
        } else {
          console.error("Fetch error:", response);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchData(`company/${companyId}/`, setCompanyData);
    fetchData(`sites/get/site/`, setCompanySites);
  }, [companyId]);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    { headerName: "Site Name", field: "site_name", filter: true },
    { headerName: "Type Of Owner", field: "type_of_owner", filter: true },
    { headerName: "Owner Name", field: "owner_name", filter: true },
    { headerName: "Company", field: "company.name", filter: true },
    { headerName: "Agent Email", field: "agent_email", filter: true },
    {
      headerName: "Bill To Sent",
      field: "bill_to_sent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Change Of Tenancy",
      field: "change_of_tenancy",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    {
      headerName: "Customer Consent",
      field: "customer_consent",
      cellRenderer: renderItemAvailable,
      filter: true,
    },
    { headerName: "Notes", field: "notes", filter: true },
  ];

  return (
    <>
      <main className="main" id="main">
        <Breadcrumbs
          title={companyData?.name}
          middle="Company"
          middleUrl="Companies"
          main="Dashboard"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{companyData?.name}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {`View ${companyData?.name} Details`}
                    </button>
                  </div>
                  {companySites?.length > 0 ? (
                    <div className="ag-theme-quartz">
                      <Table rowData={companySites} columnDefs={columns} />
                    </div>
                  ) : (
                    <h5 className="text-center text-danger">
                      {`No Sites Available For ${companyData?.name} !!`}
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SmallModal
        size="xl"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${companyData?.name} Details`}
      >
        <Details companyData={companyData} />
      </SmallModal>
    </>
  );
};

export default CompanyDashboard;
