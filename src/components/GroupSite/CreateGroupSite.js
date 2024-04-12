import React, { useState } from "react";
import { toast } from "react-toastify";
import SelectSearch from "react-select-search";
import Select from "../../UI/Select/Select";
import MultiSelect from "../../UI/MultiSelect/MultiSelect";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../UI/Loading/Loading";

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateGroupSite = ({ refreshTableMode }) => {
  const [formData, setFormData] = useState({
    group_name: "",
    company: "",
    sites: "",
    group_type: "",
  });
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!formData.group_name) {
      setFormError("Group Name is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };
  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const createGroupSite = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let body = {
      group_name: formData.group_name,
      company: formData.company,
      sites: formData?.sites?.map((site) => site.id),
      group_type: formData.group_type,
    };
    try {
      const response = await ajaxCall(
        "multisite/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(body),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        setFormData({
          group_name: "",
          company: "",
          sites: "",
          group_type: "",
        });
        refreshTableMode();
        toast.success("Group Site Created Successfully");
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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create Group Site</h5>
        <form className="row g-3" onSubmit={createGroupSite}>
          <div className="col-md-3">
            <label className="form-label">Group Name</label>
            <input
              type="text"
              className="form-control"
              value={formData?.group_name}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, group_name: e.target.value };
                })
              }
            />
          </div>
          <Select
            className="col-md-3"
            label="Company Name"
            name="name"
            isSearch={true}
            value={formData?.company}
            onChange={(val) => {
              setFormData((prev) => {
                return { ...prev, company: val };
              });
            }}
            objKey={["name"]}
            url="sites/get/company_name/"
          />
          <MultiSelect
            className="col-md-3"
            label="Sites"
            name="sites"
            multiple={true}
            value={formData?.sites}
            onSelect={(val) => {
              setFormData((prev) => {
                return { ...prev, sites: val };
              });
            }}
            onRemove={(val) => {
              setFormData((prev) => {
                return { ...prev, sites: val };
              });
            }}
            isSearch={true}
            objKey={["site_name"]}
            url={
              formData.company
                ? `sites/get/site/?company=${formData.company}&pagination=false&brief=True`
                : ""
            }
          />
          <div className="col-md-3">
            <label className="form-label">Group Type</label>
            <SelectSearch
              options={[
                { name: "Basic Site Group", value: "BASIC" },
                { name: "Multi Site Group", value: "MULTI" },
              ]}
              placeholder={"Select Options"}
              value={formData?.group_type}
              onChange={(val) =>
                setFormData((prev) => {
                  return { ...prev, group_type: val };
                })
              }
              name={"companyName"}
            />
          </div>
          <div className="text-center">
            {formStatus.isError ? (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            ) : (
              <div className="text-success mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Loading color="primary" text={"Creating Group Site..."} />
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus.isSubmitting}
              >
                Create Group Site
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupSite;
