import axios from "axios";

export default () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL
    //,withCredentials: true
  });
};
