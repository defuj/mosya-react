import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Spinner from "../components/Spinner";
import axios, { orderconfirm, orderdetail } from "../helper/axios";
import { getAccount } from "../helper/session";

const OrderDetail = () => {
    const {code} = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(false);
    const [user, setUser] = useState(getAccount());
    const navigate = useNavigate();

    const getOrder = async () => {
        setLoading(true);
        axios.get(`${orderdetail}?id=${code}&user_id=${user.id}`)
        .then(response => {
            setLoading(false);
            let result = response.data;
            if(result.status){
                setOrder(result.data);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Perhatian',
                    text: result.message,
                    confirmButtonText: 'Mengerti',
                 }).then(() => {
                    navigate('/home/history', {replace: true});
                });
            }
        }).catch(error => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan',
                text: 'Terjadi kesalahan, silahkan coba lagi',
                confirmButtonText: 'Mengerti',
            }).then(() => {
                navigate('/home/history', {replace: true});
            });
        })
    }

    const orderConfirm = async () => {
        Swal.fire({
            title: 'Mobil sudah diterima?',
            text: 'Apakah kamu yakin pesanan kamu sudah sampai?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            confirmButtonText: 'Ya, Sudah Sampai'
        }).then((result) => {
            if (result.isConfirmed) {
                setProgress(true);
                axios.get(`${orderconfirm}?id=${code}&user_id=${user.id}`)
                .then(response => {
                    setProgress(false);
                    let result = response.data;
                    // console.log(result);
                    if(result.status){
                        Swal.fire({
                            title: 'Pesanan Diterima',
                            text: 'Pesanan kamu sudah diterima',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            getOrder();
                        });
                    }else{
                        Swal.fire({
                            title: 'Gagal',
                            text: result.message,
                            icon: 'error',
                            confirmButtonText: 'Oke'
                        })
                    }
                }).catch(error => {
                    setProgress(false);
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Terjadi kesalahan, silahkan coba lagi',
                        icon: 'error',
                        confirmButtonText: 'Oke'
                    })
                })
            }
        });
    }

    useEffect(() => {
        document.title = "Detail Pemesanan";
        setUser(getAccount());
        getOrder();
    }, []);


    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="/home/history" className="navbar-brand" title="back">
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2">Detail Pemesanan</p>
            </div>
        </nav>

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-2" style={{minHeight: '400px'}}>
            {loading && <Loading/>}
            {!loading && order !== null && 
            <>
            <div id="container-status" className={order.status === 'Belum Bayar' || order.status === 'Batal' ? 'container-status status-0 px-3 py-3 d-flex flex-column mb-2 status-1' : 'container-status status-0 px-3 py-3 d-flex flex-column mb-2 status-2'}>
                <p className="mb-1 bodytext1 semibold" id="statusTitle">
                    {order.status === 'Belum Bayar' && 'Pesanan Kamu Belum Dibayar'}
                    {order.status === 'Dibayar' && 'Pesanan Kamu Sudah Dibayar'}
                    {order.status === 'Verifikasi' && 'Pesanan Kamu Sedang Diverifikasi'}
                    {order.status === 'Batal' && 'Maaf Pesanan Kamu Dibatalkan!'}
                    {order.status === 'Dikirim' && 'Pesanan Kamu Dalam Perjalanan'}
                    {order.status === 'Selesai' && 'Pesanan Kamu Sudah Sampai'}
                </p>
                <p className="mb-0 bodytext2" id="statusDesc">
                    {order.status === 'Belum Bayar' && 'Segera lakukan pembayaran booking fee !'}
                    {order.status === 'Dibayar' && 'Silahkan tunggu, informasi selanjutnya akan kami hubungi via nomor telepon yang terdaftar'}
                    {order.status === 'Verifikasi' && 'Pesanan kamu sedang diverifikasi oleh tim kami, harap  tunggu informasi selanjutnya.'}
                    {order.status === 'Batal' && (order.description !== null && order.description !== '' ? order.description : 'Kami menemukan permasalahan terkait identitas kamu, silahkan hubungi kami untuk konfirmasi kembali.')}
                    {order.status === 'Dikirim' && 'Tim kami sedang mengirim mobil kamu, harap tunggu, dan cek secara berkala pada LACAK PESANAN.'}
                    {order.status === 'Selesai' && 'Alhamdulillah pesanan kamu sudah sampai.'}
                </p>
            </div>

            <div className="container-request-code bg-white px-3 py-3 d-flex flex-column mb-2">
                <p className="mb-1 bodytext1 semibold color-black500 mb-2">
                    Informasi Pemesanan
                </p>
                <div className="d-flex flex-row justify-content-between">
                    <p className="mb-0 bodytext2 color-black400 flex-fill">
                        Nomor Pesanan
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500" id="nomor">#{order.code}</p>
                </div>
            </div>

            <div className="container-address bg-white px-3 py-3 d-flex flex-column mb-2">
                <p className="mb-1 bodytext1 semibold color-black500 mb-2">
                    Alamat Pengiriman
                </p>
                <p className="mb-0 bodytext2 color-black400 flex-fill mb-2" id="phone">{order.address.model} ({order.address.phone})</p>
                <p className="mb-0 bodytext2 color-black400" id="address">{order.address.address}</p>
            </div>

            <div className="d-flex flex-row bg-white px-3 py-3 product-section-payment justify-content-between mb-2">
                <img id="dataImage" src={order.car.image} alt=""/>
                <div className="flex-fill ml-3">
                    <p className="caption color-green500 semibold mb-0" id="dataBrand">{order.car.brand}</p>
                    <p className="bodytext1 semibold color-black800 mb-0" id="dataModel">{order.car.model}</p>
                    <p className="caption color-black300 mb-0" id="dataColorYear">{order.note} | {order.car.year}</p>
                </div>
            </div>

            <div className="container-request-code bg-white px-3 py-3 d-flex flex-column mb-2">
                <p className="mb-1 bodytext1 semibold color-black500 mb-2">
                    Rincian Pembayaran
                </p>
                <div className="d-flex flex-row justify-content-between mb-1">
                    <p className="mb-0 bodytext2 color-black400 flex-fill">
                        Metode Pembayaran
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500" id="paymentMethod">{order.payment.payment_method}</p>
                </div>

                <div className="d-flex flex-row justify-content-between mb-1">
                    <p className="mb-0 bodytext2 color-black400 flex-fill">
                        Booking Fee
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500" id="bookingFee">{order.payment.booking_fee}</p>
                </div>

                <div className="d-flex flex-row justify-content-between mb-1">
                    <p className="mb-0 bodytext2 color-black400 flex-fill">
                        Kode Unik
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500" id="codeUnique">{order.payment.code_uniq}</p>
                </div>

                <div className="d-flex flex-row justify-content-between mb-1">
                    <p className="mb-0 bodytext2 color-black500 semibold flex-fill">
                        Total bayar
                    </p>
                    <p className="mb-0 bodytext2 semibold color-black500 semibold" id="totalPayment">{order.payment.total_payment}</p>
                </div>

            </div>

            <div className="container-request-code bg-white px-3 py-3 d-flex flex-column mb-2">
                <p className="mb-1 bodytext1 semibold color-black500 mb-2">
                    Kontak
                </p>

                <div className="container-contact d-flex flex-row align-items-center px-3 py-3">
                    <img src={require('../assets/images/contact.jpg')} alt="" className="mr-3"/>
                    <div className="flex-column flex-fill">
                        <p className="mb-0 bodytext1 semibold color-black600">Sintia</p>
                        <p className="mb-0 bodytext2 color-black300">Narahubung</p>
                    </div>
                    <a href={`https://wa.me/+6285315131514/?text=Hallo,\nSaya ingin membeli mobil ${order.car.model}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="fi fi-brands-whatsapp mr-2 px-2 mt-1" ></i>
                    </a>
                    
                    <i className="fi fi-rr-phone-call  px-2 mt-1" onClick={() => window.open('tel:+6285315131514')}></i>
                </div>
            </div>
            </>
            }
        </main>

        <Footer withNavigation={order !== null && (order.status === 'Belum Bayar' || order.status === 'Dikirim' || order.status === 'Selesai')}/>

        {!loading && order !== null && (order.status === 'Belum Bayar' || order.status === 'Dikirim' || order.status === 'Selesai') && 
        <nav id="container-action" className="navbar bottom-nav-buy fixed-bottom navbar-expand bg-white px-3 py-3 shadow-sm col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center m-auto">
            {!loading && order !== null && order.status === 'Belum Bayar' && 
            <Link to={`/order/${code}/bill`} className="d-flex flex-fill text-decoration-none">
                <button type="button" className="button-message flex-fill bodytext2 semibold text-white d-flex flex-row justify-content-center align-items-center background-green500">
                    <p className="mb-0 py-1">Bayar Sekarang</p>
                </button>
            </Link>
            }

            {!loading && order !== null && order.status === 'Dikirim' && 
            <>
            <Link to="" onClick={orderConfirm} className="d-flex flex-fill text-decoration-none w-50">
                <button type="button" id="buttonConfirm" className="mr-2 button-request-finish bg-white flex-fill bodytext2 semibold color-green500 d-flex flex-row justify-content-center align-items-center" >
                    {progress ? <Spinner/> : 'Pesanan Diterima'}
                </button>
            </Link>  
            <Link to={`/order/${code}/tracking`} className="d-flex flex-fill text-decoration-none w-50">
                <button type="button" className="button-message flex-fill bodytext2 semibold text-white justify-content-center background-green500">
                    Lacak Pesanan
                </button>
            </Link>
            </>
            }

            {!loading && order !== null && order.status === 'Selesai' && 
            <>
            <Link to="/home/catalog" className="d-flex flex-fill text-decoration-none">
                <button type="submit" className="button-message flex-fill bodytext2 semibold text-white d-flex flex-row justify-content-center align-items-center background-green500" >
                    <p className="mb-0 py-1">Belanja Lagi</p>
                </button>
            </Link>
            </>
            }
        </nav>
        }
        </>
    );
}

export default OrderDetail;