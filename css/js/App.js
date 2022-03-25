import React, { useEffect } from 'react';
import smartlookClient from 'smartlook-client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import './scss/main.scss';
import EmailVerification from './views/pages/EmailVerification';
import { clearUserData, userData } from "./actions/userAction";
import { useDispatch } from "react-redux";
import userService from './services/Admin/UserManagement/userService';
import authService from './services/authService';
import cartService from './services/cartService';
import { loadCartFromLocalStorage } from './actions/cartAction';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import homeCmsService from './services/Admin/homeCms/homeCmsService';
import { storeFooterData } from './actions/footerInfoAction';
import momentTz from 'moment-timezone';
import moment from 'moment';
import MasterLayout from './components/Common/MasterLayout';
import lazyLoading from './utilities/lazyLoading';
import StudentDashboardSkeleton from './components/SkeletonLoaders/StudentDashboardScalton';
import CourseContentSkeleton from './components/SkeletonLoaders/CourseContentSkeleton';
import CourseOverviewSkeleton from './components/SkeletonLoaders/CourseOverviewSkeleton';
import SuccessStudentSkeleton from './components/SkeletonLoaders/SuccessStudentSkeleton';
import Preloader from './components/Preloader/Preloader';
import JobPortalDashBoard from './components/JobPortal/JobPortalDashBoardLayout';
import { loadGem } from './actions/gemAction';
import { loadClientRoutes } from './actions/clientRouteAction';
import { useQuery } from 'react-query';
import formService from './services/formService';
import useLocalStorage from './hooks/useLocalStorage';
import GeneralForm from './components/Common/GeneralForm';
import fcmService from "./services/Admin/Fcm/fcmService";
// import { loadGem } from './actions/gemAction';


//  Lazy loaded pages
const Dashboard = lazyLoading(() => import( /* webpackPrefetch: true */ './views/pages/Dashboard/Dashboard'), {
  fallback: <StudentDashboardSkeleton />
});

const InstructorDashboard = lazyLoading(() => import('./containers/InstructorLayout'), {
  fallback: <StudentDashboardSkeleton />
});

const ConceptualSession = lazyLoading(() => import( /* webpackPrefetch: true */ './views/pages/ConceptualSession/ConceptualSession.js'), {
  fallback: <StudentDashboardSkeleton />
});


const CourseDetails = lazyLoading(() => import('./views/pages/CourseDetails'), {
  fallback: <CourseOverviewSkeleton />
});
const CourseSummery = lazyLoading(() => import('./views/pages/CourseSummary'), {
  fallback: <CourseOverviewSkeleton />
});
const Checkout = lazyLoading(() => import('./views/pages/Checkout'), {
  fallback: <Preloader />
});
const Assignment = lazyLoading(() => import('./views/pages/Course/Assignment/Assignment'), {
  fallback: <CourseContentSkeleton />
});
const TeamAssignment = lazyLoading(() => import('./views/pages/Course/Assignment/TeamAssignment'), {
  fallback: <CourseContentSkeleton />
});
const ModuleLocked = lazyLoading(() => import('./views/pages/Course/ModuleLocked'), {
  fallback: <CourseContentSkeleton />
});
const AssignmentResubmit = lazyLoading(() => import('./views/pages/Course/Assignment/AssignmentResubmit'), {
  fallback: <CourseContentSkeleton />
});
const AssignmentSubmitted = lazyLoading(() => import('./views/pages/Course/Assignment/AssignmentSubmittedPage'), {
  fallback: <CourseContentSkeleton />
});
const Login = lazyLoading(() => import('./views/pages/Login'), {
  fallback: <Preloader />
});
const Register = lazyLoading(() => import('./views/pages/Register'), {
  fallback: <Preloader />
});
const ForgotPassword = lazyLoading(() => import('./views/pages/ForgotPassword'), {
  fallback: <Preloader />
});
const ResendVerificationEmail = lazyLoading(() => import('./views/pages/ResendVerificationEmail'), {
  fallback: <Preloader />
});
const ResetPassword = lazyLoading(() => import('./views/pages/ResetPassword'), {
  fallback: <Preloader />
});
const ModuleDetail = lazyLoading(() => import('./views/pages/Course/ModuleDetail'), {
  fallback: <CourseContentSkeleton />
});
const Quiz = lazyLoading(() => import('./views/pages/Course/Quiz'), {
  fallback: <CourseContentSkeleton />
});
const QuizQuestion = lazyLoading(() => import('./views/pages/Course/QuizQuestion'), {
  fallback: <CourseContentSkeleton />
});
const QuizResult = lazyLoading(() => import('./views/pages/Course/QuizResult'), {
  fallback: <CourseContentSkeleton />
});
const Post = lazyLoading(() => import('./views/pages/Course/Post'), {
  fallback: <CourseContentSkeleton />
});
const Form = lazyLoading(() => import('./views/pages/Course/Form'), {
  fallback: <CourseContentSkeleton />
});
const StudentProfile = lazyLoading(() => import('./views/pages/Student/Profile'), {
  fallback: <Preloader />
});
const TermsOfService = lazyLoading(() => import('./views/pages/TermsOfService'), {
  fallback: <Preloader />
});
const StaticPage = lazyLoading(() => import('./views/pages/StaticPage.js'), {
  fallback: <Preloader />
});

const Faq = lazyLoading(() => import('./views/pages/Faq'), {
  fallback: <Preloader />
});
const InternalFaq = lazyLoading(() => import('./views/pages/InternalFaq'), {
  fallback: <Preloader />
});
const AboutUs = lazyLoading(() => import('./views/pages/About'), {
  fallback: <Preloader />
});
const Home = lazyLoading(() => import('./views/pages/Home'), {
  fallback: <Preloader />
});
const SuccessStudent = lazyLoading(() => import('./views/pages/SuccessStudents'), {
  fallback: <SuccessStudentSkeleton />
});
const NextStep = lazyLoading(() => import('./views/pages/NextStep'), {
  fallback: <Preloader />
});
const Bookmark = lazyLoading(() => import('./views/pages/Bookmark'), {
  fallback: <Preloader />
});
const TokenCheck = lazyLoading(() => import('./views/pages/TokenCheck'), {
  fallback: <Preloader />
});
const Notification = lazyLoading(() => import('./views/pages/Notification'), {
  fallback: <Preloader />
});
const Announcements = lazyLoading(() => import('./views/pages/Announcements'), {
  fallback: <Preloader />
});
const Announcement = lazyLoading(() => import('./views/pages/Announcement'), {
  fallback: <Preloader />
});

const Page404 = lazyLoading(() => import('./views/pages/page404/Page404'), {
  fallback: <Preloader />
});
const Page500 = lazyLoading(() => import('./views/pages/page500/Page500'), {
  fallback: <Preloader />
});
const PaymentSuccess = lazyLoading(() => import('./views/pages/PaymentStatus/Success.js'), {
  fallback: <Preloader />
});
const PaymentFailed = lazyLoading(() => import('./views/pages/PaymentStatus/Failed'), {
  fallback: <Preloader />
});
const LeaderBoard = lazyLoading(() => import('./views/pages/LeaderBoard'), {
  fallback: <Preloader />
});

const StudentAnalytics = lazyLoading(() => import('./views/pages/Student/StudentAnalytics.js'), {
  fallback: <Preloader />
});



const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    momentTz.tz.setDefault("Asia/Dhaka");
    fetch(process.env.REACT_APP_API_URL + 'server-time')
      .then(res => res.json())
      .then(data => {
        moment.locale('de');
        moment(data.currentTime).fromNow();
      })

    // Smartlook init for Production only

    if (process.env.REACT_APP_ENABLE_SMART_LOOK === 'true') {
      //   smartlookClient.init('e326099826dea9489acf0862907256699e8956eb')

      // Google analytics
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-8FEQB6FFXY";
      script.async = false;
      document.body.appendChild(script);
      const script2 = document.createElement("script");
      script2.src = "/analytics.js";
      script2.async = false;
      document.body.appendChild(script2);
    }

    // Load Cart from localStorage on Reload and set to redux state
    let oldCart = cartService.getCartFromLocalStorage(authService.getCurrentUser()?.user?._id || 'anonymous')
    // Hardcoded - Remove expired course from cart
    oldCart = oldCart.filter(course => course._id !== '5fd091dbfee6ae524d044150')
    cartService.updateCartToLocalStorage(authService.getCurrentUser()?.user?._id || 'anonymous', oldCart)
    dispatch(loadCartFromLocalStorage(oldCart))
    if (authService.getCurrentUser()?.success) {
      if (authService.getCurrentUser().user.role === "student" || authService.getCurrentUser().user.role === "tester") {
        dispatch(loadGem())
      }
      // Get user data on reload and set to redux state
      userService.getLoggedUserInfo()
        .then(response => {
          fcmService.getToken();          
          dispatch(loadClientRoutes(response?.data?.data?.clientRoute))
          dispatch(userData({ ...authService.getCurrentUser().user, ...response.data.data, role: authService.getCurrentUser().user.role }))
          
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            dispatch(clearUserData())
            authService.logout(false);
          }
        })
    } else {
      // If User is not signed in then clear user data from Redux state 
      dispatch(clearUserData());

    }
    // Store Footer Data in reload
    homeCmsService.getFooterInfo()
      .then(res => {
        dispatch(storeFooterData(res.data.data))
      })
      .catch(err => { })


  }, [dispatch])

  const [submittedCriteriaList, setSubmittedCriteriaList] = useLocalStorage('submittedCriteriaList', []);

  const { data: activeForms } = useQuery(['open-general-form-criteria', submittedCriteriaList],
    () => formService.getActiveGeneralFormCriteria({ submittedCriteriaList }),
    {
      staleTime: 1000 * 60 * 60,
      select: (res) => res?.data?.data?.data,
      enabled: authService.getCurrentUser()?.user?.role === "student" || authService.getCurrentUser()?.user?.role === undefined
    }
  )


  return (
    <Router>
      <MasterLayout>
          <Switch>
            {/* *** Comment: "name" props are used to pass page title on each page component **** */}

            {/* ====== Protected Route ======== */}
            <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard} />
            <PrivateRoute path="/announcements" name="Announcements" component={Announcements} />
            <PrivateRoute path="/notification/:id" name="Notifications" component={Notification} />
            <PrivateRoute path="/announcement/:id" name="Notifications" component={Announcement} />
            <PrivateRoute path="/profile" name="Profile" component={StudentProfile} />
            <Route exact path="/course-details/:id" name="Course Details" component={CourseDetails} />
            <PrivateRoute exact path="/leader-board" name="Leader Board" component={LeaderBoard} />
            <PrivateRoute exact path="/student-analytics" name="Student Analytics" component={StudentAnalytics} />
            <PrivateRoute exact path="/conceptual-session" name="conceptual session" component={ConceptualSession} />

            <PrivateRoute exact path="/checkout" name="Checkout" component={Checkout} />
            <PrivateRoute exact path="/course-summery/:courseId" name="Course Summary" component={CourseSummery} />
           
            {/* Course Content */}
            <PrivateRoute exact path="/:course/video/:id" name="Module Detail" component={ModuleDetail} />
            <PrivateRoute exact path="/:course/quiz-question/:id" name="Quiz" component={QuizQuestion} />
            <PrivateRoute exact path="/:course/quiz/:id" name="Quiz" component={Quiz} />
            <PrivateRoute exact path="/:course/quiz-result/:id" name="Quiz Result" component={QuizResult} />
            <PrivateRoute exact path="/:course/assignment/:id" name="Assignment" component={Assignment} />
            <PrivateRoute exact path="/:course/teamAssignment/:id" name="Assignment" component={TeamAssignment} />
            <PrivateRoute exact path="/:course/assignment-submitted/:id" name="Assignment Result" component={AssignmentSubmitted} />
            <PrivateRoute exact path="/:course/assignment-resubmit/:id" name="Assignment Resubmit" component={AssignmentResubmit} />
            <PrivateRoute exact path="/:course/Post/:id" name="Post" component={Post} />
            <PrivateRoute exact path="/:course/form/:id" name="Form" component={Form} />

            <PrivateRoute exact path="/:course/module-locked" name="Module Detail" component={ModuleLocked} />
            <PrivateRoute exact path="/internal-faq" name="Internal FAQ" component={InternalFaq} />

            {/* ======== Unprotected Routes ======== */}
            <Route path="/" render={props => <Home  {...props} />} exact />

            {/* Auth Routes */}
            <Route exact path="/login" render={props => <Login {...props} name="Login" />} />
            <Route exact path="/register" render={props => <Register {...props} name="Register" />} />
            <Route exact path="/forgot-password" render={props => <ForgotPassword {...props} name="Forgot Password" />} />
            <Route exact path="/token-check" render={props => <TokenCheck {...props} name="Token Check" />} />
            <Route exact path="/reset-password" render={props => <ResetPassword {...props} name="Reset Password" />} />
            <Route path="/verify/:token" render={props => <EmailVerification {...props} name="Email Verification" />} />
            <Route path="/resent-verification-email" render={props => <ResendVerificationEmail {...props} name="Email Verification" />} />
            
            {/* SSL Commerce redirected Routes */}
            <Route exact path="/payment-failure" render={props => <PaymentFailed {...props} name="Payment Successful" />} />
            <Route exact path="/payment-successful" render={props => <PaymentSuccess name="Payment Successful" {...props} />} />

            {/* Static pages */}
            <Route exact path="/terms-of-service" render={props => <TermsOfService {...props} name="Terms of Service" />} />
            <Route exact path="/refund-policy" render={props => <StaticPage {...props} type="refund" name="Refund Policy" />} />
            <Route exact path="/privacy-policy" render={props => <StaticPage {...props} type="privacyPolicy" name="Privacy Policy" />} />
            <Route exact path="/faq" render={props => <Faq {...props} name="FAQ" />} />
            <Route exact path="/about-us" render={props => <AboutUs {...props} name="About" />} />
            <Route exact path="/success" render={props => <SuccessStudent {...props} name="Successful Students" />} />
            <PrivateRoute path="/instructor-dashboard" name="Module Detail" component={InstructorDashboard} />

            <PrivateRoute path="/job-dashboard" name="Job Portal" component={JobPortalDashBoard} />
            <PrivateRoute exact path="/next-step" name="Next Steps" component={NextStep} />
            <PrivateRoute exact path="/bookmark" name="Bookmark" component={Bookmark} />

            {/* Else/Notfound */}
            <Route exact path="/500" render={props => <Page500 {...props} name="Page 500" />} />
            <Route path="*" render={props => <Page404 {...props} name="Page 404" />} />
          </Switch>
      </MasterLayout>
      <GeneralForm
        submittedCriteriaList={submittedCriteriaList}
        setSubmittedCriteriaList={setSubmittedCriteriaList}
        activeForms={activeForms}
      />

    </Router>
  );

}


export default App;
