import React, {useEffect} from "react";
import '../assets/styles/home.css';

import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import { checkAccount, getAccount, safeString, setAccount } from "../helper/session";

const Main = (props) => {
    const configClass = () => {
        let pathname = safeString(window.location.pathname);
        if(pathname === '/signin' || pathname === 'signup' || pathname === '/forgot_password' || pathname === '/reset_password' || pathname === '/otp'){
            document.getElementById('body').classList.remove('align-items-start');
            document.getElementById('body').classList.remove('py-0');
            document.getElementById('body').classList.remove('flex-column');
            document.getElementById('body').classList.add('text-center');
        }else{
            document.getElementById('body').classList.remove('text-center');
            document.getElementById('body').classList.add('align-items-start');
            document.getElementById('body').classList.add('py-0');
            document.getElementById('body').classList.add('flex-column');
        }
    }

    useEffect(() => {
        configClass();
        if(checkAccount()){
            setAccount(getAccount());
        }
    }, [configClass]);

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
