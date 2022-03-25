import axios from "axios";
import authService from "../../authService";

const API_URL = process.env.REACT_APP_API_URL;


class faqService {
  constructor() {
    const token = authService.getCurrentUser() && authService.getCurrentUser().token
    axios.defaults.headers.common = { 'Authorization': `${token}` }
  }

  // Get list of FAQ
  getFaq = () => {
    return axios.get(API_URL + "faq")
  };

  // Get All list of FAQ for admin
  getAdminFaq = () => {
    return axios.get(API_URL + "faq/all")
  };
  // Get Internal FAQ list
  getInternalFaq = () => {
    return axios.get(API_URL + "faq/internal")
  };
  // Get single FAQ by ID
  getFaqById = (id) => {
    return axios.get(API_URL + "faq/" + id)
  };

  // Post FAQ
  addFaq = (payload) => {
    return axios
      .post(API_URL + `faq/`, payload)
  }

  // Post Video FAQ
  addVideoFaq = (payload) => {
    return axios
      .post(API_URL + `faq/`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }
  // Update FAQ
  updateFaq = (id, payload) => {
    return axios
      .patch(API_URL + "faq/" + id, payload)
  }

  // Update FAQ
  updateVideoFaq = (id, payload) => {
    return axios
      .patch(API_URL + "faq/" + id, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }
  // Delete FAQ
  deleteFaq = (id) => {
    return axios
      .delete(API_URL + `faq/${id}`)
  }

};

export default new faqService();
