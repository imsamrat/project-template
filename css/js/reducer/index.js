import { combineReducers } from "redux";
import routerReducer from "react-router-redux";

import unit from "./unit";
import cart from "./cart";
import load from "./load";
import user from "./user";
import toggler from "./toggler";
import exploredUnitHistory from "./exploredUnitHistory";
import unitHighLight from "./unitHighLight";
import module from "./module";
import progressbar from "./progressbar";
import footerData from "./footerData";
import courseContent from "./courseContent"
import exploredQuiz from "./exploredQuiz";
import conceptualSession from "./conceptualSession"
import gem from "./gem"
import theaterMode from "./theaterMode";
import earlyAccessModule from "./earlyAccessModule";
import impressiveShortcut from "./impressiveShortcut";
import clientRoute from './clientRoute'
import sidebarMinimizer from './sidebarMinimizer'
import instructorAssignmentStats from './instructorAssignmentStats'
const rootReducer = combineReducers({
    unit,
    load,
    user,
    toggler,
    exploredUnitHistory,
    unitHighLight,
    cart,
    module,
    progressbar,
    routering: routerReducer,
    footerData,
    courseContent,
    exploredQuiz,
    conceptualSession,
    gem,
    theaterMode,
    earlyAccessModule,
    impressiveShortcutEnabled: impressiveShortcut,
    clientRoute,
    sidebarMinimizer,
    instructorAssignmentStats
})

export default rootReducer;