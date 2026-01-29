import axios from "axios";

export const URL = import.meta.env.VITE_API;
export const API_IMG = URL + "/images";
function setToken(token) {
  localStorage.setItem("adminToken", token);
}
async function putFunction(API, paramsObj) {
  try {
    const query = new URLSearchParams(paramsObj).toString();

    const { data } = await axios.put(`${URL}/${API}?${query}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export { setToken,putFunction };


function saveToken(token) {
  localStorage.setItem("adminToken", token);
}

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`, 
  },
});


export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});


export { saveToken };