import Image from 'material-ui-image';
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import thinkerImage from "../../assets/images/thinker.png";
import faqService from "../../services/Admin/FAQ/faqService";
import FrequentlyAskedList from "../HomeComponents/FrequentlyAskedList";

// FAQ component
const FrequentlyAsked = () => {

    const { data: faqData } = useQuery('faq', faqService.getFaq, {
        cacheTime: 1000 * 60 * 24,
        staleTime: 1000 * 60 * 60
    })

    return (
        <section className="frequently-asked-component ">

            <div className="frequently-asked-main">
                <div className="container">
                    <h1 className="section-title text-center py-5">কোর্স সম্পর্কিত সাধারণ জিজ্ঞাসা</h1>
                    <FrequentlyAskedList faqList={faqData?.data?.data?.faqs} />
                </div>
            </div>
        </section>
    )

}

export default FrequentlyAsked;