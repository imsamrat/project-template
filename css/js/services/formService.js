import axios from "axios";

const getAuthorization = () => {
  // Getting user token and set to localstorage
  const localStorageData = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorageData && localStorageData["token"];
  axios.defaults.headers.common = { Authorization: `${token}` };
};

const API_URL = process.env.REACT_APP_API_URL + "form/";
let cancelToken;

class FormService {
  constructor() {
    getAuthorization();
  }

  getFormSuggestion() {
    return axios.get(API_URL + `form-suggestion/`);
  }

  getFormById(id) {
    return axios.get(API_URL + `form/${id}`);
  }

  getFormList(params) {
    return axios.get(API_URL + `form-list/`, {
      params,
    });
  }

  getFormListSuggestion(params) {
    
    cancelToken = axios.CancelToken.source();
    return axios.get(API_URL + `form-list-suggestion/`, {
      params,
    });
  }

  getFormCriteriaListSuggestion(params) {
    return axios.get(API_URL + `form-criteria-list-suggestion/`, {
      params,
    });
  }

  getFormCriteriaList(params) {
    return axios.get(API_URL + `form-criteria-list`, {
      params,
    });
  }

  getFormCriteriaById(id) {
    return axios.get(API_URL + `form-criteria/${id}`);
  }

  getCriteriaListByFormId(id, params) {
    return axios.get(API_URL + `criteria-list-by-form/${id}`, { params });
  }

  addForm(payload) {
    return axios.post(API_URL + `create/`, payload);
  }

  addFormCriteria(payload) {
    return axios.post(API_URL + `add-form-criteria/`, payload);
  }

  updateFormCriteria(id, payload) {
    return axios.patch(API_URL + `update-form-criteria/${id}`, payload);
  }

  storeFormResponse(payload) {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();
    return axios.post(API_URL + `store-form-response/`, payload, {
      cancelToken: cancelToken.token,
    });
  }

  updateFormResponse(id, payload) {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();
    return axios.patch(API_URL + `update-form-response/${id}`, payload, {
      cancelToken: cancelToken.token,
    });
  }

  addFormTypeUnit(payload) {
    return axios.post(API_URL + `create-form-unit/`, payload);
  }

  deleteForm(id) {
    return axios.delete(API_URL + `delete-form/${id}`);
  }

  updateForm(id, payload) {
    return axios.patch(API_URL + `update-form/${id}`, payload);
  }

  updateFormUnit(id, payload) {
    return axios.patch(API_URL + `update-form-unit/${id}`, payload);
  }

  getFormSubmissionHistory(params) {
    return axios.get(API_URL + `form-submission-history/`, {
      params,
    });
  }
  
  getActiveGeneralFormCriteria(params) {
    return axios.get(API_URL + `open-general-form-criteria/`, {
      params,
    });
  }

  getFormResponses(params) {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();
    return axios.get(API_URL + `responses`, {
      params,
      cancelToken: cancelToken.token,
    });
  }

  getResponseSpreedSheet(params) {
   
    return axios.get(API_URL + `from-response-spreed-sheet`, {
      params,
    });
  }

  getResponseExcel(params) {
    return axios.get(API_URL + `from-response-excel`, {
      responseType: 'blob',
      params,
    });
  }
  
}

export default new FormService();
