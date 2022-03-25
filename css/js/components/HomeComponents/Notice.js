import React, { useState } from 'react';
import calendarStartIcon from './../../assets/icons/homepage/calendar-start.svg';
import calendarEndIcon from './../../assets/icons/homepage/calendar-end.svg';
import capIcon from './../../assets/icons/homepage/cap.svg';
import timeIcon from './../../assets/icons/homepage/time.svg';
import bkashIcon from './../../assets/images/homepage/bkash.png';
import sslcommerzIcon from './../../assets/images/homepage/sslcommerz.png';
import stripeIcon from './../../assets/images/homepage/stripe.png';
import PreviewCard from '../Common/PreviewCard';
import moment from 'moment';
import CustomCountdown from '../Custom/CustomCountdown';
import { engToBanglaNumber } from '../../utilities/engToBnaglaNumber';
// Notice section
const Notice = (props) => {
    const {
        registrationStart,
        registrationEnd,
        courseStart,
        courseOrientation,

    } = props.notice || {};
    const {
        registrationStartDate,
        registrationEndDate,
        price

    } = props.courseDetail || {};
    const time = useState(moment().toISOString());
    const noticeGap = time < registrationEndDate ? 'mt-4' : 'mt-2'
    return (
        <section className="notice pt-md-5 pt-lg-0">
            <div className="container">
                <h2 className="notice-title text-center section-title english mb-5"> CSE Fundamentals With Phitron</h2>
                <div className="row py-4">
                    <div className="col-md-5">
                        <div className="px-4 my-3 text-center">
                            <PreviewCard noAddToCart noCountDown statistic={props.statistic} courseDetail={props.courseDetail} />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="px-4 my-3 d-flex flex-column justify-content-start align-items-start h-100">
                            <h2 className='notice-label'>
                                {registrationStartDate && (
                                    registrationStartDate > time
                                        ?
                                        "এনরোলমেন্ট শুরু হবে"
                                        :
                                        registrationEndDate < time ?
                                            "পরবর্তী ব্যাচের সময় সূচি" :
                                            "এনরোলমেন্ট শেষ হতে আর বাকি"
                                )}</h2>
                            {
                                (time < registrationEndDate) &&
                                <div className='mt-4'>
                                    <CustomCountdown
                                        timeRemain={
                                            registrationStartDate > time ?
                                                registrationStartDate :
                                                registrationEndDate > time &&
                                                registrationEndDate
                                        }
                                    />
                                </div>
                            }
                            <div className="my-2">
                                <h5 className={noticeGap}>
                                    <img className='mr-2' src={calendarStartIcon} alt="" />
                                    এনরোলমেন্ট শুরু: <strong>{registrationStart}</strong>
                                </h5>
                                <h5 className={noticeGap}>
                                    <img className='mr-2' src={calendarEndIcon} alt="" />
                                    এনরোলমেন্ট শেষ: <strong>{registrationEnd}</strong>
                                </h5>
                                <h5 className={noticeGap}>
                                    <img className='mr-2' src={timeIcon} alt="" />
                                    ব্যাচের ওরিয়েন্টশন: <strong>{courseOrientation}</strong>
                                </h5>
                                <h5 className={noticeGap}>
                                    <img className='mr-2' src={capIcon} alt="" />
                                    ক্লাস শুরু: <strong>{courseStart}</strong>
                                </h5>
                                {
                                    time > registrationEndDate &&
                                    <h3 className="price"> ৳ <strong>{engToBanglaNumber(price || 0)}</strong></h3>
                                }
                            </div>
                            {time < registrationEndDate &&
                                <div className="mt-2">
                                    <div className="d-flex payment-area flex-column flex-lg-row flex-wrap align-items-start align-items-lg-center justify-content-between my-2 pt-3">
                                        <h4 className="p-0 m-0">Payment method:</h4>
                                        {/* <img className="mx-lg-2 mt-3 mt-lg-0 img-fluid" src={sslcommerzIcon} alt="" /> */}
                                        <img className='mx-lg-2  mt-3 mt-lg-0 img-fluid' src={stripeIcon} alt="" />
                                        <p className='mx-lg-2  mt-3 mt-lg-3 '>
                                            <img className='mr-2' src={bkashIcon} alt="" />
                                            <span style={{ fontWeight: 500, color: '#1E1E1E' }}>bKash payment</span>
                                        </p>
                                    </div>
                                    <p style={{
                                        fontSize: 16,
                                        margin: '20px 0 0 0',
                                        color: '#1E1E1E',
                                        fontWeight: 500
                                    }}><img src={bkashIcon} alt="" /> Manual bKash: <span style={{ color: '#5E24F9', fontWeight: 700 }}>০১৩০৮৫৪৩৭৬৮ (মার্চেন্ট অ্যাকাউন্ট)</span></p>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notice;