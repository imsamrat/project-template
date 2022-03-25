import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

import { userData } from "../../actions/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearCart, removeFromCart } from '../../actions/cartAction';
import emptyCartIcon from '../../assets/images/homepage/empty-cart.png';
import bkashQRCode from '../../assets/images/bkash-qr-code.tiff'
import user from '../../reducer/user';

import thumbnail from '../../assets/images/payment-thumbnail.png'
import authService from '../../services/authService';

import cartService from '../../services/cartService';
import paymentService from '../../services/paymentService';
import ToasterNotification from '../Custom/ToasterNotification';
import { loadStripe } from "@stripe/stripe-js";
import Image from 'material-ui-image';
import ModalVideo from 'react-modal-video';
import swal from 'sweetalert';
import moment from 'moment'
import playButton from '../../animations/play-button.json'
import LottieAnimation from './Lottie';
import getImage from '../../utilities/getImage';
import CustomButton from '../Custom/CustomButton';
// import BkashPayment from "../BkashPayment/bkashPayment";

// Cart Preview
const CartPreview = (props) => {
    const [bKashConfig, setBkashConfig] = useState({
        createRequestUrl: `${process.env.REACT_APP_API_URL}transaction/create-new-bkash-payment`,
        executeRequestUrl: `${process.env.REACT_APP_API_URL}transaction/execute-bkash-payment`,
        amount: 0
    })
    const dispatch = useDispatch();
    const removeFromReduxCart = (id) => {
        dispatch(removeFromCart(id))
    }
    const [today, setToday] = useState(moment().toISOString())
    useEffect(() => {
        let timeInterval = setInterval(() => {
            setToday(moment().toISOString())

        }, 45000)

        return () => clearInterval(timeInterval);
    }, [])

    const [isOpen, setIsOpen] = useState(false);

    const history = useHistory()
    const cartData = useSelector(state => {
        return state?.cart?.filter(course => course.registrationStartDate <= today && course.registrationEndDate >= today)
    })

    const userInfo = useSelector(state => state.user).data
    const subTotal = cartData?.reduce((acc, crr) => acc + (crr.price || 0), 0)
    const total = Number(cartData?.reduce((acc, crr) => acc + (crr.price || 0), 0)) - Number((props.dataToStore && props.dataToStore.discountAmount) || 0);
    const [paymentStatus, setPaymentStatus] = useState({ done: false, isSuccess: false })

    const currentUser = authService.getCurrentUser();
    const [isPending, setIsPending] = useState(false)
    useEffect(() => {
        if (props.dataCollector) {
            props.dataCollector("amount", { total: total });
            setBkashConfig({
                ...bKashConfig,
                amount: total,
                requestedPayload: { courses: cartData, promoCode: props.dataToStore.promoCode },
                additionalHeaders: {

                }
            })
        }
    }, [total])

    const completePayment = () => {
        const currentUser = authService.getCurrentUser();

        if (!currentUser) {
            history.push('/login')
        } else {
            setIsPending(true)

            if ((props.paymentStatus && props.paymentStatus.success)) {
                if (props.dataToStore.paymentMethod === "SSLCommerce") {
                    paymentService.SslCommercePayment({ courses: cartData, promoCode: props.dataToStore.promoCode })
                        .then((res) => {
                            if (res) {
                                cartService.updateCartToLocalStorage(currentUser?.user?._id, [])
                                window.location = res.data.data;

                            }

                        })
                        .catch(() => {
                            setPaymentStatus({ done: true, isSuccess: false })
                            setIsPending(false)
                        })
                }

                else if (props.dataToStore.paymentMethod === "stripe") {
                    const usd = cartData.reduce((acc, crr) => acc + crr.usd, 0)


                    paymentService.stripePayment({ usd, courses: cartData, promoCode: props.dataToStore.promoCode })
                        .then(async (response) => {
                            const stripePromise = loadStripe(
                                process.env.REACT_APP_STRIPE_PUBLIC_KEY
                            );
                            const stripe = await stripePromise;
                            stripe.redirectToCheckout({
                                sessionId: response?.data?.id
                            })
                            if (response) {
                                cartService.updateCartToLocalStorage(currentUser?.user?._id, [])
                                // window.location = response.data.data;
                            }

                        })
                        .catch(() => {
                            setPaymentStatus({ done: true, isSuccess: false })
                            setIsPending(false)
                        })

                }
                else if (props.dataToStore.paymentMethod === "Manual bKash") {

                    paymentService.manualBkashPayment({ total: total || 0, subTotal: total, userId: currentUser.user._id, ...props.dataToStore, courses: cartData, subTotal })
                        .then((res) => {
                            setPaymentStatus({ done: true, isSuccess: true })
                            if (res) {
                                setTimeout(() => {

                                    dispatch(userData({ ...userInfo, lastOrdered: res.data.data?.status, }));

                                    dispatch(clearCart())
                                    cartService.updateCartToLocalStorage(currentUser?.user?._id, []);
                                    if (res.data.data?.status === "verified") {
                                        history.push(res.data.data?.redirect);
                                    }

                                }, 2000)

                            }
                            setTimeout(() => {
                                props.paymentStatusHandler(true, "Payment Successful", true);
                            }, 1000)

                        })
                        .catch(error => {
                            if (error?.response.data?.type === "tnxIdError") {
                                swal("", "তুমি যে ট্রানজেকশন আইডি দিয়েছ তা আগে ব্যবহার করা হয়েছে। বিস্তারিত জানতে কল করো 01322810877 ।", "warning");
                            }
                            setPaymentStatus({ done: true, isSuccess: false })
                            setIsPending(false)

                        })
                }

                else if (props.dataToStore.paymentMethod === "bKashPayment") {
                    props.setBkashPaymentStatus('pending');
                    // Common pending status
                    setIsPending(false)
                }


            }
        }

    }

    const handleCheckout = (event) => {
        if (currentUser) {
            history.push("/checkout");
        }
    }

    return (
        <div className="cart ">
            <h2 className="cart-title">Check Out</h2>
            <div className={`mt-3 ${!props.onHeader ? "round-n-shadow p-4 mb-4" : ""}`}>
                {(cartData?.length) ?
                    <div className="cart-items-wrapper">
                        <div className="items">
                            {cartData.map(item => (
                                <div key={item._id} className="row">
                                    <div className="col-4 pr-2">
                                        <img src={getImage(item?.thumbnail)} alt={item.title} className="img-fluid  course-thumb" />
                                    </div>
                                    <div className="col-7 pl-0 pr-0 align-self-start">
                                        <div className="d-flex justify-content-between">
                                            <div className="checkout-item-text">
                                                <p className="m-1 item-name" >{item.title}</p>
                                                <h4 className="ml-1 subtitle-2 font-weight-bold">{item.price || 0} Tk</h4>
                                            </div>
                                            {props.onHeader &&

                                                <FontAwesomeIcon
                                                    className="align-self-center close-icon"
                                                    onClick={() => removeFromReduxCart(item._id)}
                                                    icon={faTimes} />
                                            }
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                        {
                            (props.dataToStore && props.dataToStore.discountAmount) && <>
                                <div className="dashed-border d-flex justify-content-between py-2 ">
                                    <h6 className="font-weight-bold">Subtotal</h6>
                                    <h5 className="text-danger font-weight-bold">৳ {subTotal}</h5>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-bold">Discount</h6>
                                    <h5 className="text-danger font-weight-bold">৳ {props.dataToStore.discountAmount}</h5>
                                </div>
                            </>
                        }

                        <div className="dashed-border d-flex justify-content-between mt-4 py-3 ">
                            <h5 className="font-weight-bold">Total</h5>
                            <h4 className=" font-weight-bold">{total} Tk</h4>
                        </div>
                        {
                            props.onHeader ?
                                <CustomButton fullWidth onClick={event => handleCheckout(event)} disabled={!currentUser?.user?._id} className="">Checkout</CustomButton>
                                :
                                <CustomButton
                                    fullWidth
                                    disabled={
                                        !(props.paymentStatus && props.paymentStatus.success && props.dataToStore?.agreeToTermsAndPolicy) ||
                                        (isPending && props.dataToStore.paymentMethod !== "bKashPayment") ||
                                        (props?.dataToStore?.paymentMethod === "bKashPayment" && props.bkashPaymentStatus === 'pending')

                                    }
                                    onClick={completePayment}
                                    className="">
                                    {
                                        ((props.dataToStore.paymentMethod === 'bKashPayment' && props.bkashPaymentStatus === 'pending') || (props.dataToStore.paymentMethod !== 'bKashPayment' && isPending)) ?
                                            <img src={require('../../assets/images/processing.gif')} alt="Processing ..." /> :
                                            "Complete Payment"
                                    }

                                </CustomButton>
                        }
                    </div>
                    :
                    <div className="text-center pt-3 cart-wrapper">
                        <img src={emptyCartIcon} alt="Cart Icon" />
                        <p className="my-4 px-2" style={{ fontWeight: 400, whiteSpace: 'nowrap' }}>Your cart is empty</p>
                    </div>
                }
            </div>
            {
                (!props.onHeader && paymentStatus.done) && (
                    <div className="w-100 mx-auto">
                        {
                            paymentStatus.isSuccess ?
                                <ToasterNotification success message="Payment successfully done" />
                                :
                                <ToasterNotification success={false} message="Payment Failed" />
                        }
                    </div>
                )

            }
            {
                !props.onHeader && (

                    <div className="payment-process">
                        <h6>কীভাবে আপনি কোর্স কিনবেন নিচের ভিডিও টি দেখুন </h6>

                        <div className="payment-process-video">
                            <ModalVideo channel='vimeo' isOpen={isOpen}
                                videoId={'656013436'}
                                onClose={() => setIsOpen(false)} />

                            <div className="preview text-center">
                                <Image style={{ paddingTop: 0 }} className="img-fluid w-100 lazy-image"
                                    src={thumbnail}
                                    alt="Payment Process"
                                />
                                <div onClick={() => setIsOpen(true)} className="play-icon">
                                    <LottieAnimation lottie={playButton} w={100} h={100} />
                                </div>

                            </div>
                        </div>
                        <div className='py-3'>
                            {props.dataToStore.paymentMethod === "Manual bKash" && (
                                <img style={{ borderRadius: 8 }} className='w-100' src={bkashQRCode} alt="" />
                            )}
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default CartPreview;