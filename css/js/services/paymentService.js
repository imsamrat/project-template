import axios from "axios";
import authService from "./authService";

const API_URL = process.env.REACT_APP_API_URL;
// Get user's authorization token
const getAuthorization = () => {
  // Getting user token and set to localstorage
  const token = authService.getCurrentUser() && authService.getCurrentUser().token
  axios.defaults.headers.common = { 'Authorization': `${token}` }
}

class PaymentService {
  constructor() {
    getAuthorization();
  }

  // Post Order data by Manual Bkash
  manualBkashPayment(payload) {
    getAuthorization();
    return axios.post(API_URL + 'transaction/manual-bkash', payload)
  }

  // Post Order data by SSLCommerce
  SslCommercePayment(payload) {
    return axios.post(API_URL + 'transaction/ssl-payment', payload);
  }

  // Update Bkash payment status
  manualBkashStatusChange(id, payload) {
    getAuthorization();
    return axios.patch(API_URL + `transaction/manual-bkash/${id}`, payload)
  }

  // Get user's order history by id
  getOrderHistoryOfUser(id) {
      return axios.get(API_URL + 'transaction/get-order-history')
  }

  // Coupon Apply
  applyCoupon(payload) {
    return axios.post(API_URL + 'coupon/applycoupon', payload)
  }

  stripePayment(payload) {
    return axios.post(API_URL + 'transaction/stripe-checkout-session', payload);
  }

  manualBkashVerify(payload) {
    return axios.post(API_URL + 'transaction/bkash-info-verify', payload);
  }
};

export default new PaymentService();
