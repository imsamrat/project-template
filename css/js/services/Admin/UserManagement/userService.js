import axios from "axios";
import authService from "../../authService";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL;

let cancelToken;

class UserService {
  constructor() {
    const token =
      authService.getCurrentUser() && authService.getCurrentUser().token;
    axios.defaults.headers.common = { Authorization: `${token}` };
  }
  // Get user list by query
  getUser = (payload) => {
    return axios.get(API_URL + "user/users", {
      params: {
        ...payload,
      },
    });
  };

  // Get a user by ID
  getUserDetail = (id) => {
    return axios.get(API_URL + `user/user/${id}`);
  };

  // Get Current/logged user info
  getLoggedUserInfo = () => {
    return axios.get(API_URL + "user/me", { headers: authHeader() });
  };

  // Update user info
  updateUser = (id, payload) => {
    return axios.patch(API_URL + `user/user/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Register user
  addUser = (payload) => {
    return axios.post(API_URL + `user/register`, payload);
  };

  // Add user from admin panel
  addManualUser = (payload) => {
    return axios.post(API_URL + `user/add-manual-user`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getUserSearch = (payload) => {
    return axios.get(API_URL + `user/user-search`, {
      params: {
        ...payload,
      },
    });
  };

  getUserSearchByEmail = (payload) => {
    return axios.get(API_URL + `user/user-search-email`, {
      params: {
        ...payload,
      },
    });
  };

  // Bulk Update student status
  getUserStatusBulkUpdate = (payload) => {
    return axios.patch(API_URL + `user/update-bulk-status`, payload);
  };

  // Post Bulk users
  AddBulkUser = (payload) => {
    return axios.post(API_URL + `user/bulk-add-user`, payload);
  };

  // Get Dashboard Status
  getDashboardStats = (payload) => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.")
    }

    cancelToken = axios.CancelToken.source()

    return axios.get(API_URL + `dashboard`, {
      cancelToken: cancelToken.token,
      params: {
        ...payload,
      },
    }, { headers: authHeader() })
      .then(res => {
        return res
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          authService.logout(false);
        }
      })
  };

  // Purchases Compare 
  purchasesCompare = (params) => {
    // if (cancelToken) {
    //   cancelToken.cancel("Operation canceled due to new request.")
    // }

    // cancelToken = axios.CancelToken.source()
    return axios.get(API_URL + `dashboard/purchases-compare`, {
      params,
      // cancelToken: cancelToken.token,
    })
  };


  // Add Bulk Manual user
  addBulkManualUser = (payload) => {
    return axios.post(API_URL + `user/bulk-add-manual-user`, payload);
  };

  // get manual user 
  getManualUser = (payload) => {
    return axios.get(API_URL + `user/get-manual-user`)
  };

  // Update student account status
  updateStudentAccountStatus = (payload) => {
    return axios.patch(API_URL + `user/update-student-account-status`, payload);
  };

  // Token check
  postTokenCheck = (payload) => {
    return axios.post(API_URL + `user/check-forget-password-token`, payload);
  };

  getStudentCourseCompleteButtonCheck = (payload) => {
    return axios
      .get(API_URL + `user/get-student-course-complete-button-check`, {
        params: {
          ...payload,
        },
      })
  }


  getCustomUserList = (payload) => {
    return axios
      .get(API_URL + `user/custom-user-list`, {
        params: {
          ...payload,
        },
      })
 
    }

  getCheckoutPageVisitor = (payload) => {
    return axios
      .get(API_URL + `user/checkout-page-visitor`, {
        params: {
          ...payload,
        },
      })
  }
 
}

export default new UserService();
