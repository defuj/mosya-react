import React from "react";
import '../assets/styles/home.css';

import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';

const Main = (props) => {
    let Component = props.component;
    return (
        <>
        <Component/>    
        <Footer/>
        <BottomNavigation/>
        </>
        
    )
}

export default Main;
