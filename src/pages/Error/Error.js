import React from "react";
import { Link } from "react-router-dom";
import error from "../../img/not-found.svg";

const Error = () => {
  return (
    <body>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <Link className="btn" to="/Dashboard">
              Back to home
            </Link>
            <img src={error} className="img-fluid py-5" alt="Page Not Found" />
          </section>
        </div>
      </main>
    </body>
  );
};

export default Error;
