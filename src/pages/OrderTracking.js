import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios, { orderdetail, ordertracking } from "../helper/axios";
import { getAccount } from "../helper/session";

const OrderTracking = () => {
    const {code} = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(getAccount());
    const [track, setTrack] = useState(null);
    const navigate = useNavigate();

    const getTracking = async () => {
        setLoading(true);
        axios.get(`${ordertracking}?id=${code}&user_id=${user.id}`)
        .then(response => {
            setLoading(false);
            let result = response.data;
            if(result.status){
                setTrack(result.data);
            }else{
                setTrack(null);
                Swal.fire({
                    title: 'Perhatian',
                    text: 'Tidak menemukan informasi pesanan',
                    icon: 'error',
                    confirmButtonText: 'Kembali'
                }).then((result) => {
                    navigate('/home/history');
                });
            }
        }).catch(error => {
            setLoading(false);
            setTrack(null);
            Swal.fire({
                title: 'Gagal',
                text: 'Terjadi kesalahan, silahkan coba lagi',
                icon: 'error',
                confirmButtonText: 'Kembali'
            }).then((result) => {
                navigate('/home/history');
            });
        })
    }

    const checkStatusOrder = async () => {
        setLoading(true);
        axios.get(`${orderdetail}?id=${code}&user_id=${user.id}`)
        .then(res => {
            let result = res.data;
            if(result.status){
                if(result.data.status === 'Dikirim'){
                    getTracking();
                }else{
                    Swal.fire({
                        title: 'Perhatian',
                        text: 'Pesanan kamu belum dikirim',
                        icon: 'warning',
                        confirmButtonText: 'Kembali'
                    }).then((result) => {
                        navigate('/home/history');
                    });
                }
            }else{
                Swal.fire({
                    title: 'Perhatian',
                    text: 'Tidak menemukan informasi pesanan',
                    icon: 'error',
                    confirmButtonText: 'Kembali'
                }).then((result) => {
                    navigate('/home/history');
                });
            }
        }).catch(err => {
            Swal.fire({
                title: 'Gagal',
                text: 'Terjadi kesalahan, silahkan coba lagi',
                icon: 'error',
                confirmButtonText: 'Kembali'
            }).then((result) => {
                navigate('/home/history');
            });
        })

        
    }

    useEffect(() => {
        document.title = "Lacak Pengiriman";
        setUser(getAccount());
        setLoading(true);
        checkStatusOrder();
    }, []);

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to={`/order/${code}/detail`} className="navbar-brand" title="back">
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2">Detail Pengiriman</p>
            </div>
        </nav>

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-2" style={{minHeight : '350px'}}>
            {loading && <Loading/>}
            {!loading && track !== null && 
            <>
            <div className="container-request-code bg-white px-3 py-3 d-flex flex-column mb-2">
                <p className="mb-1 bodytext1 semibold color-black500 mb-2">
                    Status Pemesanan
                </p>
                <div className="d-flex flex-row justify-content-between mb-1">
                <p className="mb-0 bodytext2 color-black400 flex-fill">
                    Nomor Pesanan
                </p>
                <p className="mb-0 bodytext2 semibold color-black500">
                    #{track.id}
                </p>
                </div>
                <div className="d-flex flex-row justify-content-between mb-1">
                    <p className="mb-0 bodytext2 color-black400 flex-fill">
                        Waktu Pemesanan
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500">
                        {track.date}
                    </p>
                </div>
            </div>

            {track.tracking.length > 0 && 
            <div className="container-tracking px-4 py-3 d-flex flex-column mb-2 mt-3">
                <div className="timeline">
                {track.tracking.map((item, i) => 
                    <div className={i === 0 ? 'pb-4 container-track right start' : i+1 === track.tracking.length ? 'pb-4 container-track right end' : 'pb-4 container-track right'} key={i}>
                        <div className="content">
                            <div className="d-flex flex-row justify-content-between">
                                <p className={i === 0 ? 'mb-0 bodytext1 flex-fill color-black500' : i+1 === track.tracking.length ? 'mb-0 bodytext1 flex-fill color-green500' : 'mb-0 bodytext1 flex-fill'} >{item.date}</p>
                                <p className="mb-0 color-black300 bodytext2">{item.time}</p>
                            </div>
                            <p className="mb-0 color-black300 bodytext2">{item.description}</p>
                        </div>
                    </div>
                ).reverse()}
                </div>
            </div>
            }
            </>
            }
        </main>

        <Footer/>
        </>
    );
}

export default OrderTracking;