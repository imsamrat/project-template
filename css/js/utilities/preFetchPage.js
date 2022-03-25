const preFetchPage = (page) => {
    switch (page) {
        case 'about':
            return import("../views/pages/About");
        case 'success':
            return import("../views/pages/SuccessStudents");
        case 'staticPage':
            return import("../views/pages/StaticPage");
        case 'termsOfService':
            return import("../views/pages/TermsOfService");
        case 'login':
            return import("../views/pages/Login");
        case 'register':
            return import("../views/pages/Register");
        case 'forgotPassword':
            return import("../views/pages/ForgotPassword");
        case 'resetPassword':
            return import("../views/pages/ResetPassword");
        case 'profile':
            return import("../views/pages/Student/Profile");
        case 'dashboard':
            return import("../views/pages/Dashboard/Dashboard");
        case 'nextStep':
            return import("../views/pages/NextStep");
        case 'orderHistory':
            return import("../components/StudentDashboard/StudentProfile/OrderHistory");
        case 'announcements':
            return import("../views/pages/Announcements");
        case 'leaderBoard':
            return import("../views/pages/LeaderBoard");
        case 'internalFaq':
            return import("../views/pages/InternalFaq");
        case 'checkout':
            return import("../views/pages/Checkout");
        case 'courseDetails':
            return import("../views/pages/CourseDetails");
        case 'courseSummary':
            return import("../views/pages/CourseSummary");
        case 'assignment':
            return import("../views/pages/Course/Assignment/Assignment");
        case 'moduleLocked':
            return import("../views/pages/Course/ModuleLocked");
        case 'assignmentResubmit':
            return import("../views/pages/Course/Assignment/AssignmentResubmit");
        case 'assignmentSubmitted':
            return import("../views/pages/Course/Assignment/AssignmentSubmittedPage");
        case 'video':
            return import("../views/pages/Course/ModuleDetail");
        case 'quiz':
            return import("../views/pages/Course/Quiz");
        case 'quizQuestion':
            return import("../views/pages/Course/QuizQuestion");
        case 'quizResult':
            return import("../views/pages/Course/QuizResult");
        case 'post':
            return import("../views/pages/Course/Post");
        default:
            return import("../views/pages/page404/Page404")
    }
}

export default preFetchPage