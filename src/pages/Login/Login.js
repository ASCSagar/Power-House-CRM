import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import ajaxCall from "../../helpers/ajaxCall";
import { authAction } from "../../store/authStore";
import { setToLocalStorage } from "../../helpers/helper";
import Loading from "../../UI/Loading/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const { userName, password } = values;

    const data = {
      username: userName,
      password: password,
    };

    try {
      const response = await ajaxCall(
        "login/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
          withCredentials: true,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Welcome To PowerCRM");
        handleLoginSuccess(response);
        navigate(`/Dashboard`);
      } else if (response.status === 400) {
        toast.error("Please Check Username and Password");
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  const handleLoginSuccess = (response) => {
    const localObj = {
      loggedIn: true,
      accessToken: response.data.token.access,
      refreshToken: response.data.token.refresh,
      timeOfLogin: Date.now(),
    };
    setToLocalStorage("loginInfo", localObj, true);
    dispatch(
      authAction.setAuthStatus({
        loggedIn: true,
        accessToken: response.data?.token?.access,
        refreshToken: response.data?.token?.refresh,
        timeOfLogin: Date.now(),
        logInOperation: 1,
      })
    );
    setTimeout(
      () =>
        dispatch(
          authAction.setAuthStatus({
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            timeOfLogin: null,
            logInOperation: -1,
          })
        ),
      1000 * 60 * 30
    );
    navigate("/Dashboard");
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt="logo" />
                    <span className="d-none d-lg-block">POWER CRM</span>
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your username & password to login
                      </p>
                    </div>

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleLogin}
                    >
                      <Form className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Username
                          </label>
                          <Field
                            id="yourUsername"
                            type="text"
                            name="userName"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="text-danger mt-2"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <Field
                            id="yourPassword"
                            type="password"
                            name="password"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-12">
                          {isLoading ? (
                            <Loading color="primary" text="Logging in..." />
                          ) : (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
