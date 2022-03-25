import React , {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import Footer from './Footer';
import Header from './Header';

// Common Layout 
const MasterLayout = ({children}) => {
    const location = useLocation()
    useEffect( () =>  window.scrollTo(0,0),[location])
    const hideForAdministrator = (( authService.getCurrentUser()?.user?.role !== 'admin' && authService.getCurrentUser()?.user?.role !== 'instructor'  && authService.getCurrentUser()?.user?.role !== 'jpi') || (!location?.pathname?.includes('dashboard') && !location?.pathname?.includes('job-dashboard')));
    return (
        <>
            {hideForAdministrator && <Header/>} 
            {children}
            {hideForAdministrator && <Footer/>} 
        </>
    );
};

export default MasterLayout;