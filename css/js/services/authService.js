import axios from "axios";
import { detectOS } from "../utilities/deviceDetect";
import jwt_decode from "jwt-decode";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";

const getAuthorization = () => {
  // Getting user token and set to localstorage
  const localStorageData = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorageData && localStorageData["token"];
  axios.defaults.headers.common = { Authorization: `${token}` };
};

const API_URL = process.env.REACT_APP_API_URL + "user/";
const FINGER_PRINT_JS_TOKEN = process.env.REACT_APP_FINGER_PRINT_JS_API_KEY;
const ENV_TYPE = process.env.REACT_APP_ENV;

class AuthService {
  constructor() {
    getAuthorization();
  }
  // Login
  async login(email, password) {
    const additionalData = {};

    // if(ENV_TYPE === 'production' ) {
    //   const fp = await FingerprintJS.load({token: FINGER_PRINT_JS_TOKEN, endpoint: 'https://fp.programming-hero.com'});
    //   const result = await fp.get();
    //   additionalData.visitorId = result.visitorId;

    // }

    return axios
      .post(API_URL + "login", {
        email,
        password,
        platform: detectOS(),
        ...additionalData,
      })
      .then(async (response) => {
        if (response.data?.success) {
          const user = await localStorage.setItem(
            "user",
            JSON.stringify(response.data)
          );
          const token =
            (await this.getCurrentUser()) && this.getCurrentUser().token;
          axios.defaults.headers.common = { Authorization: `${token}` };
        }

        return response.data;
      });
  }

  // Logout
  logout(hardReload = true) {
    // If have token
    if (axios.defaults.headers.common["Authorization"] !== "undefined") {
      return axios
        .post(API_URL + "logout")
        .then(() => {
          localStorage.removeItem("user");
          if (hardReload) {
            window.location = "/login";
          }
        })

        .catch((err) => {
          // If previously stored token is invalid/expired then remove
          if (err?.response?.status === 401) {
            localStorage.removeItem("user");
            if (hardReload) {
              window.location = "/login";
            }
          }
        });
    }
  }

  // Register
  register({ fullName, email, phone, password, redirect, hearAboutUs }) {
    return axios
      .post(API_URL + "register", {
        fullName,
        email,
        phone,
        password,
        redirect,
        hearAboutUs
      })
      .then(async (response) => {
        if (response.data?.success && redirect) {
          await localStorage.setItem("user", JSON.stringify(response.data));
          axios.defaults.headers.common = {
            Authorization: `${response?.data?.token}`,
          };
        }

        return response.data;
      });
  }

  emailVerification(token) {
    return axios.post(API_URL + "verifyuseremail/" + token);
  }

  // Forgot Password
  forgotPassword(email) {
    return axios.post(API_URL + "forgotpassword", {
      email,
    });
  }

  // Resend Verification Email
  resendVerificationEmail(email) {
    return axios.post(API_URL + "resend-verification-email", {
      email,
    });
  }

  // Reset password
  resetPassword(token, password) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    return axios.post(API_URL + "newpassword", {
      password,
    });
  }

  // Current logged user data
  getCurrentUser() {
    getAuthorization();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
      return {
        token,
        success: true,
        user: jwt_decode(token),
      };
    }
  }

  getAuthToken() {
    return axios.get(API_URL + "/get-user-token").then(async (response) => {
      const token = response?.data?.token;
      await localStorage.setItem("user", JSON.stringify(response.data));
      axios.defaults.headers.common = {
        Authorization: `${token}`,
      };

      return {
        token,
        success: true,
        user: jwt_decode(token),
      };
    });
  }

  // Update user info
  updateUserInfo = (id, token, payload) => {
    axios.defaults.headers.common = { Authorization: `${token}` };

    return axios.patch(API_URL + `student/user/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Update own Profile
  updateMyInfo = (payload) => {
    return axios.patch(API_URL + `/my-profile`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Update own Additional Data
  updateMyAdditionalData = (payload) => {
    return axios.patch(API_URL + `my-additional-data`, payload);
  };

  // Upload Appointment Letter
  uploadAppointmentLetter = (payload) => {
    return axios.post(API_URL + `upload-appointment-letter`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  downloadAppointmentLetter = (id) => {
    return axios
      .get(API_URL + `download-appointment-letter/${id}`, {
        responseType: 'arraybuffer'
      })
  }

  // Store Student project Data
  addStudentProject = (payload) => {
    return axios.post(API_URL + `add-student-project`, payload);
  };

  // Store Student experience
  addStudentExperience = (payload) => {
    return axios.post(API_URL + `add-student-experience`, payload);
  };

  // Store Student experience
  addStudentSkill = (payload) => {
    return axios.post(API_URL + `add-student-skill`, payload);
  };

  // Store Student experience
  updateStudentSkill = (payload) => {
    return axios.patch(API_URL + `my-skill`, payload);
  };

  // Store Student project Data
  updateStudentProject = (payload) => {
    return axios.patch(API_URL + `my-project`, payload);
  };

  // Update Student experience Data
  updateStudentExperience = (payload) => {
    return axios.patch(API_URL + `my-experience`, payload);
  };

  // Delte Student experience Data
  deleteStudentExperience = (id) => {
    return axios.delete(API_URL + `my-experience/${id}`);
  };

  // Delete Student Skill Data
  deleteStudentSkill = (id) => {
    return axios.delete(API_URL + `my-skill/${id}`);
  };

  // get own Additional Data
  getMyAdditionalData = (field) => {
    getAuthorization();
    return axios.get(API_URL + `my-additional-data/${field}`);
  };

  // get own Additional Data
  getMyProfileProgress = (field) => {
    getAuthorization();
    return axios.get(API_URL + `my-profile-progress`);
  };

  // get own projects
  getMyProjects = () => {
    getAuthorization();
    return axios.get(API_URL + `my-projects`);
  };

  // Update user password
  updateOwnPassword = (payload) => {
    return axios.patch(API_URL + `changepassword`, payload);
  };

  // Check users current password
  checkPassword = (payload) => {
    return axios.post(API_URL + `checkpassword`, payload);
  };

  // Course Recheck request by student
  courseRequest = (payload) => {
    return axios.post(API_URL + `course-request`, payload);
  };
}

export default new AuthService();
