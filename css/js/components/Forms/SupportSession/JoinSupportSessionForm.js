import React, { useState, useEffect } from "react";
import supportSession from "../../../services/supportSessionService";
import swal from "sweetalert";
import cover from "../../../assets/images/support-session-waiting-cover.svg";
import moment from "moment";
import { engToBanglaNumber } from "../../../utilities/engToBnaglaNumber";

const JoinSupportSessionForm = (props) => {

    const handleCloseModal = () => {
        swal({
            title: "",
            text: "আপনি কি সেশন থেকে লিভ নিতে চাচ্ছেন ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isSure) => {
                if (isSure) {
                    supportSession.cancelSessionByUser(props?.formData?.sessionId).then(response => {
                        if (props?.handleCloseModal) {
                            props.handleCloseModal();
                        }
                    })

                }
            });


    }

    useEffect(() => {
        setInterval(function () {
            if (props.getSupportSerial) {
                props.getSupportSerial();
            }
        }, 300000);
    }, [])

    return (
        <div className="student-submitted-issue-form  text-center p-3 mt-1">
            <div className="text-left mb-1">
                <span className="mr-2"><b>Instructor</b></span>
                {props?.formData?.instructor?.map(each => (
                    <span>{each?.username}, </span>
                ))}
            </div>

            <div className="text-left">
                <span className="mr-2">{props?.formData?.sessionEventInfo?.title}</span>

            </div>

            <img alt="cover" className="join-now-cover-image pb-3 pt-3" src={cover} />
            {(props?.formData?.serial) && <>

                {((Number(props?.formData?.serial || 0) - Number(props?.formData?.currentSerial || 0)) === 1) ? <></> : <>
                    <div className="serial-title mb-2">
                        তোমার সিরিয়াল
                    </div>
                    <div className="serial-number mb-2">
                        {engToBanglaNumber(props?.formData?.serial)}
                    </div>
                </>}
                <div className="serial-title mb-2">
                    {(props?.formData?.serial === props?.formData?.currentSerial) && <>তোমার সাপোর্ট এখন চলছে </>}

                    {(((Number(props?.formData?.serial || 0) - Number(props?.formData?.currentSerial || 0)) > 2)) && props?.formData?.currentSerial > 0 && <>
                        এখন সাপোর্ট চলছে সিরিয়াল {engToBanglaNumber(props?.formData?.currentSerial)}</>}
                    {(((Number(props?.formData?.serial || 0) - Number(props?.formData?.currentSerial || 0)) === 1)) && <div className="mb-4">
                        <div className="text-center">জলদি করো !</div> এর পরেই তোমার সাপোর্ট শুরু হবে !</div>}
                </div>
                {
                    (props?.formData?.serial !== props?.formData?.currentSerial &&
                        !((Number(props?.formData?.serial || 0) - Number(props?.formData?.currentSerial || 0)) === 1)) &&
                    <div className="mb-3">
                        {props?.formData?.isRunningSession ?
                            <span>তোমার সাপোর্ট শুরু হবে এখন থেকে <b className="approx-time">{engToBanglaNumber(props?.formData?.approxTime)} </b> মিনিট পর</span> :
                            <span>সাপোর্ট টাইম এস্টিমেশন <b className="approx-time">{moment(props?.formData?.sessionEventInfo?.startDate)?.add(Number(props?.formData?.approxTime), "minutes").format("LT")}</b> এর পর জানানো হবে</span>}

                    </div>
                }
            </>}
            <div className={`d-flex justify-content-between mb-4 ${((Number(props?.formData?.serial || 0) - Number(props?.formData?.currentSerial || 0)) === 1) && "mt-5"}`}>
                <div>
                    <h6 className="">সেশন শুরু</h6>
                    <span className="light-green-div">{moment(props?.formData?.sessionEventInfo?.startDate)?.format("LT")}</span>
                </div>

                <div>
                    <h6>সেশন শেষ</h6>
                    <span className="pink-div">{moment(props?.formData?.sessionEventInfo?.endDate)?.format("LT")}</span>
                </div>

            </div>
            <div className="text-center">
                <button onClick={() => handleCloseModal()} className="btn cancel-button mr-2">Leave</button> {props?.formData?.isRunningSession && <a target="_blank" className="btn submit-button join-button ml-2" href={`${props?.formData?.meetLink}`}>Join Now</a>}
            </div>


        </div>
    )
}

export default JoinSupportSessionForm;