import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import Select from "../../UI/Select/Select";
import SelectSearch from "react-select-search";
import ajaxCall from "../../helpers/ajaxCall";
import Tab from "../../UI/Tab/Tab";
import SmallModal from "../../UI/Modal/Modal";
import LookUp from "../LookUp/LookUp";
import Loading from "../../UI/Loading/Loading";

const tabs = [
  { id: "1", title: "Site Information" },
  { id: "2", title: "Site Address" },
  { id: "3", title: "Billing Address" },
  { id: "4", title: "Our Details" },
  { id: "5", title: "Contact" },
  { id: "6", title: "Letter Of Authority" },
];

const initialSiteData = {
  site_name: "",
  company: "",
  reference: "",
  group_name: "",
  type_of_owner: "",
  owner_name: "",
  current_gas_and_electricity_supplier_details: "",
  tenant: false,
  vacant: false,
  change_of_tenancy: false,
  mpan_id: "",

  siteAddressLine1: "",
  siteAddressLine2: "",
  siteAddressLine3: "",
  siteAddressLine4: "",
  siteCountry: "United Kingdom",
  sitePostCode: "",

  isBillingSiteSame: false,

  billingAddressLine1: "",
  billingAddressLine2: "",
  billingAddressLine3: "",
  billingAddressLine4: "",
  billingCountry: "United Kingdom",
  billingPostCode: "",

  site_reference: "",
  support_contact: "",
  lead_source: "",
  notes: "",
  lead_type: "",
  bill_to_sent: false,
  welcome_letter_send: false,

  first_name: "",
  last_name: "",
  contact_title: "",
  position: "",
  telephone_number: "",
  email: "",

  agent_email: "",
  loa_header_to_use: "",
  loa_template: "",
};

const siteReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  let returnedObj = { ...state, [action.type]: action.value };
  if (returnedObj.isBillingSiteSame) {
    returnedObj = {
      ...returnedObj,
      billingAddressLine1: returnedObj.siteAddressLine1,
      billingAddressLine2: returnedObj.siteAddressLine2,
      billingAddressLine3: returnedObj.siteAddressLine3,
      billingAddressLine4: returnedObj.siteAddressLine4,
      billingCountry: returnedObj.siteCountry,
      billingPostCode: returnedObj.sitePostCode,
    };
  }
  return returnedObj;
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateSite = ({ refreshTableMode, setShowCreateSite }) => {
  const [siteData, dispatchSite] = useReducer(siteReducer, initialSiteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSiteAddress = (data) => {
    dispatchSite({
      type: "siteAddressLine1",
      value: data.addressMatch.address.addressBreakdown[0],
    });
    dispatchSite({
      type: "siteAddressLine2",
      value: data.addressMatch.address.addressBreakdown[1],
    });
    dispatchSite({
      type: "siteAddressLine3",
      value: data.addressMatch.address.addressBreakdown[2],
    });
    dispatchSite({
      type: "siteAddressLine4",
      value: data.addressMatch.address.addressBreakdown[3],
    });
    dispatchSite({
      type: "sitePostCode",
      value: data.postCode,
    });
    dispatchSite({
      type: "mpan_id",
      value: data.mpanId,
    });
    if (data.matchedElectricity) {
      dispatchSite({
        type: "lead_type",
        value: "ELECTRICITY",
      });
    }
    if (data.matchedGas) {
      dispatchSite({
        type: "lead_type",
        value: "GAS",
      });
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseCreateSite = () => {
    resetReducerForm();
    refreshTableMode();
    setShowCreateSite(false);
  };

  const validateForm = () => {
    if (!siteData.site_name) {
      setFormError("Site Name is Required");
      return false;
    }
    if (!siteData.company) {
      setFormError("Company Name is Required");
      return false;
    }
    if (
      !siteData.siteAddressLine1 &&
      !siteData.siteAddressLine2 &&
      !siteData.siteAddressLine3 &&
      !siteData.siteAddressLine4 &&
      !siteData.sitePostCode
    ) {
      setFormError("Site Address is Required");
      return false;
    }
    if (
      !siteData.billingAddressLine1 &&
      !siteData.billingAddressLine2 &&
      !siteData.billingAddressLine3 &&
      !siteData.billingAddressLine4 &&
      !siteData.billingPostCode
    ) {
      setFormError("Billing Address is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const resetReducerForm = () => {
    dispatchSite({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const createSite = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      site_name: siteData.site_name,
      company: siteData.company,
      reference: siteData.reference,
      type_of_owner: siteData.type_of_owner,
      group_name: siteData.group_name,
      current_gas_and_electricity_supplier_details:
        siteData.current_gas_and_electricity_supplier_details,
      tenant: siteData.tenant,
      vacant: siteData.vacant,
      change_of_tenancy: siteData.change_of_tenancy,
      mpan_id: siteData.mpan_id,

      site_reference: siteData.site_reference,
      support_contact: siteData.support_contact,
      lead_source: siteData.lead_source,
      notes: siteData.notes,
      lead_type: siteData.lead_type,
      bill_to_sent: siteData.bill_to_sent,
      welcome_letter_send: siteData.welcome_letter_send,

      agent_email: siteData.agent_email,
      loa_header_to_use: siteData.loa_header_to_use,
      loa_template: siteData.loa_template,
    };
    if (siteData.owner_name) {
      sendData.owner_name = siteData.owner_name;
    }
    const billingAddress = {
      billing_address: {
        addressline1: siteData.billingAddressLine1,
        addressline2: siteData.billingAddressLine2,
        addressline3: siteData.billingAddressLine3,
        addressline4: siteData.billingAddressLine4,
        country: "United Kingdom",
        postcode: siteData.billingPostCode,
      },
    };
    if (
      billingAddress.billing_address.addressline1 ||
      billingAddress.billing_address.addressline2 ||
      billingAddress.billing_address.addressline3 ||
      billingAddress.billing_address.addressline4 ||
      billingAddress.billing_address.country ||
      billingAddress.billing_address.postcode
    ) {
      sendData = { ...sendData, ...billingAddress };
    }

    const siteAaddress = {
      site_address: {
        addressline1: siteData.siteAddressLine1,
        addressline2: siteData.siteAddressLine2,
        addressline3: siteData.siteAddressLine3,
        addressline4: siteData.siteAddressLine4,
        country: "United Kingdom",
        postcode: siteData.sitePostCode,
      },
    };
    if (
      siteAaddress.site_address.addressline1 ||
      siteAaddress.site_address.addressline2 ||
      siteAaddress.site_address.addressline3 ||
      siteAaddress.site_address.addressline4 ||
      siteAaddress.site_address.country ||
      siteAaddress.site_address.postcode
    ) {
      sendData = { ...sendData, ...siteAaddress };
    }
    const contactsInfo = {
      contacts: {
        first_name: siteData.first_name,
        last_name: siteData.last_name,
        contact_title: siteData.contact_title,
        position: siteData.position,
        telephone_number: siteData.telephone_number,
        email: siteData.email,
      },
    };
    if (
      contactsInfo.contacts.first_name ||
      contactsInfo.contacts.last_name ||
      contactsInfo.contacts.contact_title ||
      contactsInfo.contacts.position ||
      contactsInfo.contacts.telephone_number ||
      contactsInfo.contacts.email
    ) {
      sendData = { ...sendData, ...contactsInfo };
    }
    try {
      const response = await ajaxCall(
        "sites/create/site/",
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
        handleCloseCreateSite();
        toast.success("Site Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({
        ...formStatus,
        isSubmitting: false,
      });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">Create Site</h5>
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="bi bi-plus-square"></i> Search
            </button>
          </div>
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
          <form onSubmit={createSite}>
            <div className="tab-content pt-2" id="borderedTabContent">
              <div
                className="tab-pane fade show active"
                id="bordered-1"
                role="tabpanel"
                aria-labelledby="1-tab"
              >
                <div className="row mt-2">
                  <div className="col-md-3">
                    <label className="form-label">Site Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.site_name}
                      onChange={(e) =>
                        dispatchSite({
                          type: "site_name",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    className="col-md-3"
                    label="Company Name"
                    name="company"
                    isSearch={true}
                    value={siteData.company}
                    onChange={(val) => {
                      dispatchSite({
                        type: "company",
                        value: val,
                      });
                    }}
                    objKey={["name"]}
                    url="sites/get/company_name/"
                  />
                  <div className="col-md-3">
                    <label className="form-label">Reference</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.reference}
                      onChange={(e) =>
                        dispatchSite({
                          type: "reference",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    className="col-md-3"
                    label="Group Name"
                    name="group_name"
                    isSearch={true}
                    value={siteData.group_name}
                    onChange={(val) => {
                      dispatchSite({
                        type: "group_name",
                        value: val,
                      });
                    }}
                    objKey={["group_name"]}
                    url="sites/groups/"
                  />
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Type Of Owner</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.type_of_owner}
                      onChange={(e) =>
                        dispatchSite({
                          type: "type_of_owner",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.owner_name}
                      onChange={(e) =>
                        dispatchSite({
                          type: "owner_name",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">
                      Current Gas & Electricity Supplier Details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="current_gas_and_electricity_supplier_details"
                      value={
                        siteData.current_gas_and_electricity_supplier_details
                      }
                      onChange={(e) =>
                        dispatchSite({
                          type: "current_gas_and_electricity_supplier_details",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-2 d-flex flex-wrap gap-3">
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.tenant}
                      onChange={(e) => {
                        dispatchSite({
                          type: "tenant",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Tenant
                    </label>
                  </div>
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.vacant}
                      onChange={(e) => {
                        dispatchSite({
                          type: "vacant",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Vacant
                    </label>
                  </div>
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.change_of_tenancy}
                      onChange={(e) => {
                        dispatchSite({
                          type: "change_of_tenancy",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      COT
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
                      value={siteData.siteAddressLine1}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteAddressLine1",
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
                      value={siteData.siteAddressLine2}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteAddressLine2",
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
                      value={siteData.siteAddressLine3}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteAddressLine3",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Address Line 4</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.siteAddressLine4}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteAddressLine4",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Post Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.sitePostCode}
                      onChange={(e) =>
                        dispatchSite({
                          type: "sitePostCode",
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
                      value="United Kingdom"
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
                <div className="form-check form-switch mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={siteData.isBillingSiteSame}
                    onChange={(e) => {
                      dispatchSite({
                        type: "isBillingSiteSame",
                        value: e.target.checked,
                      });
                    }}
                  />
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckDefault"
                  >
                    Is Billing Address Same As Site Address ?
                  </label>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label className="form-label">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.billingAddressLine1}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingAddressLine1",
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
                      value={siteData.billingAddressLine2}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingAddressLine2",
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
                      value={siteData.billingAddressLine3}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingAddressLine3",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Address Line 4</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.billingAddressLine4}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingAddressLine4",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Post Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.billingPostCode}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingPostCode",
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
                      value="United Kingdom"
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
                    <label className="form-label">Site Reference</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.site_reference}
                      onChange={(e) =>
                        dispatchSite({
                          type: "site_reference",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    className="col-md-4"
                    label="Support Contact"
                    name="support_contact"
                    isSearch={true}
                    value={siteData.support_contact}
                    onChange={(val) => {
                      dispatchSite({
                        type: "support_contact",
                        value: val,
                      });
                    }}
                    objKey={["username"]}
                    url="sites/get/support_contact/"
                  />
                  <div className="col-md-4">
                    <label className="form-label">Lead Source</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.lead_source}
                      onChange={(e) =>
                        dispatchSite({
                          type: "lead_source",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.notes}
                      onChange={(e) =>
                        dispatchSite({
                          type: "notes",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.bill_to_sent}
                      onChange={(e) => {
                        dispatchSite({
                          type: "bill_to_sent",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Bill to Sent
                    </label>
                  </div>
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.welcome_letter_send}
                      onChange={(e) => {
                        dispatchSite({
                          type: "welcome_letter_send",
                          value: e.target.checked,
                        });
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Welcome Letter Sent
                    </label>
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
                      value={siteData.first_name}
                      onChange={(e) =>
                        dispatchSite({
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
                      value={siteData.last_name}
                      onChange={(e) =>
                        dispatchSite({
                          type: "last_name",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Contact Title</label>
                    <SelectSearch
                      options={[
                        { name: "Sir", value: "Sir" },
                        { name: "Mr", value: "Mr" },
                        { name: "Ms", value: "Ms" },
                        { name: "Mrs", value: "Mrs" },
                        { name: "Miss", value: "Miss" },
                        { name: "Dr", value: "Dr" },
                      ]}
                      placeholder="Choose from options"
                      value={siteData.contact_title}
                      onChange={(val) => {
                        dispatchSite({
                          type: "contact_title",
                          value: val,
                        });
                      }}
                      name="contact_title"
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.position}
                      onChange={(e) =>
                        dispatchSite({
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
                      value={siteData.telephone_number}
                      onChange={(e) =>
                        dispatchSite({
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
                      value={siteData.email}
                      onChange={(e) =>
                        dispatchSite({
                          type: "email",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="bordered-6"
                role="tabpanel"
                aria-labelledby="6-tab"
              >
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label className="form-label">Agent Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={siteData.agent_email}
                      onChange={(e) =>
                        dispatchSite({
                          type: "agent_email",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">LOA Header To Use</label>
                    <SelectSearch
                      options={[
                        { name: "Site Name", value: 1 },
                        { name: "Company Name", value: 2 },
                      ]}
                      placeholder="Choose from options"
                      value={siteData.loa_header_to_use}
                      onChange={(val) => {
                        dispatchSite({
                          type: "loa_header_to_use",
                          value: val,
                        });
                      }}
                      name="loa_header_to_use"
                    />
                  </div>
                  <Select
                    className="col-md-4"
                    label="LOA Template"
                    name="loa_template"
                    isSearch={true}
                    value={siteData.loa_template}
                    onChange={(val) => {
                      dispatchSite({
                        type: "loa_template",
                        value: val,
                      });
                    }}
                    objKey={["name"]}
                    url="sites/get/loa_template/"
                  />
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
                <Loading color="primary" text={"Creating Site..."} />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formStatus.isSubmitting}
                >
                  Create Site
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <SmallModal
        size="xl"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Choose The Site Address Here By Search Post Code"
      >
        <LookUp
          onRowSelect={handleSiteAddress}
          onCloseModal={handleCloseModal}
        />
      </SmallModal>
    </>
  );
};

export default CreateSite;
