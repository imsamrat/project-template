import React, { useState, useEffect } from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import regex from "../../../utilities/regex";
import AuthService from "../../../services/authService";
import CustomDialog from "../../Custom/CustomDialog";
import emailSuccessIcon from '../../../assets/icons/success-email.png';
import emailFailIcon from '../../../assets/icons/fail-email.png';
import { useDispatch } from "react-redux";
import userService from "../../../services/Admin/UserManagement/userService";
import { clearUserData, userData } from "../../../actions/userAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { clearCart, loadCartFromLocalStorage } from "../../../actions/cartAction";
import authService from "../../../services/authService";
import cartService from "../../../services/cartService";
import { loadGem } from "../../../actions/gemAction";
import { loadClientRoutes } from "../../../actions/clientRouteAction";
import fcmService from "../../../services/Admin/Fcm/fcmService";
import angelDownIcon from "../../../assets/images/authentication/rigister/arrow-ios-downward.png";
import checkEmailImg from "../../../assets/images/authentication/chekmail.png";



const LoginRegisterForm = (props) => {
    const dispatch = useDispatch();
    const { search } = useParams();
    const [isDisable, setIsDisable] = useState(false);
    const { register, handleSubmit, watch, errors, setValue, reset } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const [status, setStatus] = useState({ message: null, error: false, icon: null });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickClose = () => {
        setOpenDialog(false);
    }


    const onSubmit = (data) => {
        data.email = data.email?.toLowerCase()?.trim();
        setIsDisable(true);
        if (props.label === "Login") {
            AuthService.login(data.email, data.password)

                .then((response) => {
                    return userService.getLoggedUserInfo()
                })
                .then(async response => {
                    dispatch(loadGem())
                    dispatch(loadClientRoutes(response?.data?.data?.clientRoute))
                    dispatch(userData({ ...authService.getCurrentUser().user, ...response.data.data, role: authService.getCurrentUser().user.role }))
                    const currentUser = await authService.getCurrentUser()?.user?._id
                    const oldCart = await cartService.getCartFromLocalStorage(currentUser)
                    const anonymous = await localStorage.getItem("anonymous");

                    if (response.data.data?.role === "jpi") {
                        props.history.push("/job-dashboard");
                    }
                    // if already purchased
                    let alreadyPurchase = false;

                    if (anonymous && response.data.data?.role === "student") {
                        JSON.parse(anonymous).forEach(element => {
                            response.data.data.parchasedCourse.forEach(eachPurchase => {
                                if (element?._id === eachPurchase?.courseId?._id) {
                                    alreadyPurchase = true;
                                }
                            })
                        });

                        if (response.data.data?.lastOrdered === "pending") {
                            dispatch(clearCart())
                        }

                        else if (!alreadyPurchase) {
                            localStorage.setItem(currentUser, anonymous);
                        }

                        else {
                            dispatch(clearCart())
                        }
                        localStorage.removeItem("anonymous");
                        return { alreadyPurchase, user: response?.data?.data?.lastOrdered };
                    }
                    else {
                        dispatch(loadCartFromLocalStorage(oldCart));
                        return { alreadyPurchase: true, user: response?.data?.data?.lastOrdered };
                    }

                })
                .then(
                    (finalRepsonse) => {
                        fcmService.getToken();
                        if (finalRepsonse?.user === "pending" || finalRepsonse?.user === "rejected") {
                            // if last order is pending or rejected go to checkout
                            props.history.push("/checkout");
                            return;
                        }

                        // if cart course is already purchased
                        props.history.push(finalRepsonse?.alreadyPurchase ? "/dashboard" : props?.redirect);
                        setIsDisable(false);
                    }
                )
                .catch(err => {
                    setIsDisable(false);
                    setStatus({
                        error: true,
                        message: err?.response?.data?.msg || err?.message || "Something went wrong",
                        icon: emailFailIcon
                    })
                })
        } else if (props.label === "Register") {
            if (props?.redirect) {
                data.redirect = "formEnrollNow";
                AuthService.register({
                    fullName: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    hearAboutUs: data?.hearAboutUs,
                    redirect: data.redirect,
                })
                    .then(() => userService.getLoggedUserInfo())
                    .then(async response => {
                        dispatch(userData({ ...authService.getCurrentUser().user, ...response.data.data, role: authService.getCurrentUser().user.role }))
                        const currentUser = await authService.getCurrentUser()?.user?._id
                        const oldCart = await cartService.getCartFromLocalStorage(currentUser)
                        const anonymous = localStorage.getItem("anonymous");
                        if (anonymous) {
                            localStorage.setItem(currentUser, anonymous);
                            localStorage.removeItem("anonymous");
                        }
                        else {
                            dispatch(loadCartFromLocalStorage(oldCart));
                        }
                    })
                    .then(
                        () => {
                            fcmService.getToken();
                            setIsDisable(false);
                            if (props?.redirect) {
                                props.history.push(props?.redirect);
                            }
                        }

                    )
                    .catch(err => {
                        setIsDisable(false);
                        setStatus({
                            error: true,
                            message: err?.response?.data?.msg || "Something went wrong",
                            icon: emailFailIcon
                        })
                    })
            }
            else {
                AuthService.register({
                    fullName: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    hearAboutUs: data?.hearAboutUs
                }).then(
                    response => {
                        document.getElementById("authForm").reset();

                        setOpenDialog(true);
                        setIsDisable(false);
                        fcmService.getToken();
                        setStatus({
                            error: false,
                            message: "We have sent you a confirmation link to your email",
                            icon: emailSuccessIcon
                        })
                    },
                    error => {
                        if (error.response.data.msg) {
                            setIsDisable(false);
                            setStatus({
                                error: true,
                                message: error?.response?.data?.msg?.length ? error?.response?.data?.msg : "Something went wrong!",
                                icon: emailFailIcon
                            })
                        }
                    }
                )
                    .catch(err => {
                        setOpenDialog(true);
                        setIsDisable(false);
                        setStatus({
                            error: false,
                            message: "An error occurred while sending activation mail. Please fillup the sign-up form again.!",
                            icon: emailFailIcon
                        })
                    })

            }
        }
    }


    return (

        <form id="authForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="auth-form py-4 py-md-5 px-3 px-sm-4 px-lg-5 mr-lg-0 mt-4 bg-white">

            {
                props.easyCheckout ?
                    ""
                    :
                    <div className="login-reg-title">

                        {
                            props.label === "Login" ?
                                <div className="pb-3">
                                    <h2>Welcome Back</h2>
                                    {/* <p className="responsive-title-text">please enter your Credential to log in </p> */}
                                </div>
                                :
                                <div>
                                    <h2>Hello There,</h2>
                                    <p>Register now to explore more</p>
                                </div>
                        }

                    </div>
            }

            {
                status?.error &&
                <p className="text-danger py-2">
                    {typeof status?.message === 'string' && status?.message}
                </p>
            }
            {props.label === "Register" &&
                <div className="form-group">
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input placeholder="Name" id="name" name="name" type="text" className="form-control" ref={register({ required: true })} />
                    {errors.name && <span className="text-danger">Name is required</span>}
                </div>
            }
            <div className="form-group">
                <label className="sr-only" htmlFor="username">Email </label>
                <input placeholder="Email" onBlur={e => setValue("email", watch("email")?.trim())} id="email" name="email" type="email" className="form-control" ref={register({ required: true, pattern: regex.email })} autoComplete="username" />
                {errors.email &&
                    <span className="text-danger">
                        {errors.email.type === "pattern" ? "Valid email required!" : "Email is Required!"}
                    </span>
                }
            </div>
            {props.label === "Register" &&
                <div className="form-group">
                    <label className="sr-only" htmlFor="phone">Phone No.</label>
                    <input placeholder="Phone No" id="phone" name="phone" type="tel" className="form-control" ref={register({ required: true, pattern: regex.phone })} autocomplete="chrome-off" />
                    {errors.phone &&
                        <span className="text-danger">
                            {errors.phone.type === "pattern" ? "Valid phone number required!" : "Phone number is Required!"}
                        </span>
                    }

                </div>
            }
            <div className="form-group password-box">
                <label className="sr-only" htmlFor="email">Password</label>
                <input id="password" placeholder="Password" name="password" type={showPassword ? 'text' : 'password'} className="form-control" ref={register({ required: true })} />
                <button className="btn show-pass" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {watch("password") ?
                    <span className="text-danger">
                        {!regex.password.test(watch("password")) &&
                            (props.label === "Register" &&
                                "Password should contain at least 6 character!"
                            )
                        }
                    </span>
                    :
                    errors.password &&
                    <span className="text-danger">
                        {errors.password && "Password is required!"}
                    </span>

                }
            </div>
            
            {props.label === "Register" &&
                <div className="form-group password-box ">
                    <p>How did you first hear about us? (Optional)</p>

                    <div className="selection">
                        <img className="option-icon" src={angelDownIcon} alt="" />
                        <select defaultValue={''} name="hearAboutUs" id="" className="form-control p-0 optional-fields" ref={register()}>
                            <option disabled hidden value="">Select an option</option>
                            <option value="Someone Recommended Me">Someone Recommended Me</option>
                            <option value="Programming Hero Student">Programming Hero Student</option>
                            <option value="Programming Hero community fb group">Programming Hero community fb group</option>
                            <option value="Young Coders fb group">Young Coders fb group</option>
                            <option value="Jhankar Mahbub Youtube">Jhankar Mahbub Youtube</option>
                            <option value="Jhankar Mahbub Facebook">Jhankar Mahbub Facebook</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
            }

            {props.label === "Login" &&
                <div className="form-group d-flex justify-content-between">

                    <div className="form-check">
                        <div className="d-flex  align-items-center">
                            <input className="form-check-input" type="checkbox" id="rememberCheck" name="remember" />
                            <label className="form-check-label text-muted ml-lg-3 ml-1 mt-lg-0 mt-1 remmber-text " htmlFor="rememberCheck"> Remember Me</label>
                        </div>
                    </div>
                    <div className="mr-2 mt-lg-0 mt-1">
                        <Link className="font-weight-bold text-underline remmber-text " to={"/forgot-password"}>Forgot Password</Link>
                    </div>

                </div>
            }

            {props.label === "Register" && (
                <>
                    <div className="form-group">
                        <div className="form-check">
                            <div className="d-flex align-items-start">
                                <input className="form-check-input mt-1" type="checkbox" id="agree" name="agree" ref={register({ required: true })} />
                                <label className="form-check-label text-muted ml-1" htmlFor="agree">
                                    I agree to<Link to={"/terms-of-service"} className="text-danger m-0 ml-2"><span className="terms-text">Terms and conditions,</span></Link>
                                    <div>
                                        <Link to={"/refund-policy"} className="text-danger m-0"><span className="terms-text">Refund policy</span></Link> &amp;
                                        <Link to={"/privacy-policy"} className="text-danger m-0 ml-2"><span className="terms-text">Privacy Policy</span></Link>
                                    </div>

                                </label>

                            </div>
                        </div>
                    </div>
                    {errors.agree &&
                        <span className="text-danger">
                            You have to agree with our terms and conditions!
                        </span>
                    }
                </>

            )
            }
            <div className="form-group pt-3">

                <button disabled={isDisable} type="submit" className="btn login-btn ">
                    {
                        isDisable ?
                            <img src={require('../../../assets/images/processing.gif')} alt="Loading ..." />
                            :
                            <span>{
                                props.label === 'Login' ?
                                    <span>Log in</span>
                                    :
                                    <span>Register</span>
                            }</span>
                    }
                </button>

                <div className="form-group">
                    {
                        props.label === "Login" ?
                            <div className="mt-3 text-center">
                                <p className="resposive-text">Don’t have a account? <span className="text-underline"><Link to="/register"><span className="resposive-text">Register now</span></Link></span></p>
                            </div>
                            :
                            <div className="mt-3 text-center">
                                <p className="resposive-text">Already have a account? <span className="text-underline"><Link to="/login"><span className="resposive-text">Log in </span></Link></span></p>
                            </div>
                    }
                </div>
            </div>


            <div>
                <CustomDialog
                    openDialog={openDialog}
                    handleClickClose={handleClickClose}
                >
                    <div className="text-center border py-5 px-3 px-md-5">
                        <img src={checkEmailImg} className="img-fluid" alt="" />
                        <p style={{ color: '#343c97', fontSize: 'calc(1vmax + 10px)', }} className="mt-5">Check your mail</p>
                        <p style={{ color: '#454545', fontSize: 'calc(.5vmax + 7px)' }} className="mt-2">{typeof status?.message === 'string' && status?.message}</p>
                    </div>
                </CustomDialog>
            </div>

        </form>

    )
}

export default withRouter(LoginRegisterForm);