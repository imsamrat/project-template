import React, { useState, useEffect } from "react";
import authService from "../../services/authService";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { clearUserData, userData } from "../../actions/userAction";

import { useDispatch } from "react-redux";
import userService from "../../services/Admin/UserManagement/userService";
// Email verification page
const Login = (props) => {
  document.title = props.name + " - Phitron";
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useParams();
  // token from url query
  const [status, setStatus] = useState({
    success: false,
  });

  useEffect(() => {
    if (token) {
      authService
        .emailVerification(token)
        .then(
          async (response) => {
            await localStorage.setItem("user", JSON.stringify(response.data));
            userService
              .getLoggedUserInfo()
              .then((userResponse) =>
                dispatch(
                  userData({
                    ...authService.getCurrentUser().user,
                    ...userResponse.data.data,
                    role: authService.getCurrentUser().user.role,
                  })
                )
              )
              .catch((err) => {
                if (err?.response?.status === 401) {
                  dispatch(clearUserData());
                  err?.response?.data.msg !== "Token expired!" && authService.logout(false);
                }
              });
          },
          (error) => {
            error?.response?.data.msg === "Token expired!" &&
              history.push("/resent-verification-email");
            setStatus({
              success: error?.data.success,
            });
          }
        )
        .then((res) => {
          history.push("/dashboard");
        })
        .catch((err) => {
			err?.response?.data.msg === "Token expired!" &&
			history.push("/resent-verification-email");
          setStatus({
            success: false,
          });
        });
    }
  }, []);

  return <></>;
};

export default Login;
