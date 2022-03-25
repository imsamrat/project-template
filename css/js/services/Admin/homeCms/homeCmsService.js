import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "home-cms/";

class HomeCmsService {

  // Get Home CMS data
  getHomeCmsData() {
    return axios.get(API_URL + 'home-data')
  }
  // Add slide
  addSlide(formData) {
    return axios
      .post(API_URL + "add-slide", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }

  // get list of slide
  getSlider() {
    return axios.get(API_URL + "slider")
  }

  // get a slide info by ID 
  getSingleSlide(id) {
    return axios.get(API_URL + "slide/" + id)

  }

  // Update slide info 
  updateSlide(id, formData) {
    return axios.patch(API_URL + "update-slide/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  // Delete slide
  deleteSlide(id) {
    return axios.delete(API_URL + "delete-slide/" + id);
  }
  // Get Notice
  getNotice() {
    return axios.get(API_URL + "notice/")
  }
  // patch Notice
  patchNotice(payload) {
    return axios.patch(API_URL + "notice/", payload)
  }
  // Course Specialties
  // Add Course Specialty
  addCourseSpecialty(formData) {
    return axios
      .post(API_URL + "add-course-specialty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }

  // get Course Specialties
  getCourseSpecialties() {
    return axios.get(API_URL + "course-specialties")
  }

  // get a Course Specialty by ID 
  getSingleCourseSpecialty(id) {
    return axios.get(API_URL + "course-specialty/" + id)

  }

  // Update Course Specialty 
  updateCourseSpecialty(id, formData) {
    return axios.patch(API_URL + "update-course-specialty/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  // Delete Course Specialty
  deleteCourseSpecialty(id) {
    return axios.delete(API_URL + "delete-course-specialty/" + id);
  }
  // Course Related Info
  // Add Related Info
  addCourseRelatedInfo(payload) {
    return axios
      .post(API_URL + "add-related-info", payload)
  }

  // get Related Info
  getCourseRelatedInfos() {
    return axios.get(API_URL + "related-infos")
  } s

  // get a Related Info by ID 
  getSingleCourseRelatedInfo(id) {
    return axios.get(API_URL + "related-info/" + id)

  }

  // Update Related Info 
  updateCourseRelatedInfo(id, payload) {
    return axios.patch(API_URL + "update-related-info/" + id, payload)
  }

  // Delete Related Info
  deleteCourseRelatedInfo(id) {
    return axios.delete(API_URL + "delete-related-info/" + id);
  }

  // ==== Projects
  // Add Project
  addProject(formData) {
    return axios
      .post(API_URL + "add-project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }

  // get list of Project
  getProjects() {
    return axios.get(API_URL + "projects")
  }

  // get a Project ID 
  getSingleProject(id) {
    return axios.get(API_URL + "project/" + id)

  }

  // Update Project 
  updateProject(id, formData) {
    return axios.patch(API_URL + "update-project/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  // Delete Project
  deleteProject(id) {
    return axios.delete(API_URL + "delete-project/" + id);
  }

  // ====== Author 

  //get author info
  getAuthorInfo() {
    return axios.get(API_URL + "author-info/")
  }

  //add author info
  addAuthorInfo(payload) {
    return axios.post(API_URL + "author-info", payload)
  }

  //update author info
  patchAuthorInfo(id, payload) {
    return axios.patch(API_URL + "author-info/" + id, payload)
  }

  deleteAuthorInfo(id) {
    return axios.delete(API_URL + "delete-author-info/" + id)
  }

  getSingleAuthorInfo(id) {
    return axios.get(API_URL + `get-single-author/${id}`)
  }

  // ====== Author 

  //get author info


  getFooterInfo() {
    return axios.get(API_URL + "footer-info/")
  }

  //update author info
  patchFooterInfo(payload) {
    return axios.patch(API_URL + "footer-info/", payload)
  }

  // ====== Reviews 

  //get Reviews
  getReviews() {
    return axios.get(API_URL + "reviews/")
  }

  //update Reviews
  patchReviews(payload) {
    return axios.patch(API_URL + "reviews/", payload)
  }

  // GetCourseContent
  getCourseContent() {
    return axios.get(API_URL + "course-content/")
  }
  // patchCourseContent
  patchCourseContent(payload) {
    return axios.patch(API_URL + "update-course-content/", payload)
  }

  // Get Featured Course
  getFeaturedCourse() {
    return axios.get(API_URL + "featured-course/")
  }
  // patch Featured Course
  patchFeaturedCourse(payload) {
    return axios.patch(API_URL + "update-featured-course/", payload)
  }

  // Get Featured Course
  getOpenCourseCurriculum() {
    return axios.get('https://openapi.programming-hero.com/api/course/curriculum', {
      headers: {
        Authorization: null
      }
    })
  }

}

export default new HomeCmsService();