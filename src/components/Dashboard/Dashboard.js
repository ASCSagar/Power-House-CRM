import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteChart from "./Chart/SiteChart";
import QuotesChart from "./Chart/QuotesChart";
import CompanyChart from "./Chart/CompanyChart";
import ajaxCall from "../../helpers/ajaxCall";

const Dashboard = () => {
  const [siteData, setSiteData] = useState();
  const [quoteData, setQuoteData] = useState();
  const [companyData, setCompanyData] = useState();

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
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
        setData(response?.data?.results);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData("sites/get/site/?ordering=-date_created", setSiteData);
    fetchData("quote/generate-quote/?ordering=-date_created", setQuoteData);
    fetchData("company/?ordering=-date_created", setCompanyData);
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/Dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Sites</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-diagram-3-fill"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{siteData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Quotes</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{quoteData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Company</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-buildings"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{companyData?.length}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <SiteChart siteData={siteData} />
              <QuotesChart quoteData={quoteData} />
              
            </div>
          </div>
          <CompanyChart companyData={companyData} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
