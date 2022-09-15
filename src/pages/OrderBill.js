import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Spinner from "../components/Spinner";
import axios, { orderpaymentinfo, orderuploadpayment } from "../helper/axios";

const OrderBill = () => {
    const { code } = useParams();
    const [loading , setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(false);
    
    const navigate = useNavigate();

    const uploadFile = () => {
        const image = document.querySelector('#buktiBayar')
        if(image.files.length > 0){
            setProgress(true);
            axios.postForm(orderuploadpayment,{
                code: code,
                image: image.files[0]
            }).then(response => {
                setProgress(false);
                let result = response.data;
                if(result.status){
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Bukti pembayaran berhasil dikirim.',
                    confirmButtonText: 'Lanjutkan',
                }).then(()=>{
                    navigate('/home/history', {replace: true});
                })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Perhatian',
                        text: result.message,
                        confirmButtonText: 'Mengerti',
                    })
                }
            }).catch(error => {
                setProgress(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Silahkan mencoba lagi nanti',
                    confirmButtonText: 'Mengerti',
                })
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Perhatian',
                text: 'Bukti pembayaran belum dipilih',
                confirmButtonText: 'Mengerti',
            })
        }
    }

    const copyContent = (content) => {
        navigator.clipboard.writeText(content).then(function() {
            console.log('Berhasil disalin ke clipboard');
            alert('Berhasil disalin ke clipboard');
        }, function(err) {
            console.error('Tidak dapat menyalin', err);
            alert('Tidak dapat menyalin');
        });
    }

    const getOrder = async () => {
        setLoading(true);
        axios.postForm(orderpaymentinfo,{
            code: code
        })
        .then(response => {
            let result = response.data;
            setLoading(false);
            if(result.status){
                const data = result.data;   
                setData(data); 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Perhatian',
                    text: result.message,
                    confirmButtonText: 'Kembali',
                }).then(() => {
                    navigate('/home/history', { replace: true });
                });
            }
        }).catch(error => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Telah terjadi kesalahan, silahkan mencoba lagi nanti',
                confirmButtonText: 'Kembali',
            }).then(() => {
                navigate('/home/history', { replace: true });
            });
        });
    }

    useEffect(() => {
        document.title = "Unggah Bukti Bayar";
        setLoading(true);
        getOrder();
    }, []);

    return(
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="" onClick={() => navigate(-1)} className="navbar-brand" title="back">
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2">Informasi Pembayaran Booking</p>
            </div>
        </nav>

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-2">
            {loading && <Loading/>}
            {!loading && data !== null && 
            <>
            <div className="container-form px-3 py-3 bg-white d-flex flex-column mb-3">
                <p className="bodytext1 color-black500 semibold p-0 mb-4">
                    Untuk melanjutkan booking, harap transfer sesuai petunjuk di bawah!
                </p>
                <p className="bodytext1 color-black500 semibold p-0">
                    Bank BRI (Transfer)
                </p>

                <p className="caption color-black500 p-0 mb-1">
                    Nomor Rekening
                </p>
                <div className="d-flex flex-fill flex-column-justify-content-between mb-0">
                    <p className="bodytext2 color-black500 p-0 flex-fill">
                        <b id="norek">1246476978028</b>
                    </p>
                    <Link to="" className="text-decoration-none bodytext2 semibold color-green500 p-0" onClick={() => copyContent('1246476978028')}>
                        Salin
                    </Link>
                </div>

                <p className="caption color-black500 p-0 mb-1">
                    Kode Unik
                </p>
                <p className="bodytext2 color-black500 p-0 flex-fill" id="codeUnique">
                    {data.code_unique}
                </p>

                <p className="caption color-black500 p-0 mb-1">
                    Total Bayar
                </p>
                <div className="d-flex flex-fill flex-column-justify-content-between mb-0">
                    <p className="bodytext2 color-black500 p-0 flex-fill" id="totalPayment">
                        {data.total_payment}
                    </p>
                    <Link to="" className="text-decoration-none bodytext2 semibold color-green500 p-0" onClick={() => copyContent(data.total_payment)}>
                        Salin
                    </Link>
                </div>

                <p className="caption semibold text-danger p-0">
                    * Pastikan untuk membayar sesuai total bayar!
                </p>
            </div>

            <form className="container-form px-3 py-3 bg-white d-flex flex-column mb-3">
                <p className="bodytext1 color-black500 semibold p-0 mb-4">
                    Upload Bukti Bayar
                </p>
              
                <input type="file" accept="image/*,.pdf" name="payment-image" id="buktiBayar" className="form-input form-data-file-booking bodytext2" placeholder="Pilih file" encType="multipart/form-data"/>
                <p className="mb-3 caption color-black300 mt-1">format file: JPG,JPEG, PNG,PDF max upload 2Mb</p>
                <button onClick={uploadFile} disabled={progress && 'disabled'} type="button" id="buttonSubmit" className="button-message flex-fill bodytext2 semibold text-white d-flex flex-row justify-content-center align-items-center background-green500">
                    <p className="mb-0 py-1">
                        {progress ? <Spinner/> : 'Kirim Bukti Pembayaran'}
                    </p>
                </button>
            </form>


            <div className="container-form px-3 py-3 bg-white d-flex flex-column mb-3">
                <p className="bodytext1 color-black500 semibold p-0 mb-4">
                    Petunjuk Transfer Bank
                </p>
                <div className="accordion payment-guide" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <button className="btn btn-link btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <p className="mb-0 flex-fill">Petunjuk Transfer ATM</p>
                                <i className="fi fi-br-angle-down down bodytext1"></i>
                                <i className="fi fi-br-angle-up up bodytext1"></i>
                            </button>
                        </div>
                
                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                Belum ada informasi
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <button className="btn btn-link btn-block text-left d-flex justify-content-between collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <p className="mb-0 flex-fill">Petunjuk Transfer iBanking</p>
                            <i className="fi fi-br-angle-down down bodytext1"></i>
                            <i className="fi fi-br-angle-up up bodytext1"></i>
                            </button>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                            Belum ada informasi
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <button className="btn btn-link btn-block text-left d-flex justify-content-between" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                            <p className="mb-0 flex-fill">Petunjuk Transfer mBanking</p>
                            <i className="fi fi-br-angle-down down bodytext1"></i>
                            <i className="fi fi-br-angle-up up bodytext1"></i>
                            </button>
                        </div>
                        <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div className="card-body">
                                <ol type="1">
                                    <li>Buka aplikasi, kemudian pilih menu Mobile Banking BRI.</li>
                                    <li>Untuk mengirim uang, tap menu Transfer.</li>
                                    <li>Untuk transfer ke sesama rekening BRI, tap menu Sesama BRI.</li>
                                    <li>Pada halaman baru, masukkan nomor rekening BRI yang dituju.</li>
                                    <li>Masukkan jumlah transfer yang akan dikirim.</li>
                                    <li>Klik OK. Lalu, masukkan PIN Mobile Banking BRI Anda. Klik SEND.</li>
                                    <li>Untuk melakukan verifikasi SMS, Klik OK.</li>
                                    <li>Terima SMS dari Mobile Banking BRI, lalu ketik YA <br/> Kode Transaksi. Kalau bingung, ikuti saja petunjuk yang ada pada SMS tersebut.</li>
                                    <li>Kalau sudah benar, langsung Kirim SMS.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            }
        </main>

        <Footer/>
        </>
    );
}

export default OrderBill;