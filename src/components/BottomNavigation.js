import React from "react";
import {
    Link
  } from "react-router-dom";
const BottomNavigation = () => {
    const pathname = window.location.pathname;

    return (
        <nav className="navbar bottom-nav fixed-bottom navbar-expand bg-white shadow-sm col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center m-auto">
            <Link to="/home" title="beranda" className={pathname === '/home' ? 'bottom-nav-item mb-0 text-decoration-none active' : 'bottom-nav-item mb-0 text-decoration-none'}>
                <div className="bottom-nav-link">
                <p>
                    <i className="fi fi-rr-home unselected"></i>
                    <i className="fi fi-sr-home selected"></i>
                </p>
                <span>Beranda</span>
                </div>
            </Link>
            <Link to="/home/catalog" title="katalog" className={pathname === '/home/catalog' ? 'bottom-nav-item mb-0 text-decoration-none active' : 'bottom-nav-item mb-0 text-decoration-none'}>
                <div className="bottom-nav-link">
                <p>
                    <i className="fi fi-rr-car-alt unselected"></i>
                    <i className="fi fi-sr-car-alt selected"></i>
                </p>
                <span>Katalog</span>
                </div>
            </Link>
            <Link to="/home/history" title="riwayat" className={pathname === '/home/history' ? 'bottom-nav-item mb-0 text-decoration-none active' : 'bottom-nav-item mb-0 text-decoration-none'}>
                <div className="bottom-nav-link">
                <p>
                    <i className="fi fi-rr-ballot unselected"></i>
                    <i className="fi fi-sr-ballot selected"></i>
                </p>
                <span>Riwayat</span>
                </div>
            </Link>
            <Link to="/home/profile" title="profile" className={pathname === '/home/profile' ? 'bottom-nav-item mb-0 text-decoration-none active' : 'bottom-nav-item mb-0 text-decoration-none'}>
                <div className="bottom-nav-link">
                <p>
                    <i className="fi fi-rr-user unselected"></i>
                    <i className="fi fi-sr-user selected"></i>
                </p>
                <span>Profil</span>
                </div>
            </Link>
        </nav>
    )
}

export default BottomNavigation;