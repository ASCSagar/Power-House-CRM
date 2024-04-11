import React, { useEffect, useState } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import ajaxCall from "../../helpers/ajaxCall";

const Select = (props) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = async () => {
    let url = props.url;
    if (props?.isNeed) {
      url = props.url + `${props.separator}${props.paramName}=${props.paramId}`;
    }
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

    const allObj = response?.data?.map((option) => {
      let name = "";
      props?.objKey?.forEach((key, index, arr) => {
        if (index !== 0) name += " - ";
        name += option[key] ? option[key] : "NA";
      });
      if (props.needSlug) {
        return { value: option.slug, name };
      }
      return { value: option.id, name };
    });
    setOptions(allObj);
    setIsLoading(false);
  };

  useEffect(() => {
    if (props?.isStatic) {
      setOptions(props?.cols);
      setIsLoading(false);
      return;
    }
    if (props.url?.length) {
      data();
    }
  }, [props.url, props.isEditLoading, props.isEdit]);

  useEffect(() => {
    if (props?.forPopup) {
      if (props.value) {
        const getSelectedVal = options.find((option) => {
          return option.value === props.value;
        });
        console.log(getSelectedVal);
        props.setPopupthing(getSelectedVal ? getSelectedVal.name : "");
      }
    }
  }, [props.value, props?.forPopup, options]);

  let placeholder = isLoading
    ? "Loading"
    : options?.length
    ? "Select Options"
    : "No Data Found";

  return (
    <div className={props.className}>
      <label for="inputEmail5" className="form-label">
        {props.label}
      </label>
      <SelectSearch
        options={options}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        search={props.isSearch}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Select;