import React, {useEffect} from "react";
import '../assets/styles/home.css';

import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import { checkAccount, getAccount, safeString, setAccount } from "../helper/session";
import { Helmet } from "react-helmet";

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
        <Helmet
            meta={[
                {"name" : "og:title", "content" : "Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia"},
                {"name" : "og:description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                {"name" : "og:image", "content" : 'https://admin.mosya.co.id/helper_assets/images/app_icon_title_h.png'},
                {"name" : "og:url", "content" : window.location.href},
                {"name" : "og:type", "content" : "website"},
                {"name" : "og:site_name", "content" : "Mosya"},

                {"name" : "twitter:title", "content" : 'Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia'},
                {"name" : "twitter:description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                {"name" : "twitter:image", "content" : "https://admin.mosya.co.id/helper_assets/images/app_icon_title_h.png"},
                {"name" : "twitter:card", "content" : "summary_large_image"},
                {"name" : "twitter:site", "content" : "@mosya.id"},
                {"name" : "twitter:creator", "content" : "@mosya.id"},

                {"name" : "description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                {"name" : "keywords", "content" : "cari mobil murah, mobil bekas murah, harga mobil bekas dibawah 50 juta, beli mobil bekas, mobil bekas, jual beli mobil bekas, mobil second murah, beli mobil second, jual mobil bekas, mobil cicilan syariah, mobil cicilan tanpa bunga, mobil cicilan syariah"},
                
            ]}/>
        <Component/>    
        <Footer/>
        <BottomNavigation/>
        </>
        
    )
}

export default Main;
