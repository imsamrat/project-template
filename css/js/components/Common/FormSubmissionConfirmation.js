import React from "react";
import { FaTimes } from "react-icons/fa";
import swal from "@sweetalert/with-react";
import thankYouIllustration from "../../assets/images/payment-success.png";

const FormSubmissionConfirmation = () => {
  return (
    <div>
      <div className="text-right">
        <button className="btn text-dark" onClick={() => swal.close()}>
          <FaTimes />
        </button>
      </div>
      <div className="text-center p-3 pb-0">
        <img src={thankYouIllustration} alt="" />
        <h3 className="mt-4 mb-2">Thank you!</h3>
        <p className="mb-0">Your form was successfully submitted!</p>
      </div>
    </div>
  );
};

export default FormSubmissionConfirmation;
