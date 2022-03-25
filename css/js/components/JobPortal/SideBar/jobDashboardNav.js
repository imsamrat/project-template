import { FaBriefcase, FaUsers } from "react-icons/fa"
import { FaPlusSquare } from "react-icons/fa"
import { IoIosGitPullRequest } from "react-icons/io";
import { FiUserCheck } from "react-icons/fi";
import { TiThLarge } from 'react-icons/ti'
import { AiOutlineRocket, AiOutlineThunderbolt } from "react-icons/ai";
import { ImBriefcase } from 'react-icons/im'
const jobDashboardNav = [
    {
        label : "Dashboard",
        link : "/",
        Icon : TiThLarge ,
    },
    {
        label : "Jobs",
        link : "/job-circular",
        Icon : FaBriefcase,
        children : [
            {
                label : "Add Job",
                link : "/add-job",
                Icon : FaPlusSquare,
            },
            {
                label : "Jobs",
                link : "/job-circular",
                Icon : FiUserCheck,
            },
            // {
            //     label : "Applications",
            //     link : "/job-applications",
            //     Icon : FiUserCheck,
            // },
            
        ]
    },
    {
        label : "Candidates",
        link : "/primary-screening",
        Icon : FaUsers,
        children : [
            {
                label : "Primary Screening",
                link : "/primary-screening",
                Icon : IoIosGitPullRequest,
            },
            {
                label : "Primary Interview",
                link : "/primary-interview",
                Icon : FiUserCheck,
            },
            {
                label : "Talent pool",
                link : "/talent-pool",
                Icon : AiOutlineThunderbolt,
            },
            {
                label : "Int Talent pool",
                link : "/int-talent-pool",
                Icon : AiOutlineRocket,
            }
        ]
    },
    {
        label : "Got hired",
        link : "/got-hired",
        Icon : ImBriefcase ,
    },
]

export default jobDashboardNav