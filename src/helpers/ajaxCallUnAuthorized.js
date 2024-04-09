const ajaxCallUnAuthorized = async (url, header, method, bodyData) => {
  return await fetch(`https://aumhealthresort.com/powercrmlatest/api/${url}`, {
    headers: header,
    method: method,
    body: bodyData,
  })
    .then((response) => {
      if (response.status === 401) {
        return -1;
      }
      if (response.status === 200) {
        return response.json();
      }
      return -1;
    })
    .catch((err) => console.log(err));
};

export default ajaxCallUnAuthorized;