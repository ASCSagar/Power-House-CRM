import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import Select from "../../UI/Select/Select";
import SelectSearch from "react-select-search";
import ajaxCall from "../../helpers/ajaxCall";
import Tab from "../../UI/Tab/Tab";
import SmallModal from "../../UI/Modal/Modal";
import LookUp from "../LookUp/LookUp";

const tabs = [
  { id: "1", title: "Site Information" },
  { id: "2", title: "Site Address" },
  { id: "3", title: "Billing Address" },
  { id: "4", title: "Our Details" },
  { id: "5", title: "Contact" },
  { id: "6", title: "Letter Of Authority" },
];

const initialSiteData = {
  siteName: "",
  companyName: "",
  reference: "",
  groupName: "",
  typeOfOwner: "",
  ownerName: "",
  currentSupplier: "",
  lead_source: "",
  isTenant: false,
  isVacant: false,
  isCoT: false,
  customerConsent: false,
  siteReference: "",
  supportContact: "",
  leadType: "",
  notes: "",
  billToSent: "",
  welcomeLetterSent: "",
  agentEmail: "",
  loa_header_to_use: "",
  loaTemplate: "",
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingAddressLine3: "",
  billingAddressLine4: "",
  billingCountry: "",
  billingPostCode: "",
  siteAddressLine1: "",
  siteAddressLine2: "",
  siteAddressLine3: "",
  siteAddressLine4: "",
  siteCountry: "",
  sitePostCode: "",
  isBillingSiteSame: false,
  firstName: "",
  lastName: "",
  contactTitle: "",
  position: "",
  telephoneNumber: "",
  email: "",
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

const CreateSite = () => {
  const [siteData, dispatchSite] = useReducer(siteReducer, initialSiteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateForm = () => {
    if (!siteData.siteName) {
      setFormError("Site Name is Required");
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
      group_name: siteData.groupName,
      site_name: siteData.siteName,
      company: siteData.companyName,
      reference: siteData.reference,
      type_of_owner: siteData.typeOfOwner,
      current_gas_and_electricity_supplier_details: siteData.currentSupplier,
      tenant: siteData.isTenant,
      vacant: siteData.isVacant,
      change_of_tenancy: siteData.isCoT,
      customer_consent: siteData.customerConsent,
      site_reference: siteData.siteReference,
      support_contact: siteData.supportContact,
      lead_type: siteData.leadType,
      notes: siteData.notes,
      bill_to_sent: siteData.billToSent,
      welcome_letter_send: siteData.welcomeLetterSent,
      agent_email: siteData.agentEmail,
      loa_header_to_use: siteData.loa_header_to_use,
      loa_template: siteData.loaTemplate,
    };
    if (siteData.ownerName) {
      sendData.owner_name = siteData.ownerName;
    }
    const billingAddress = {
      billing_address: {
        addressline1: siteData.billingAddressLine1,
        addressline2: siteData.billingAddressLine2,
        addressline3: siteData.billingAddressLine3,
        addressline4: siteData.billingAddressLine4,
        country: siteData.billingCountry,
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
        country: siteData.siteCountry,
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
        first_name: siteData.firstName,
        last_name: siteData.lastName,
        contact_title: siteData.contactTitle,
        position: siteData.position,
        telephone_number: siteData.telephoneNumber,
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
        resetReducerForm();
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
          <h5 className="card-title">Create Site</h5>
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
                <div className="row g-3 mt-1">
                  <div className="col-md-3">
                    <label className="form-label">Site Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.siteName}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteName",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    className="col-md-3"
                    label="Company Name"
                    name="companyName"
                    isSearch={true}
                    value={siteData.companyName}
                    onChange={(val) => {
                      dispatchSite({
                        type: "companyName",
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
                    name="groupName"
                    isSearch={true}
                    value={siteData.groupName}
                    onChange={(val) => {
                      dispatchSite({
                        type: "groupName",
                        value: val,
                      });
                    }}
                    objKey={["group_name"]}
                    url="sites/groups/"
                  />
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
                    <label className="form-label">Type Of Owner</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.typeOfOwner}
                      onChange={(e) =>
                        dispatchSite({
                          type: "typeOfOwner",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.ownerName}
                      onChange={(e) =>
                        dispatchSite({
                          type: "ownerName",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      Current Gas & Electricity Supplier Details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="currentSupplier"
                      value={siteData.currentSupplier}
                      onChange={(e) =>
                        dispatchSite({
                          type: "currentSupplier",
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
                      checked={siteData.isTenant}
                      onChange={(e) => {
                        dispatchSite({
                          type: "isTenant",
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
                      checked={siteData.isVacant}
                      onChange={(e) => {
                        dispatchSite({
                          type: "isVacant",
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
                      checked={siteData.isCoT}
                      onChange={(e) => {
                        dispatchSite({
                          type: "isCoT",
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
                <div
                  className="row g-3 mt-1"
                  onClick={() => setIsModalOpen(true)}
                >
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
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.siteCountry}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteCountry",
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
                <div className="row g-3 mt-1">
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
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.billingCountry}
                      onChange={(e) =>
                        dispatchSite({
                          type: "billingCountry",
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
                <div className="row g-3 mt-1">
                  <div className="col-md-4">
                    <label className="form-label">Site Reference</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.siteReference}
                      onChange={(e) =>
                        dispatchSite({
                          type: "siteReference",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Select
                    className="col-md-4"
                    label="Support Contact"
                    name="supportContact"
                    isSearch={true}
                    value={siteData.supportContact}
                    onChange={(val) => {
                      dispatchSite({
                        type: "supportContact",
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
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="form-label">Lead Type</label>
                    <SelectSearch
                      options={[
                        { name: "GAS", value: "GAS" },
                        { name: "ELECTRICITY", value: "ELECTRICITY" },
                      ]}
                      placeholder="Choose from options"
                      value={siteData.leadType}
                      onChange={(val) => {
                        dispatchSite({
                          type: "leadType",
                          value: val,
                        });
                      }}
                      name="leadType"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="form-check form-switch mt-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={siteData.billToSent}
                      onChange={(e) => {
                        dispatchSite({
                          type: "billToSent",
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
                      checked={siteData.welcomeLetterSent}
                      onChange={(e) => {
                        dispatchSite({
                          type: "welcomeLetterSent",
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
                <div className="row g-3 mt-1">
                  <div className="col-md-4">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={siteData.firstName}
                      onChange={(e) =>
                        dispatchSite({
                          type: "firstName",
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
                      value={siteData.lastName}
                      onChange={(e) =>
                        dispatchSite({
                          type: "lastName",
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
                      value={siteData.contactTitle}
                      onChange={(val) => {
                        dispatchSite({
                          type: "contactTitle",
                          value: val,
                        });
                      }}
                      name="contactTitle"
                    />
                  </div>
                </div>
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="form-label">Telephone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={siteData.telephoneNumber}
                      onChange={(e) =>
                        dispatchSite({
                          type: "telephoneNumber",
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
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
                <div className="row g-3 mt-2">
                  <div className="col-md-4">
                    <label className="form-label">Agent Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={siteData.agentEmail}
                      onChange={(e) =>
                        dispatchSite({
                          type: "agentEmail",
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
                    name="loaTemplate"
                    isSearch={true}
                    value={siteData.loaTemplate}
                    onChange={(val) => {
                      dispatchSite({
                        type: "loaTemplate",
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
              <button type="submit" className="btn btn-primary">
                Create Site
              </button>
            </div>
          </form>
        </div>
      </div>
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Choose The Site Address Here By Search Postcode"
      >
        <LookUp />
      </SmallModal>
    </>
  );
};

export default CreateSite;