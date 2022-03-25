import React from 'react';
import Countdown from 'react-countdown';
import parse from 'html-react-parser';
import moment from 'moment';
const CustomCountdown = (props) => {
    const digitToDiv = (digit) => {
        let customHtml = "";
        const digitList = digit.toString().split('');
        digitList.forEach(eachDigit => {
            customHtml = customHtml + "<div class='each-digit d-flex align-items-center justify-content-center'>" + eachDigit + "</div>";
        })

        return parse(customHtml);
    }

    // Random component
    const Completionist = () => <span></span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <div className="row mx-auto justify-content-center">
                    {
                        props.helperText &&
                        <p className="text-center mt-3 col-12 countdown-helper-text">
                            Section will be available in {(days < 10 ? "0" + days : days)} days {(hours < 10 ? "0" + hours : hours)} hours {(minutes)} min {(seconds < 10 ? "0" + seconds : seconds)} second
                        </p>
                    }
                    <div className="ml-2 mr-2 ">
                        <div className="row">
                            {digitToDiv(days < 10 ? "0" + days : days)}
                        </div>
                        <div className="text-center digit-label">Days</div>
                    </div>
                    <div className="ml-2 mr-2">
                        <div className="row">
                            {digitToDiv(hours < 10 ? "0" + hours : hours)}
                        </div>
                        <div className="text-center digit-label">Hours</div>
                    </div>
                    <div className="ml-2 mr-2">
                        <div className="row">
                            {digitToDiv(minutes < 10 ? "0" + minutes : minutes)}
                        </div>
                        <div className="text-center digit-label">Minutes</div>
                    </div>
                    <div className="ml-2 mr-2">
                        <div className="row">
                            {digitToDiv(seconds < 10 ? "0" + seconds : seconds)}
                        </div>
                        <div className="text-center digit-label">Seconds</div>
                    </div>
                </div>);
        }
    };

    return (
        <div className="custom-countdown-component">
            <Countdown
                now={() => moment.tz('Asia/Dhaka')}
                date={props.timeRemain}
                renderer={renderer}
            />
        </div>
    )

}

export default CustomCountdown;