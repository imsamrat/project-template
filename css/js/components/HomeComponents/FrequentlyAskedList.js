import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import CustomAccordion from "../Custom/CustomAccordion";

// FAQ list component
const FrequentlyAskedList = ({ faqList }) => {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className="frequently-asked-list-component">
            <div className="container">
                {
                    showAll ?
                        faqList?.map((faq) => (
                            <div key={faq._id} className="mb-3">

                                <CustomAccordion
                                    title={faq.question}
                                >
                                    <p className="faq-answer">
                                        {faq.answer}
                                    </p>
                                </CustomAccordion>
                            </div>
                        )) :
                        faqList?.slice(0, 6)?.map((faq) => (
                            <div key={faq._id} className="mb-3">

                                <CustomAccordion
                                    title={faq.question}
                                >
                                    <p className="faq-answer">
                                        {faq.answer}
                                    </p>
                                </CustomAccordion>
                            </div>
                        ))
                }

                {
                    faqList?.length > 6 &&
                    <div className="text-center show-btn-container">
                        <span className="line"></span>
                        <Button className="show-btn" onClick={() => setShowAll(!showAll)}>{showAll ? 'See Less' : 'See All'}</Button>
                        <span className="line"></span>
                    </div>
                }

            </div>
        </div>
    )

}

export default FrequentlyAskedList;