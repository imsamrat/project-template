import axios from "axios";
import authService from "../authService";

const API_URL = process.env.REACT_APP_API_URL + "gem/";
// Get user's authorization token
const getAuthorization = () => {
  // Getting user token and set to localstorage
  const token =
    authService.getCurrentUser() && authService.getCurrentUser().token;
  axios.defaults.headers.common = { Authorization: `${token}` };
};

class GemService {
  constructor() {
    getAuthorization();
  }

  addGemExcel(payload) {
    return axios.post(API_URL + "/give-gem-bulk-email-excel", payload);
  }

  getGemOfUser(params) {
    return axios.get(API_URL + "user-gem/", { params });
  }

  getStudentGemList = (payload) => {
    return axios.get(API_URL + "student-gem-list", {
      params: {
        ...payload,
      },
    });
  }
  getGemDistributionHistory = (payload) => {
    return axios.get(API_URL + "gem-distribution-list", {
      params: {
        ...payload,
      },
    });
  }
  giveBulkGemCourseWise = (payload) => {
    return axios.post(API_URL + "give-gem-bulk-user", payload);

  }

  giveGemToSingleUser = (payload) => {
    return axios.post(API_URL + "give-gem-single-user", payload);
  }
  
  spendForModuleEarlyRelease = (payload) => {
    return axios.post(API_URL + "spend-for-early-release-module", payload);
  }

}

export default new GemService();