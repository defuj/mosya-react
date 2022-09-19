import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
    const withNavigation = props.withNavigation === undefined ? false : props.withNavigation;
    const [pathname, setPathname] = useState(window.location.pathname);
    
    useEffect(() => {
        setPathname(window.location.pathname);
    }, [pathname])

    return (
        <footer style={(pathname === '/home' || pathname === '/home/catalog' || pathname === '/home/history' || pathname === '/home/profile' || withNavigation) ? {} : {maxHeight: '300px', minHeight: '300px'}} className={(pathname === '/home' || pathname === '/home/catalog' || pathname === '/home/history' || pathname === '/home/profile') ? 'container-footer w-100 mb-4 bg-white p-3 flex-row justify-content-center col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto' : 'container-footer w-100 bg-white p-3 flex-row justify-content-center col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ml-auto mr-auto mb-0'}>
            <p className="headline6 color-black700 semibold text-center">Download Aplikasi Mosya!</p>
            <p className="bodytext1 color-black400 text-center">Lebih mudah mencari mobil impian kamu hanya tinggal scroll dan klik klik aja.</p>
            <div className="container-footer-button d-flex justify-content-center">
                <Link className="button-footer px-2" to="">
                    <img src={require('../assets/images/btn-google-play.png')} alt=""/>
                </Link>
                <Link className="button-footer px-2" to="">
                    <img src={require('../assets/images/btn-app-store.png')} alt=""/>
                </Link>
            </div>

            <div className="container-footer-action d-flex justify-content-center flex-wrap mt-3">
                <Link className="action-footer px-1 color-black300 bodytext2" to="">
                    Tentang Mosya |
                </Link>
                <Link className="action-footer px-1  color-black300 bodytext2" to="">
                    Syarat dan Ketentuan | 
                </Link>
                <Link className="action-footer px-1  color-black300 bodytext2" to="">
                    Pusat Bantuan
                </Link>
            </div>

            <div className="container-line background-black100 w-100 my-3" style={{height: '1px'}}></div>

            <div className="container-footer-copyright d-flex justify-content-center flex-wrap">
                <p className="copyright color-black300 bodytext2">Copyright © 2022 Mosya. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;