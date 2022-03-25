import React, { useEffect, useState } from "react";
import Logo from "../Common/Logo";
import { Link, useLocation, useHistory } from "react-router-dom";
import avatar from "../../assets/images/profileImage.png";
import authService from "../../services/authService";
import { NavDropdown } from "react-bootstrap";
import bookmarkIcon from './../../assets/icons/homepage/profile-dropdown/bookmark.svg';
import analyticsIcon from './../../assets/icons/homepage/profile-dropdown/analytics.svg';
import announcementIcon from './../../assets/icons/homepage/profile-dropdown/announcement.svg';
import conceptualIcon from './../../assets/icons/homepage/profile-dropdown/conceptual-session.svg';
import leaderBoardIcon from './../../assets/icons/homepage/profile-dropdown/leaderboard.svg';
import logoutIcon from './../../assets/icons/homepage/profile-dropdown/logout.svg';
import { useDispatch, useSelector } from "react-redux";
import CartPreview from "./CartPreview";
import NotificationPreview from "./NotificationPreview";
import firebase from "../../utilities/firebase/firebase";
import moment from "moment";
import preFetchPage from "../../utilities/preFetchPage";
import cartService from "../../services/cartService";
import { loadCartFromLocalStorage } from "../../actions/cartAction";
import LiveSession from "../LiveSession/LiveSession";

import getImage from "../../utilities/getImage";
import { useQuery } from "react-query";
import courseService from "../../services/Admin/CourseManagement/courseService";
import RoundedButton from "./RoundedButton";

// Header component
const Header = () => {
  let { pathname } = useLocation();
  const history = useHistory();
  const [today, setToday] = useState(moment().toISOString());
  const dispatch = useDispatch();

  useEffect(() => {
    let timeInterval = setInterval(() => {
      setToday(moment().toISOString());
    }, 45000);

    return () => clearInterval(timeInterval);
  }, []);

  const userData = useSelector((state) => state.user).data || {
    profileImage: "",
  };

  const cartData = useSelector((state) => {
    const validCart = state?.cart?.filter(
      (course) =>
        course.registrationStartDate <= today &&
        course.registrationEndDate >= today
    );

    return validCart;
  });
  useEffect(() => {
    if (userData?._id) {
      cartService.updateCartToLocalStorage(userData?._id, cartData);
      dispatch(loadCartFromLocalStorage(cartData));
    }
  }, [cartData?.length, userData?._id]);

  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setNotifications] = useState(false);

  const [headerPosition, setHeaderPosition] = useState(false);
  const [isCollapsed, setCollapsed] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const { data: supportAvailableCourses } = useQuery(
    "coursesForStudentSupportSession",
    () =>
      courseService.getCourses({
        portal: "student-portal",
        feature: "supportSession",
      }),
    {
      staleTime: 1000 * 60 * 60 * 12,
      select: res => res?.data?.data,
      enabled: !!userData?.parchasedCourse?.length
    }
  );
  const handleClick = (event, path) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const redirect_url = params.get("redirect_url");
    if (redirect_url?.length > 0) {
      history.push({
        pathname: path,
        search: "?redirect_url=/checkout",
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  };

  const handleNotificationClick = () => {
    if (showNotifications === false) {
      const userNotificationHistory = firebase
        .firestore()
        .collection("userNotificationHistory")
        .doc(userData?._id);
      userNotificationHistory.set({
        userId: userData?._id,
        lastWatch: moment().unix() * 1000,
      });
    }
    setNotifications(!showNotifications);
  };

  useEffect(() => {
    if (userData?.email && userData?.role === "student") {
      let courseId = [];
      userData?.parchasedCourse && userData.parchasedCourse.forEach((element) => {
        if (element?.courseId?._id) {
          courseId.push(element?.courseId?._id);
        }
      });

      if (courseId?.length === 0) {
        courseId.push("unPurchase");
      }

      courseId.push("all");
      courseId.push(userData?._id);

      firebase
        .firestore()
        .collection("userNotificationHistory")
        .doc(userData?._id)
        .onSnapshot(function (doc) {
          const db = firebase.firestore().collection("notification");
          db.where("topic", "array-contains-any", courseId)
            .where("time", ">", doc.data()?.lastWatch || 0)
            .onSnapshot(
              function (querySnapshot) {
                setNotificationCount(querySnapshot?.size);
              },
              function (error) {
                console.log("error", error);
              }
            );
        });
    }
  }, [userData?.email]);

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;

    window.addEventListener("scroll", () => {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        if (window.scrollY > 85) {
          setHeaderPosition("sticky");
        } else {
          setHeaderPosition("static");
        }
      } else {
        setHeaderPosition("hidden");
      }
      if (
        pathname.includes("/video") &&
        currentScrollPos > 140 &&
        currentScrollPos < 180
      ) {
        setHeaderPosition("hidden");
      }
      prevScrollpos = currentScrollPos;
    });
  }, [window.pageYOffset]);


  useEffect(() => {
    if (cartData?.length && pathname.includes("/dashboard")) {
      setShowCart(true);
    }
  }, [cartData?.length]);
  useEffect(() => {
    setCollapsed(null)
    setShowCart(false);
  }, [pathname]);

  return (
    <nav
      style={{ backgroundColor: pathname === '/dashboard' && '#fff' }}
      className={
        headerPosition === "hidden"
          ? "home-nav slide in show nav-hidden navbar navbar-expand-md sticky-bg navbar-dark text-center fixed-top"
          : pathname !== "/" &&
            pathname !== "/login" &&
            pathname !== "/faq" &&
            pathname !== "/internal-faq" &&
            pathname !== "/register" &&
            !pathname.startsWith("/reset-password")
            ? "home-nav slide in show header-border navbar navbar-expand-md sticky-bg navbar-dark text-center fixed-top"
            : headerPosition === "sticky" || isCollapsed
              ? "home-nav slide in show shadow navbar navbar-expand-md sticky-bg navbar-dark text-center fixed-top"
              : "home-nav slide out show navbar navbar-expand-md navbar-dark py-2 fixed-top text-center "
      }
    >
      <div className="container">
        <Logo />
        <button
          onClick={() => setCollapsed(!isCollapsed ? "show" : null)}
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars nav-toggler-icon"></i>
        </button>
        <div
          className={
            !isCollapsed
              ? "collapse navbar-collapse"
              : "show collapse navbar-collapse"
          }
          id="collapsibleNavId"
        >
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 align-items-center">
            {userData.role ? (
              <>
                {!!userData?.parchasedCourse?.length &&
                  userData?.parchasedCourse?.find((course) =>
                    supportAvailableCourses?.find((sc) => sc?._id === course?.courseId?._id)
                  ) && (
                    <li className="nav-item">
                      <LiveSession />
                    </li>
                  )}

                <li className="nav-item dropdown">
                  {userData.role === "student" && (
                    <>
                      <Link
                        onMouseEnter={() => preFetchPage("dashboard")}
                        className={`nav-link navbar-link ${pathname === '/dashboard' && 'active-nav'}`}
                        to="/dashboard"
                      >
                        My Classes
                      </Link>
                    </>
                  )}
                  {userData.role !== "student" && (
                    <Link
                      onMouseEnter={() => preFetchPage("dashboard")}
                      className={`nav-link navbar-link ${pathname === '/dashboard' && 'active-nav'}`}
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  )}
                </li>

                {userData.role === "student" && (
                  <>
                    <NavDropdown
                      show={showNotifications}
                      onToggle={() => handleNotificationClick()}
                      title={
                        <>
                          <svg className="navbar-link" width="20" height="22" viewBox="0 0 24 27" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7295 16.8858L21.2308 14.3871V11.0769C21.2279 8.78939 20.3769 6.58417 18.8424 4.88768C17.3079 3.19118 15.1989 2.12394 12.9231 1.89231V0H11.0769V1.89231C8.80114 2.12394 6.69209 3.19118 5.15757 4.88768C3.62306 6.58417 2.77209 8.78939 2.76923 11.0769V14.3871L0.270462 16.8858C0.097339 17.0589 5.22807e-05 17.2937 0 17.5385V20.3077C0 20.5525 0.0972524 20.7873 0.270363 20.9604C0.443473 21.1335 0.678262 21.2308 0.923077 21.2308H7.38462V21.948C7.36454 23.119 7.7773 24.2563 8.5438 25.1419C9.3103 26.0275 10.3766 26.599 11.5385 26.7471C12.1802 26.8107 12.8281 26.7393 13.4405 26.5375C14.053 26.3357 14.6164 26.008 15.0946 25.5753C15.5728 25.1427 15.9552 24.6148 16.2171 24.0255C16.479 23.4363 16.6147 22.7987 16.6154 22.1538V21.2308H23.0769C23.3217 21.2308 23.5565 21.1335 23.7296 20.9604C23.9027 20.7873 24 20.5525 24 20.3077V17.5385C23.9999 17.2937 23.9027 17.0589 23.7295 16.8858ZM14.7692 22.1538C14.7692 22.8883 14.4775 23.5927 13.9581 24.112C13.4388 24.6313 12.7344 24.9231 12 24.9231C11.2656 24.9231 10.5612 24.6313 10.0419 24.112C9.52253 23.5927 9.23077 22.8883 9.23077 22.1538V21.2308H14.7692V22.1538ZM22.1538 19.3846H1.84615V17.9206L4.34492 15.4218C4.51805 15.2488 4.61533 15.014 4.61538 14.7692V11.0769C4.61538 9.1184 5.3934 7.2401 6.77829 5.85521C8.16317 4.47033 10.0415 3.69231 12 3.69231C13.9585 3.69231 15.8368 4.47033 17.2217 5.85521C18.6066 7.2401 19.3846 9.1184 19.3846 11.0769V14.7692C19.3847 15.014 19.482 15.2488 19.6551 15.4218L22.1538 17.9206V19.3846Z" fill="#575757" />
                          </svg>
                          {notificationCount > 0 &&
                            <span className="badge cartAmount">
                              {notificationCount}
                            </span>}
                        </>
                      }
                      id="notification-dropdown"
                    >
                      <div className="d-block no-item">
                        <NotificationPreview
                          onHeader
                          notificationToggle={showNotifications}
                        />
                      </div>
                    </NavDropdown>
                  </>
                )}

                {userData.role === "student" && (
                  <NavDropdown
                    onMouseEnter={() => preFetchPage("checkout")}
                    show={showCart}
                    onToggle={() => setShowCart(!showCart)}
                    title={
                      <>
                        <span>
                          <svg className="navbar-link" width="20" height="18" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.8117 2.19022C23.7388 2.1003 23.6469 2.02766 23.5425 1.97752C23.4382 1.92737 23.324 1.90097 23.2082 1.9002H6.88919L7.39867 3.46783H22.1814L20.0886 12.8736H8.3314L4.74937 1.53181C4.71063 1.41146 4.64334 1.30227 4.55326 1.21356C4.46318 1.12484 4.35298 1.05924 4.23205 1.02233L1.01841 0.0347255C0.919599 0.0043606 0.815772 -0.00624396 0.712858 0.00351725C0.609945 0.0132785 0.509963 0.0432143 0.418619 0.0916156C0.234142 0.189367 0.0960515 0.356397 0.0347267 0.555963C-0.0265981 0.755528 -0.00613407 0.971281 0.0916168 1.15576C0.189368 1.34024 0.356398 1.47833 0.555964 1.53965L3.36986 2.40185L6.96757 13.7672L5.68211 14.8175L5.58022 14.9194C5.26225 15.2858 5.08202 15.7516 5.07058 16.2366C5.05913 16.7217 5.21718 17.1955 5.51751 17.5765C5.73115 17.8363 6.00262 18.0425 6.31021 18.1786C6.61781 18.3147 6.95298 18.3769 7.28893 18.3603H20.3708C20.5787 18.3603 20.778 18.2777 20.925 18.1307C21.072 17.9837 21.1546 17.7844 21.1546 17.5765C21.1546 17.3686 21.072 17.1693 20.925 17.0223C20.778 16.8753 20.5787 16.7927 20.3708 16.7927H7.16352C7.07326 16.7896 6.98532 16.7633 6.9082 16.7163C6.83108 16.6693 6.76737 16.6032 6.72325 16.5244C6.67912 16.4456 6.65606 16.3568 6.6563 16.2665C6.65653 16.1762 6.68005 16.0874 6.72459 16.0089L8.61358 14.4412H20.7157C20.8969 14.4457 21.074 14.3872 21.2169 14.2757C21.3598 14.1642 21.4597 14.0067 21.4995 13.8299L23.9842 2.85646C24.008 2.73961 24.0049 2.61885 23.975 2.5034C23.9451 2.38795 23.8893 2.28083 23.8117 2.19022Z" fill="#575757" />
                          </svg>
                        </span>
                        <span className="badge cartAmountBadge">
                          {cartData?.length > 0 && cartData?.length}
                        </span>
                      </>
                    }
                    id="basic-nav-dropdown"
                  >
                    <div className="d-block p-2 px-3 no-item">
                      <CartPreview onHeader />
                    </div>
                  </NavDropdown>
                )}
                <NavDropdown
                  title={
                    <img
                      className="avatar"
                      src={
                        userData?.profileImage?.includes("profileImage.png") ||
                          !userData.profileImage
                          ? avatar
                          : getImage(userData.profileImage)
                      }
                      alt="avatar"
                    />
                  }
                  className="profile-picture-wrapper"
                  id="profile"
                >
                  <div
                    onMouseEnter={() => preFetchPage("profile")}
                    className="text-center mr-3 d-flex justify-content-between align-items-center px-2 no-item"
                    style={{ minWidth: 250 }}
                  >
                    <img
                      className="avatar"
                      src={
                        userData?.profileImage?.includes("profileImage.png") ||
                          !userData.profileImage
                          ? avatar
                          : getImage(userData.profileImage)
                      }
                      alt="avatar"
                      style={{ width: "70px", height: "70px" }}
                    />
                    <div className="pr-2">
                      <p className="text-dark mb-0">{userData.fullName}</p>
                      {/* <small className="text-dark d-inline-block mb-2">Student ID: {userData.roll || 'N/A'}</small> */}
                      <Link to="/profile" style={{ color: '#92559D' }}>
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <NavDropdown.Divider />

                  {!!userData?.parchasedCourse?.length && (
                    <NavDropdown.Item>
                      <Link to="/bookmark" className="my-2">
                        <img src={bookmarkIcon} alt="" />
                        <span className="ml-2">Bookmark</span>
                      </Link>
                    </NavDropdown.Item>
                  )}
                  {/* {!!userData?.parchasedCourse?.length && (
                    <NavDropdown.Item>
                      <Link
                        onMouseEnter={() => preFetchPage("leaderBoard")}
                        to="/student-analytics"
                        className="my-2"
                      >
                        <img src={analyticsIcon} alt="" />
                        <span className="ml-2">Student Analytics</span>
                      </Link>
                    </NavDropdown.Item>
                  )} */}
                  {/* {!!userData?.parchasedCourse?.length && (
                    <NavDropdown.Item>
                      <Link
                        className="my-2"
                        onMouseEnter={() => preFetchPage("leaderBoard")}
                        to="/leader-board"
                      >
                        <img src={leaderBoardIcon} alt="" />
                        <span className="ml-2">Leader Board</span>
                      </Link>
                    </NavDropdown.Item>
                  )} */}

                  {!!userData?.parchasedCourse?.length && (
                    <NavDropdown.Item>
                      <Link
                        className="my-2"
                        onMouseEnter={() => preFetchPage("announcement")}
                        to="/announcements"
                      >
                        <img src={announcementIcon} alt="" />
                        <span className="ml-2">Announcement</span>
                      </Link>
                    </NavDropdown.Item>
                  )}
                  {/* {!!userData?.parchasedCourse?.length && (
                    <NavDropdown.Item>
                      <Link
                        className="my-2"
                        onMouseEnter={() => preFetchPage("leaderBoard")}
                        to="/conceptual-session"
                      >
                        <img src={conceptualIcon} alt="" />
                        <span className="ml-2">Conceptual Sessions</span>
                      </Link>
                    </NavDropdown.Item>
                  )} */}

                  <NavDropdown.Item onClick={authService.logout}>
                    <Link
                      className="my-2"
                      onMouseEnter={() => preFetchPage("login")}
                      to="/login"
                    >
                      <img src={logoutIcon} alt="" />
                      <span className="ml-2">Logout</span>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                {/* <li className="nav-item">
                  <Link
                    onMouseEnter={() => preFetchPage("about")}
                    className={`nav-link navbar-link ${pathname='/about-us'&&'active-nav'}`}
                    to="/about-us"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onMouseEnter={() => preFetchPage("success")}
                    className={`nav-link navbar-link ${pathname='/success'&&'active-nav'}`}
                    to="/success"
                  >
                    Success
                  </Link>
                </li> */}
                <li
                  onMouseEnter={() => preFetchPage("login")}
                  className="nav-item dropdown"
                >
                  <Link
                    className={`nav-link`}
                    to="/login"
                  >
                    <RoundedButton variant="outlined" outlined>Log in</RoundedButton>

                  </Link>
                </li>

                <li
                  onMouseEnter={() => preFetchPage("register")}
                  className="dropdown"
                >
                  <Link
                    className={`nav-link`}
                    to="/register"
                  >
                    <RoundedButton variant="contained">Registration</RoundedButton>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
