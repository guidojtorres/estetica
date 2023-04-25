import axios from "axios";
import Swal from "sweetalert2";

const server = process.env.REACT_APP_SERVER + "/api";
export const fileServer = process.env.REACT_APP_SERVER;

export function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== "object" || !Array.isArray(object[key]))
      formData.append(key, object[key]);
    else if (Array.isArray(object[key]))
      object[key].forEach((v: any) => formData.append(key, v));
    else formData.append(key, JSON.stringify(object[key]));
  });
  return formData;
}

export const fetchFromServer = async (
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  body?: object
) => {
  const res = await axios({
    method,
    url: server + url,
    data: body,
  }).catch((e) => {
    Swal.fire("Error", e.response.data.errDesc, "error");
  });

  return res;
};

export const fetchFromServerWithFile = async (
  url: string,
  method: "POST" | "PUT",
  body: object
) => {
  const res = await axios({
    method,
    url: server + url,
    data: getFormData(body),
  }).catch((e) => {
    Swal.fire("Error", e.response.data.errDesc, "error");
  });

  return res;
};
