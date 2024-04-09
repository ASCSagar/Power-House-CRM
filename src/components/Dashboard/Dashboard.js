import React from "react";
import { Link } from "react-router-dom";
import new1 from "../../img/news-1.jpg";
import new2 from "../../img/news-2.jpg";
import new3 from "../../img/news-3.jpg";
import new4 from "../../img/news-4.jpg";
import new5 from "../../img/news-5.jpg";

const Dashboard = () => {
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
                    <h5 className="card-title">Sales</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>145</h6>
                        <span className="text-success small pt-1 fw-bold">
                          12%
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">
                          increase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Revenue</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="ps-3">
                        <h6>$3,264</h6>
                        <span className="text-success small pt-1 fw-bold">
                          8%
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">
                          increase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Customers</h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="ps-3">
                        <h6>1244</h6>
                        <span className="text-danger small pt-1 fw-bold">
                          12%
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">
                          decrease
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Reports</h5>
                    <div id="reportsChart"></div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card recent-sales overflow-auto">
                  <div className="card-body">
                    <h5 className="card-title">Recent Sales</h5>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card top-selling overflow-auto">
                  <div className="card-body pb-0">
                    <h5 className="card-title">Top Selling</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-body pb-0">
                <h5 className="card-title">News &amp; Updates</h5>
                <div className="news">
                  <div className="post-item clearfix">
                    <img src={new1} alt="" />
                    <h4>
                      <Link>Nihil blanditiis at in nihil autem</Link>
                    </h4>
                    <p>
                      Sit recusandae non aspernatur laboriosam. Quia enim
                      eligendi sed ut harum...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img src={new2} alt="" />
                    <h4>
                      <Link>Quidem autem et impedit</Link>
                    </h4>
                    <p>
                      Illo nemo neque maiores vitae officiis cum eum turos elan
                      dries werona nande...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img src={new3} alt="" />
                    <h4>
                      <Link>
                        Id quia et et ut maxime similique occaecati ut
                      </Link>
                    </h4>
                    <p>
                      Fugiat voluptas vero eaque accusantium eos. Consequuntur
                      sed ipsam et totam...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img src={new4} alt="" />
                    <h4>
                      <Link>Laborum corporis quo dara net para</Link>
                    </h4>
                    <p>
                      Qui enim quia optio. Eligendi aut asperiores enim
                      repellendusvel rerum cuder...
                    </p>
                  </div>
                  <div className="post-item clearfix">
                    <img src={new5} alt="" />
                    <h4>
                      <Link>Et dolores corrupti quae illo quod dolor</Link>
                    </h4>
                    <p>
                      Odit ut eveniet modi reiciendis. Atque cupiditate libero
                      beatae dignissimos eius...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
