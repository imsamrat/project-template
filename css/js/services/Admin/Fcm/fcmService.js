import axios from "axios";
import authService from "../../authService";
import firebase from "../../../utilities/firebase/firebase"


const API_URL = process.env.REACT_APP_API_URL;

const getAuthorization = () => {
  // Getting user token and set to localstorage
  const token = authService.getCurrentUser() && authService.getCurrentUser().token
  axios.defaults.headers.common = { 'Authorization': `${token}` }
}

class FCMService {
  constructor() {
    getAuthorization();
  }

  addFCM = (payload) => {
    return axios.post(API_URL + `fcm-token/add-token`, payload);
  };

  // Get notification list by query
  deleteFCM = (payload) => {
    return axios.delete(API_URL + `fcm-token/remove-token`, payload);
  };

  getToken = () => {
    // const userInfo = authService.getCurrentUser()?.user;

    // if (userInfo?.role === "student" || userInfo?.role === "tester") {

    //   const messaging = firebase?.messaging?.isSupported() ? firebase.messaging() : null;
    //   // Add the public key generated from the console here.
    //   if(messaging) {
    //     messaging.getToken({ vapidKey: 'BC_cH7lD6Aqs2BAWeReb0Zk-kouRk42z3N7xyPbCxYtK-IrVuYQW_TbkY3YmtxGx7EKj9i1vBKfOgU4Db8PQCDU' }).then((currentToken) => {
    //       if (currentToken) {
    //         // Send the token to your server and update the UI if necessary
    //         console.log("currentToken",currentToken)
    //         if (localStorage.getItem("fcmToken") !== currentToken) {
              
    //           if (localStorage.getItem("fcmToken")) {
    //             this.deleteFCM({
    //               user: userInfo?._id,
    //               token: localStorage.getItem("fcmToken")
    //             }).then();
    //           }
    //           this.addFCM({
    //             user: userInfo?._id,
    //             token: currentToken
    //           }).then(response =>{
    //             localStorage.setItem("fcmToken", currentToken);
    //           });
            
    //         }
    //       } else {
    //         // Show permission request UI
    //         console.log('No registration token available. Request permission to generate one.');
    //         // ...
    //       }
    //     }).catch((err) => {
    //       console.log('An error occurred while retrieving token. ', err);
    //       // ...
    //     });

    //     messaging.onMessage((payload) => {
    //       console.log('Message received. ', payload);
    //       // ...
    //     });
    //   }
    // }
  }

}

export default new FCMService();
