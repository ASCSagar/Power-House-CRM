import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Tab from "../../UI/Tab/Tab";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const tabs = [
  { id: "1", title: "Company Information" },
  { id: "2", title: "Company Address" },
  { id: "3", title: "Bank Details" },
  { id: "4", title: "Partner Details" },
  { id: "5", title: "Contact" },
];

const initialCompanyData = {
  name: "",
  parent_company: "",
  reference: "",
  number_of_employees: 0,
  registrationNo: "",
  estimated_turnover: 0,
  business_type: "",
  is_macro_business: false,

  addressline1_company: "",
  addressline2_company: "",
  addressline3_company: "",
  postcode: 0,
  country_of_company: "",

  account_name: "",
  bank_name: "",
  account_no: "",
  shortcode: "",
  sic_code: "",

  partner_name: "",
  partner_dob: moment().format("YYYY-MM-DD"),
  address: "",
  home_post_code: "",
  time_at_address_months: 0,
  time_at_address_years: 0,

  first_name: "",
  last_name: "",
  contact_title: "",
  position: "",
  telephone_number: "",
  email: "",
};

const companyReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialCompanyData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateCompany = ({ refreshTableMode, setShowCreateCompany }) => {
  const [companyData, dispatchCompany] = useReducer(
    companyReducer,
    initialCompanyData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const handleCloseCreateCompany = () => {
    resetReducerForm();
    refreshTableMode();
    setShowCreateCompany(false);
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "name", message: "Company Name is Required" },
      { field: "first_name", message: "First Name is Required" },
      { field: "last_name", message: "Last Name is Required" },
      { field: "email", message: "Email is Required" },
      { field: "position", message: "Position is Required" },
      { field: "telephone_number", message: "Telephone Number is Required" },
    ];
    for (let { field, message } of requiredFields) {
      if (!companyData[field]) {
        setFormError(message);
        return false;
      }
    }
    setFormStatus({ isError: true, errMsg: null, isSubmitting: false });
    return true;
  };

  const resetReducerForm = () => {
    dispatchCompany({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createCompany = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    let sendData = {
      ...companyData,
      contacts: {
        first_name: companyData.first_name,
        last_name: companyData.last_name,
        contact_title: companyData.contact_title,
        position: companyData.position,
        telephone_number: companyData.telephone_number,
        email: companyData.email,
      },
    };
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
          method: "POST",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        handleCloseCreateCompany();
        toast.success("Company Created Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({ ...formStatus, isSubmitting: false });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create Company</h5>
        <ul
          className="nav nav-tabs nav-tabs-bordered"
          id="borderedTab"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <Tab key={tab.id} id={tab.id} isActive={index === 0}>
              {tab.title}
            </Tab>
          ))}
        </ul>
        <form onSubmit={createCompany}>
          <div className="tab-content pt-2" id="borderedTabContent">
            <div
              className="tab-pane fade show active"
              id="bordered-1"
              role="tabpanel"
              aria-labelledby="1-tab"
            >
              <div className="row mt-2">
                <div className="col-md-4">
                  <label className="form-label">Parent Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.parent_company}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "parent_company",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Reference</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.reference}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "reference",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Number Of Employee</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.number_of_employees}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "number_of_employees",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Registration Number</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.registrationNo}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "registrationNo",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Estimated Turnover</label>
                  <input
                    type="number"
                    className="form-control"
                    name="currentSupplier"
                    value={companyData.estimated_turnover}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "estimated_turnover",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Company Type</label>
                  <select
                    className="form-select"
                    value={companyData.business_type}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "business_type",
                        value: e.target.value,
                      });
                    }}
                  >
                    {[
                      { value: "LTD", label: "LTD" },
                      { value: "PLC", label: "PLC" },
                      { value: "LLP", label: "LLP" },
                      { value: "LLC", label: "LLC" },
                      { value: "Charity", label: "Charity" },
                      { value: "Jersey Based", label: "Jersey Based" },
                      { value: "Public Sector", label: "Public Sector" },
                      { value: "Non LTD", label: "Non LTD" },
                      { value: "Partnership", label: "Partnership" },
                      {
                        value: "Church / Community Organisation",
                        label: "Church / Community Organisation",
                      },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <div className="form-check form-switch mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={companyData.is_macro_business}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "is_macro_business",
                        value: e.target.checked,
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckDefault"
                  >
                    Micro Business
                  </label>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="bordered-2"
              role="tabpanel"
              aria-labelledby="2-tab"
            >
              <div className="row mt-2">
                <div className="col-md-4">
                  <label className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.addressline1_company}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "addressline1_company",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.addressline2_company}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "addressline2_company",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Address Line 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.addressline3_company}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "addressline3_company",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Post Code</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.postcode}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "postcode",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.country_of_company}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "country_of_company",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="bordered-3"
              role="tabpanel"
              aria-labelledby="3-tab"
            >
              <div className="row mt-1">
                <div className="col-md-4">
                  <label className="form-label">Account Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.account_name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "account_name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.bank_name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "bank_name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Account No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.account_no}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "account_no",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Short Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.shortcode}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "shortcode",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">SIC Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.sic_code}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "sic_code",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="bordered-4"
              role="tabpanel"
              aria-labelledby="4-tab"
            >
              <div className="row mt-2">
                <div className="col-md-4">
                  <label className="form-label">Partner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.partner_name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "partner_name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Partner DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    value={companyData.partner_dob}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "partner_dob",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.address}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "address",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Home PostCode</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.home_post_code}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "home_post_code",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Time At Address (Years)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.time_at_address_years}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "time_at_address_years",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Time At Address (Months)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.time_at_address_months}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "time_at_address_months",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="bordered-5"
              role="tabpanel"
              aria-labelledby="5-tab"
            >
              <div className="row mt-2">
                <div className="col-md-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.first_name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "first_name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.last_name}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "last_name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Contact Title</label>
                  <select
                    className="form-select"
                    value={companyData.contact_title}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "contact_title",
                        value: e.target.value,
                      })
                    }
                  >
                    {[
                      { value: "Dr", label: "Dr" },
                      { value: "Mr", label: "Mr" },
                      { value: "Miss", label: "Miss" },
                      { value: "Mrs", label: "Mrs" },
                      { value: "Professor", label: "Professor" },
                      { value: "Rev", label: "Rev" },
                      { value: "Ms", label: "Ms" },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyData.position}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "position",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Telephone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    value={companyData.telephone_number}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "telephone_number",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={companyData.email}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "email",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            {formStatus.isError ? (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            ) : (
              <div className="text-success mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Loading color="primary" text={"Creating Company..."} />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus.isSubmitting}
              >
                Create Company
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
