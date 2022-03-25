import axios from "axios";
import authService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "support-session/";
// Get user's authorization token

const getAuthorization = () => {
  // Getting user token and set to localstorage
  const token =
    authService.getCurrentUser() && authService.getCurrentUser().token;
  axios.defaults.headers.common = { Authorization: `${token}` };
};

let cancelToken;
class SupportSessionService{
  constructor() {
    getAuthorization();
  }

  addSupportSession(payload) {
    return axios.post(API_URL + "support-session", payload);
  }

  getInstructorUsernameList(payload) {
    return axios.get(API_URL + "instructor-username-list", payload);
  }

  addInstructor(payload) {
    return axios.post(API_URL + "instructor-information", payload);
  }
  
  updateSupportSession(id, payload) {
    return axios.patch(API_URL + `/support-session/${id}`, payload);
  }
  
  getInstructorUsernameById(params) {
    return axios.get(API_URL + "get-instructor-username-by-id", { params });
  }

  getMyUpcomingSessionList() {
    return axios.get(API_URL + "upcoming-session-list");  
  }

  getRunningSessionList() {
    return axios.get(API_URL + "running-support-session");  
  }

  getMyCompletedTask() {
    return axios.get(API_URL + "instructor-wise-task-complete");  
  }

  getMyAssignmentStats() {
    return axios.get(API_URL + "/get-instructor-assignment-statistics"); 
  }
  
  getInstructorAllList(params) {
    return axios.get(API_URL + "get-instructor-all-list", { params });
  }

  getOverAllAssignmentStats(courseId) {
    return axios.get(API_URL + "get-assignment-statistics/" + courseId);
  }

  getSupportSessionStats(id) {
    return axios.get(API_URL + 'student-requested-issue-statistic/' + id  );
  }
  updateIssueStatus(id, payload) {
    return axios.patch(API_URL + 'update-issue-status/' + id, payload  );
  }

  updateIssue(id, payload) {
    return axios.patch(API_URL + 'update-issue/' + id, payload  );
  }

  getSupportSessionsByDate(params) {
    return axios.get(API_URL + 'date-wise-support-session/' , {params}  );
  }
  
  updateInstructorInformation(id, payload) {
    return axios.patch(API_URL + `instructor-information/${id}`, payload);
  }

  addStudentIssue(payload) {
    return axios.post(API_URL + `student-support-link-suggestion`, payload);
  }

  getStudentSupportSerial() {
    return axios.get(API_URL + `student-support-serial`);
  }

  cancelSessionByUser(id, payload) {
    return axios.patch(API_URL + `cancel-session-by-user/${id}`, payload);
  }

  getSessionCategories(params){
    return axios.get(API_URL + `session-category`, {params});
  }
  
  getAllSupportSession(){
    return axios.get(API_URL + 'session-category-list')
  }

  addSessionCategory(payload){
    return axios.post(API_URL + `session-category`, payload);
  }

  updateSessionCategory(id, payload){
    return axios.patch(API_URL + `session-category/${id}`, payload);
  }

  deleteInstructorInformation(id){
    return axios.delete(API_URL + `instructor-information/${id}`);
  }

  deleteSessionCategory(id){
    return axios.delete(API_URL + `session-category/${id}`);
  }

  getSessionEvents(params){
    return axios.get(API_URL + `session-event`, {params});
  }

  addSessionEvent(payload){
    return axios.post(API_URL + `session-event`, payload);
  }

  updateSessionEvent(id, payload){
    return axios.patch(API_URL + `session-event/${id}`, payload);
  }

  deleteSessionEvent(id){
    return axios.delete(API_URL + `session-event/${id}`);
  }
  
  getUpcomingSessionEvents(){
    return axios.get(API_URL + `session-event-list`);
  }

  getDateWiseSessionList(payload) {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.")
    }

    cancelToken = axios.CancelToken.source()

    return axios.get(API_URL + "get-date-wise-session-info-list", {
      cancelToken: cancelToken.token,
      params: {
        ...payload,
      },
    });
  }

  updateDateWiseSession(payload) {
    return axios.patch(API_URL + `update-date-wise-session`, payload)
  }

  getInstructorList(payload) {
    return axios.get(API_URL + 'session-instructor-list', payload)
  }

  copyDateWiseSession(payload) {
    return axios.post(API_URL + 'copy-support-session', payload)
  }

  updateEstimate(payload) {
    return axios.patch(API_URL + `add-estimate`, payload)
  }
  
  bulkTransferSession(payload) {
    return axios.patch(API_URL + `bulk-transfer-issue`, payload)
  }


  
}


export default new SupportSessionService();