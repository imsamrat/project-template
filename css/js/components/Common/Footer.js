import {
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faMinus,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../store";
import fbGroup from "../../assets/images/icons/facebook-group.gif";
import moment from "moment";
import preFetchPage from "../../utilities/preFetchPage";
import MessengerCustomerChat from "react-messenger-customer-chat";
import logoWhite from './../../assets/images/homepage/logo-white.png';
import paymentImg from './../../assets/images/homepage/payments.png';
// Footer Component
const Footer = () => {
  const {
    address,
    email,
    phone = "",
    phoneAvailable,
  } = useSelector((state) => state.footerData) || {};
  const phoneNumbers = phone?.split(",");

  return (
    <section className="footer-component pt-3 pl-3 pr-3 pb-4">
      <div className="container text-white">
        <div className="row py-4 mt-1">
          <div className="col-md-6 pr-md-0">
            <ul className="list-unstyled">
              <li className="mb-3">
                <img src={logoWhite} alt="" />
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>{" "}
                {address}
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>{" "}
                Official:{" "}
                <a className="text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                </span>{" "}
                Helpline :
                {phoneNumbers.map((phone, i, arr) => (
                  <React.Fragment key={i}>
                    {" "}
                    <a key={phone} className="text-white" href={`tel:${phone}`}>
                      {phone?.trim()}{" "}
                    </a>{" "}
                    {i !== arr.length - 1 && ","}{" "}
                  </React.Fragment>
                ))}
                <span style={{ width: "unset", fontSize: 14 }}>
                  (Available : {phoneAvailable})
                </span>{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-3 mt-md-5 footer-column">
            <ul className="list-unstyled">
              <li>
                <Link
                  onMouseEnter={() => preFetchPage("staticPage")}
                  className="text-white"
                  to="/refund-policy"
                >
                  {" "}
                  Refund policy{" "}
                </Link>
              </li>
              <li>
                <Link
                  onMouseEnter={() => preFetchPage("termsOfService")}
                  className="text-white"
                  to="/terms-of-service"
                >
                  {" "}
                  Terms and Conditions{" "}
                </Link>
              </li>
              <li>
                <Link
                  onMouseEnter={() => preFetchPage("staticPage")}
                  className="text-white"
                  to="/privacy-policy"
                >
                  {" "}
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mt-md-5 footer-column">
            <ul className="list-unstyled">
              <li>
                {/* <Link
                  onMouseEnter={() => preFetchPage("about")}
                  className="text-white"
                  to="/"
                > */}
                <a
                  href="https://web.programming-hero.com/about-us"
                  target="_blank"
                  className="text-white"
                  rel="noopener noreferrer"
                >
                  About us
                </a>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link
                  onMouseEnter={() => preFetchPage("success")}
                  className="text-white"
                  to="/"
                > */}
                Success
                {/* </Link> */}
              </li>
              <li className="mt-2">
                <ul className="list-inline social-icons">
                  <li className="list-inline-item">
                    <a
                      href="https://www.facebook.com/programmingherowebcourse"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.instagram.com/programminghero/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faInstagramSquare} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/company/programminghero/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.youtube.com/c/ProgrammingHeroCommunity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <img src={paymentImg} className="img-fluid mb-3" alt="" />
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4">

            <div className="text-center" style={{ color: "#CDCDCD" }}>
              <small>Copyright © {new Date().getFullYear()} Phitron.io</small>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="text-center text-md-right bin-id">
              <small style={{ color: "#FFF", fontWeight: 600 }}>Trade License: 177159</small>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Popup = () => {
  const [time, setNewTime] = useState(moment().format("HH"));
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state?.user?.data) || {};
  const {
    phoneAvailable,
    phone = "",
    showPhonePopup,
  } = useSelector((state) => state.footerData) || {};
  useEffect(() => {
    setNewTime(moment().format("HH"));
    setTimeout(() => {
      setShow(false);
    }, 30000);
  }, []);

  const phoneNumbers = phone?.split(",");
  return (
    <div>
      {((time >= 9 && time < 19) && showPhonePopup && !user?.parchasedCourse?.length && (!user?.role || user.role === 'student')) && (
        <div>
          <div className="contact-popup">
            {show && (
              <div className={show ? "body show" : "body"}>
                <div className="header">
                  <div className="close" onClick={() => setShow(!show)}>
                    <FontAwesomeIcon icon={faMinus} />
                  </div>
                </div>
                <img
                  className="popup-logo"
                  src={require("../../assets/images/black-logo.png")}
                  alt=""
                />
                <p className="help-tag">
                  তোমার কোনো হেল্প লাগলে আমাদেরকে জানাও!
                </p>
                <ul className="list-unstyled">
                  {phoneNumbers.map((number, i, arr) => (
                    <li key={Number}>
                      <a href={`tel:${number}`}>{number?.trim()}</a>
                      {i !== arr.length - 1 && <span>, </span>}
                    </li>
                  ))}
                </ul>
                <p>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  <span>Available : {phoneAvailable}</span>
                </p>
                <div className="text-left mt-2">
                  <a
                    target="_blank"
                    rel="norefferer"
                    href="https://web.facebook.com/groups/programmingherocommunity"
                  >
                    <img className="w-50 img-fluid" src={fbGroup} alt="..." />
                  </a>
                </div>
              </div>
            )}
            <div className="icon" onClick={() => setShow(!show)}>
              <img
                src={require("../../assets/images/icons/call.png")}
                alt="..."
              />
            </div>
            {!show && (
              <div
                className="icon-alt d-block d-md-none"
                onClick={() => setShow(!show)}
              >
                <img
                  src={require("../../assets/images/icons/call.png")}
                  alt="..."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {((!(time >= 9 && time < 19) || !showPhonePopup) && !user?.parchasedCourse?.length && (!user?.role || user.role === 'student')) && (
        <div>
          <MessengerCustomerChat
            pageId="101232889184593"
          // appId="<APP_ID>"
          // htmlRef="<REF_STRING>"
          />
        </div>
      )}
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  document.getElementById("contact-root")
);

export default Footer;
