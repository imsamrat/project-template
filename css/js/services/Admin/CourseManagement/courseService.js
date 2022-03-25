import axios from "axios";
import authService from "../../authService";
import { detectOS } from "../../../utilities/deviceDetect";
const API_URL = process.env.REACT_APP_API_URL;

const getAuthorization = () => {
  // Getting user token and set to localstorage
  const token = authService.getCurrentUser() && authService.getCurrentUser().token
  axios.defaults.headers.common = { 'Authorization': `${token}` }
}

class CourseService {
  constructor() {
    getAuthorization();
  }

  // Create/Post Course
  createCourse = (formData) => {
    getAuthorization();
    return axios.post(API_URL + "course/addCourse", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  };

  // Update course info
  patchCourse = (id, payload) => {
    return axios
      .patch(API_URL + `course/course/${id}`, payload)
  }

  // Get list of all courses 
  getCourses = (payload) => {
    return axios.get(API_URL + "course/course", {
      params: {
        ...payload
      }
    })
  };

  // Get list of all courses 
  getAdminCourseList = (payload) => {
    return axios.get(API_URL + "course/admin-course-list", {
      params: {
        ...payload
      }
    })
  };

  // Get list of all courses parent child
  getCourseListWithChildCourse = (payload) => {
    return axios.get(API_URL + "course/course-list-with-child", {
      params: {
        ...payload
      }
    })
  };

  // Get course info by ID
  getCourseDetail = (id) => {
    return axios
      .get(API_URL + `course/course/${id}`)
  }

  // Get student course info by ID
  getAdminCourseDetail = (id) => {
    return axios
      .get(API_URL + `course/admin-course-tree/${id}`)
  }

  // Get student course info by ID
  getStudentCourseDetail = (id, params) => {

    return axios
      .get(API_URL + `course/student-course-tree/${id}`, { params })
      .then(res => {
        localStorage.setItem('courseName', res.data?.data?.title);
        localStorage.setItem('courseId', res.data?.data?._id);

        return res
      })
  }

  // Create/Post new milestone to a course
  addMilestone = (payload) => {
    return axios
      .post(API_URL + `milestone/milestone`, payload)
  }

  // Update  milestone to a course
  patchMilestone = (id, payload) => {
    return axios
      .patch(API_URL + `milestone/milestone/${id}`, payload)
  }

  // Create/Post new Module to a course
  addModule = (payload) => {
    return axios
      .post(API_URL + `module/module`, payload)
  }

  // Update Module to a course
  patchModule = (id, payload) => {
    return axios
      .patch(API_URL + `module/module/${id}`, payload)
  }

  // Post video unit to a course
  addVideo = (payload) => {
    return axios
      .post(API_URL + `video/video`, payload)
  }

  // Post/create Assignment to a course
  addAssignment = (payload) => {
    return axios
      .post(API_URL + `assignment/assignment`, payload)
  }

  // Post/create Quiz to a course
  addQuiz = (payload) => {
    return axios
      .post(API_URL + `quiz/addQuiz`, payload)
  }

  // Search course
  getCourseSearch = (payload) => {
    return axios
      .get(API_URL + `course/course-search`, {
        params: {
          ...payload
        }
      })
  }

  // Create/Post Feedback to a course (Admin Panel)
  addFeedback = (payload) => {
    return axios
      .post(API_URL + `feedback/addFeedback `, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }

  // Create/Post Feedback to a course (Student)
  addStudentFeedback = (payload) => {
    return axios
      .post(API_URL + `feedback/addFeedback `, payload)
  }

  // Update/Patch feedback (STUDENT)
  updateStudentFeedback = (payload, courseId) => {
    return axios
      .patch(API_URL + `feedback/update-student-feedback/` + courseId, payload)
  }

  // Get feedbacks by course ID
  getFeedback = (id, payload = {}) => {
 
    return axios
      .get(API_URL + `feedback/getfeedbacks/${id}` , { params: {
        ...payload
      }})
  }

  getFeaturedFeedbacks = (payload = {}) => {
    return axios
      .get(API_URL + `feedback/featured-feedbacks`, { payload });
  }

  // Get a feedback by ID
  getFeedbackDetail = (id) => {
    return axios
      .get(API_URL + `feedback/${id}`)
  }

  // Delete a feedback by ID
  deleteFeedback = (id) => {
    return axios
      .delete(API_URL + `feedback/deletefeedback/${id}`)
  }

  // Update Feedback by ID
  updateFeedback = (id, payload) => {
    return axios
      .patch(API_URL + `feedback/updatefeedback/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  }

  // Get Unit content by of a Course
  getUnitContent = (id, payload) => {
    return axios
      .get(API_URL + `unit/get-unit-content/${id}`, {
        params: {
          ...payload,
        }
      })
  }

  // Delete UNIT
  deleteUnit = (id) => {
    return axios
      .delete(API_URL + `unit/unit/${id}`)
  }

  // Delete Milestone
  deleteMilestone = (id, payload) => {
    return axios
      .delete(API_URL + `milestone/milestone/${id}`, payload)
  }

  // Delete Module
  deleteModule = (id, payload) => {
    return axios
      .delete(API_URL + `module/module/${id}`, payload)
  }

  // Update Assignment
  patchAssignment = (id, payload) => {
    return axios
      .patch(API_URL + `assignment/assignment/${id}`, payload)
  }

  // Update Video content
  patchVideo = (id, payload) => {
    return axios
      .patch(API_URL + `video/video/${id}`, payload)
  }

  // Add UNIT visit history for student
  addUnitHistory = (payload) => {

    return axios
      .post(API_URL + `unit/unit-history`, payload)
  }

  // Get unit history
  getUnitHistory = (id) => {
    if (!id) return
    return axios
      .get(API_URL + `unit/unit-history/${id}`)
  }

  // Get unit history list of a user of a course
  getUnitHistoryList = (id) => {
    getAuthorization();
    return axios
      .get(API_URL + `unit/unit-history-list/${id}`)
  }

  // Get UNIT list
  getUnit = () => {
    return axios
      .get(API_URL + `unit/unit`)
  }

  // Get Single course Unit list
  getSingleCourseUnitList = (id) => {
    return axios
      .get(API_URL + `unit/single-course-unit-list/${id}`)
  }

  // Get next unit of course
  getNextUnitOfCourse = (id) => {
    if (!id) return;
    const token = authService.getCurrentUser() && authService.getCurrentUser().token;

    if (!token) return;

    getAuthorization();
    return axios
      .get(API_URL + `course/getNext/${id}`)
  }

  // Add course to student (Manually)
  addStudentToACourseManually = (payload) => {
    return axios
      .post(API_URL + "purchaseHistory", payload)
  }

  //Get assignment list of a course
  getCourseAssignment = (payload) => {
    return axios.get(API_URL + "course/course-assignment-list", {
      params: {
        ...payload
      }
    })
  };

  // Get module list of a course
  getModule = (payload) => {
    return axios
      .get(API_URL + `module/module`, {
        params: {
          ...payload
        }
      })
  }

  // Get course Curriculum
  getCourseCurriculum = (payload) => {
    return axios.get(API_URL + "course-curriculum", {
      params: {
        ...payload
      }
    })
  };

  // Add module to course  Curriculum
  addCourseCurriculum = (payload) => {
    return axios.post(API_URL + "course-curriculum", payload)
  }

  // Update module name to course  Curriculum
  patchCourseCurriculum = (id, payload) => {
    return axios
      .patch(API_URL + `course-curriculum/${id}`, payload)
  }

  //  Delete module  from course  Curriculum
  deleteCourseCurriculum = (id, payload) => {
    return axios
      .delete(API_URL + `course-curriculum/${id}`, payload)
  }

  // Get course details for pubic view
  getPublicCourseDetail = (payload) => {
    return axios
      .get(API_URL + `course/public-course-detail`, {
        params: {
          ...payload
        }
      })
  }

  // generate leader board
  generateLeaderBoard = (payload) => {
    return axios
      .get(API_URL + `leader-board/ranked-data`, {
        params: {
          ...payload
        }
      })
  }

  // Re index course
  getReindexcourse = (id) => {
    return axios
      .get(API_URL + `course/re-index/${id}`)
  }

  // Get course module list
  getCourseModuleList = (payload) => {
    return axios
      .get(API_URL + `course/course-module-list`, {
        params: {
          ...payload
        }
      })
  }
  // Get course Certification
  getCourseCertification = (payload) => {
    return axios.get(API_URL + "certification", {
      params: {
        ...payload
      }
    })
  };

  // Get course Certification
  getCourseGenerateCertification = (payload) => {
    return axios.get(API_URL + "certification/get-generate-certification", {
      params: {
        ...payload
      }
    })
  };


  // Get seen/unseen statistics of course module
  getCourseModuleStatistics = (params) => {
    return axios
      .get(API_URL + `user/get-course-module-statistics`, { params })
  }

  // Get module unit
  getModuleUnitList = (payload) => {
    return axios.get(API_URL + "module/get-module-unit-list", {
      params: {
        ...payload
      }
    })
  };

  // Get reset unit history
  getResetUnitHistory = (payload) => {
    return axios.get(API_URL + "unit/reset-course-unit-history", {
      params: {
        ...payload
      }
    })
  };

  // Download course enrolled Student list as excel file
  getEnrolledStudentSheet = (id, payload) => {
    return axios.get(API_URL + `course/get-enrolled-student-sheet/${id}`, {
      responseType: 'blob', params: {
        ...payload
      }
    })
  };

  // Bulk Remove from course
  bulkRemoveStudentFromCourse = (payload) => {
    return axios.post(API_URL + `course/bulk-student-remove-from-course`, payload);
  };

  // Get course module list
  // Get course module list
  getCourseMilestoneList = () => {
    return axios
      .get(API_URL + `course/course-milestone-list`)
  }

  // Get course module export
  addCourseModuleExport = (payload) => {
    return axios
      .post(API_URL + `course/export-module-master-to-child`, payload)
  }

  // Get course unit export
  addCourseUnitExport = (payload) => {
    return axios
      .post(API_URL + `course/export-unit-master-to-child`, payload)
  }

  // Get course milestone export
  addCourseMilestoneExport = (payload) => {
    return axios
      .post(API_URL + `course/export-milestone-master-to-child`, payload)
  }

  // Get course unit export
  addCourseExport = (payload) => {
    return axios
      .post(API_URL + `course/export-course-master-to-child`, payload)
  }

  // Post/create Team Assignment to a course
  addTeamAssignment = (payload) => {
    return axios
      .post(API_URL + `team-assignment/add-team-assignment`, payload)
  }

  // patch Team Assignment to a course
  patchTeamAssignment = (id, payload) => {
    return axios
      .patch(API_URL + `team-assignment/update-team-assignment/${id}`, payload)
  }

  // Get course list, pass the propery as array that you want to show
  getCourseListDynamicPropery = (payload) => {
    return axios.get(API_URL + "course/course-list-dynamic-property", {
      params: {
        ...payload
      }
    })
  };

  // Add acc or Reset
  addAccOrResetCourse = (id, payload) => {
    return axios
      .patch(API_URL + `course/add-acc-or-rest/${id}`, payload)
  }

  // Add acc or Reset
  removeAccOrResetCourse = (id, payload) => {
    return axios
      .patch(API_URL + `course/remove-acc-or-rest/${id}`, payload)
  }

  // Get course unit list
  getCourseUnitList = (payload) => {
    return axios.get(API_URL + "course/course-unit-list", {
      params: {
        ...payload
      }
    })
  };

  // Add auto course complete history
  addAutoCourseCompleteHistory = (payload) => {
    return axios
      .post(API_URL + `course/auto-course-complete-history`, payload)
  }

  // Get Course Registration
  getCourseRegistration = (payload) => {
    return axios.get(API_URL + "course/get-course-registration-validity", {
      params: {
        ...payload
      }
    })
  };
  
   // Get seen/unseen statistics of course module
  getBlackBeltSelection = (params) => {
    return axios
      .get(API_URL + `black-belt/black-belt-selection`, { params })
  }


  // Get seen/unseen statistics of course module
  getGenerateBlackBeltHistory = (params) => {
    return axios
      .get(API_URL + `black-belt/get-generate-black-history`, { params })
  }

  // Get seen/unseen statistics of course module
  getBlackBeltHistory = (params) => {
    return axios
      .get(API_URL + `black-belt/get-black-history`, { params })
  }

  // Get parent course child course list
  getParentCourseChildCourseList = (params) => {
    return axios
      .get(API_URL + `course/get-parent-course-child-course-list`, { params })
  }



};

export default new CourseService();
