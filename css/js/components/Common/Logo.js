import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/images/homepage/logo.png"

// Brand logo component
const Logo = () => {
    return (
        <Link className="brand navbar-brand d-flex text-white" to="/">
            <img className="brand-logo" src={logo} alt="Logo" />
        </Link> 
    );
};

export default Logo;