import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MUITable from "../../UI/Table/MUITable";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../../UI/Modal/Modal";
import Details from "./Details";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import CreateSite from "../Site/CreateSite";

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [companySites, setCompanySites] = useState([]);

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
    {
      flex: 1,
      field: "site_name",
      headerName: "Site Name",
      sortable: true,
      filterable: true,
    },
    {
      flex: 1,
      field: "type_of_owner",
      headerName: "Type Of Owner",
      sortable: true,
      filterable: true,
    },
    {
      flex: 1,
      field: "owner_name",
      headerName: "Owner Name",
      sortable: true,
      filterable: true,
    },
    {
      flex: 1,
      field: "company.name",
      headerName: "Company",
      sortable: true,
      filterable: true,
    },
    {
      flex: 1,
      field: "agent_email",
      headerName: "Agent Email",
      sortable: true,
      filterable: true,
    },
    {
      flex: 1,
      field: "bill_to_sent",
      headerName: "Bill To Sent",
      sortable: true,
      filterable: true,
      renderCell: renderItemAvailable,
    },
    {
      flex: 1,
      field: "change_of_tenancy",
      headerName: "Change Of Tenancy",
      sortable: true,
      filterable: true,
      renderCell: renderItemAvailable,
    },
    {
      flex: 1,
      field: "customer_consent",
      headerName: "Customer Consent",
      sortable: true,
      filterable: true,
      renderCell: renderItemAvailable,
    },
    {
      flex: 1,
      field: "notes",
      headerName: "Notes",
      sortable: true,
      filterable: true,
    },
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
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Company Details
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setIsSiteOpen(true)}
                      >
                        <i className="bi bi-plus-square" /> Create Site
                      </button>
                    </div>
                  </div>
                  {companySites?.length > 0 ? (
                    <MUITable rows={companySites} columns={columns} />
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
      <SmallModal
        size="xl"
        centered
        isOpen={isSiteOpen}
        onClose={() => setIsSiteOpen(false)}
      >
        <CreateSite />
      </SmallModal>
    </>
  );
};

export default CompanyDashboard;
