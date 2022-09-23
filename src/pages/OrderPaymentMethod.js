import React,{useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Spinner from "../components/Spinner";
import axios, { cardetail, ordercreate, orderpayment, orderupload } from "../helper/axios";
import { deleteCurrentCar, deleteLastBooking, getAccount, getColorSelected, getCurrentCar, getDataBooking, getLastBooking, setBooking, setLastBooking } from "../helper/session";
const OrderPaymentMethod = React.memo(() => {
    const { id } = useParams();
    const [car, setCar] = useState(getCurrentCar());
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(null);

    const navigate = useNavigate();

    // const getCar = () => {
    //     setLoading(true);
    //     if(getDataBooking() !== null){
    //         axios.get(cardetail + '?id=' + id)
    //         .then(response => {
    //             let result = response.data;
    //             setLoading(false);
    //             if(result.status){
    //                 setCar(result.data);
    //             }else{
    //                 deleteCurrentCar();
    //                 Swal.fire({
    //                     title: 'Perhatian',
    //                     text: 'Mobil yang anda pilih tidak tersedia',
    //                     icon: 'error',
    //                     confirmButtonText: 'Kembali',
    //                     allowOutsideClick: false,
    //                 }).then((result) => {
    //                     if (result.value) {
    //                         deleteCurrentCar();
    //                         navigate(-1);
    //                     }
    //                 })
    //             }
    //         }).catch(error => {
    //             setCar(null);
    //             setLoading(false);

    //             deleteCurrentCar();
    //             Swal.fire({
    //                 title: 'Perhatian',
    //                 text: 'Terjadi kesalahan, silahkan kembali lagi nanti',
    //                 icon: 'error',
    //                 confirmButtonText: 'Kembali',
    //                 allowOutsideClick: false,
    //             }).then((result) => {
    //                 if (result.value) {
    //                     deleteCurrentCar();
    //                     navigate(-1);
    //                 }
    //             })
    //         });
    //     }else{
    //         Swal.fire({
    //             title: 'Perhatian',
    //             text: 'Terjadi kesalahan, silahkan kembali lagi nanti',
    //             icon: 'error',
    //             confirmButtonText: 'Kembali',
    //             allowOutsideClick: false,
    //         }).then((result) => {
    //             if (result.value) {
    //                 deleteCurrentCar();
    //                 navigate(-1);
    //             }
    //         })
    //     }
    // }

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
        
        return new File([u8arr], filename, {type:mime});
    }

    const uploadPaymentType = (code) => {
        setProgress(true);
        axios.postForm(orderpayment,{
            code: code,
            payment_method: parseInt(paymentSelected)
        })
        .then(response => {
            setProgress(false);
            let result = response.data;
            //console.log('result upload payment type : ');
            //console.log(result);
            if(result.status){
                deleteLastBooking(`${car.id}`);
                Swal.fire({
                    title: 'Pemesanan berhasil',
                    text: 'Silahkan lakukan pembayaran sesuai dengan metode yang anda pilih',
                    icon: 'success',
                    confirmButtonText: 'Mengerti',
                    allowOutsideClick: false,
                }).then((result)=>{
                    if(result.value){
                        navigate(`/order/${code}/bill`, { replace: true });
                    }
                })
            }else{
                setProgress(false);
                Swal.fire({
                    title: 'Gagal',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Mengerti'
                })
            }
        }).catch(error => {
            //console.log(error);
            setProgress(false);
            Swal.fire({
                title: 'Perhatian',
                text: 'Gagal mengupload file',
                icon: 'error',
                confirmButtonText: 'Mengerti',
            })
        });
    }

    const uploadImage = (code) => {
        setProgress(true);
        const data = getDataBooking();
        const postForm = {
            code: code,
            card_id: dataURLtoFile(data.cardId,data.cardIdName),
            card_familly: dataURLtoFile(data.cardFamilly, data.cardFamillyName),
            card_id_2: data.cardId2 != null ? dataURLtoFile(data.cardId2, data.cardId2Name) : null,
        }
        axios.postForm(orderupload, postForm)
        .then(response => {
            let result = response.data;
            //console.log('result upload image : ');
            //console.log(result);
            if(result.status){
                const lastBooking = getLastBooking(`${car.id}`)
                setLastBooking(`${car.id}`,{
                    car: lastBooking.car,
                    code: lastBooking.code,
                    image: true,
                });
                uploadPaymentType(code);
            }else{
                setProgress(false);
                Swal.fire({
                    title: 'Gagal',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Mengerti',
                })
            }
        }).catch(error => {
            //console.log(error);
            setProgress(false);
            Swal.fire({
                title: 'Perhatian',
                text: 'Gagal mengupload file',
                icon: 'error',
                confirmButtonText: 'Mengerti',
            })
        })
    }

    const uploadData = () => {
        setProgress(true);
        const user = getAccount();
        const data = getDataBooking();
        axios.postForm(ordercreate, {
            id: user.id,
            id_car: car.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            name_2: data.name2,
            note : getColorSelected() !== null ? getColorSelected() : null,
        }).then(response => {
            let result = response.data;
            //('result upload data:');
            //console.log(result);
            if(result.status){
                const code = result.code;
                setBooking({
                    car: car.id,
                    code: code,
                });
                setLastBooking(`${car.id}`,{
                    car: car.id,
                    code: code,
                    image: false
                });
                uploadImage(code);
            }else{
                setProgress(false);
                Swal.fire({
                    title: 'Perhatian',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Mengerti',
                })
            }
        }).catch(error => {
            //console.log(error);
            setProgress(false);
            Swal.fire({
                title: 'Perhatian',
                text: 'Terjadi kesalahan',
                icon: 'error',
                confirmButtonText: 'Mengerti',
            })
        });
    }

    const createOrder = () => {
        if(paymentSelected !== null){
            setProgress(true);
            axios.get(cardetail + '?id=' + id)
            .then(response => {
                let result = response.data;
                //console.log('result create order:');
                //console.log(result);
                if(result.status){
                    if(result.data.status === 'Ready'){
                        let lastBooking = getLastBooking(id);
                        if(lastBooking === null){
                            uploadData();
                        }else{
                            if(lastBooking.image){
                                uploadPaymentType(lastBooking.code);
                            }else{
                                uploadImage(lastBooking.code);
                            }
                        }
                    }else{
                        setProgress(false);
                        Swal.fire({
                            title: 'Perhatian',
                            text: 'Mobil yang anda pilih sudah tidak tersedia',
                            icon: 'error',
                            confirmButtonText: 'Kembali',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.value) {
                                deleteCurrentCar();
                                navigate(-1);
                            }
                        })
                    }
                }else{
                    setProgress(false);
                    deleteCurrentCar();
                    Swal.fire({
                        title: 'Perhatian',
                        text: 'Mobil yang anda pilih tidak tersedia',
                        icon: 'error',
                        confirmButtonText: 'Kembali',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            deleteCurrentCar();
                            navigate(-1);
                        }
                    })
                }
            }).catch(error => {
                //console.log(error);
                setProgress(false);
                deleteCurrentCar();
                Swal.fire({
                    title: 'Perhatian',
                    text: 'Terjadi kesalahan, silahkan kembali lagi nanti',
                    icon: 'error',
                    confirmButtonText: 'Kembali',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        deleteCurrentCar();
                        navigate(-1);
                    }
                })
            });
        }else{
            Swal.fire({
                title: 'Perhatian',
                text: 'Silahkan pilih metode pembayaran',
                icon: 'error',
                confirmButtonText: 'Mengerti',
            })
        }
    }

    useEffect(() => {
        document.title = 'Pilih Metode Pembayaran';
        setCar(getCurrentCar());
        setLoading(false);
        // getCar();
    }, []);

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="" className="navbar-brand" title="back" onClick={() => navigate(-1)}>
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2">Informasi Pemesanan</p>
            </div>
        </nav>

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-2" style={{minHeight: '330px'}}>
            {loading && <Loading/>}
            {!loading && car !== null && 
            <div className="container-form px-3 py-3 bg-white d-flex flex-column mb-3">
                <p className="headline6 color-black500 semibold p-0 mb-3">
                    Rencana Pembayaran
                </p>
                <div className="d-flex flex-row product-section-payment justify-content-between mb-3">
                    <img id="dataImage" src={car.image_cover} alt=""/>
                    <div className="flex-fill ml-3">
                        <p className="caption color-green500 semibold mb-0" id="dataMerk">{car.brand}</p>
                        <p className="headline6 semibold color-black800 mb-0" id="dataModel">{car.model}</p>
                        <p className="bodytext1 color-black300 mb-0" id="dataColorYear">{getColorSelected()} | {car.year}</p>
                    </div>
                </div>
                <p className="bodytext1 color-black500 semibold p-0 mb-2">
                    Pilih Pembayaran
                </p>
                <form id="formPayment" name="formPayment" className="container-payment-type d-flex flex-column">
                    <label onClick={() => setPaymentSelected(0)} className={paymentSelected === 0 ? 'payment-type-item d-flex flex-column justify-content-start w-100 mb-2 active' : 'payment-type-item d-flex flex-column justify-content-start w-100 mb-2'}>
                        <p className="bodytext2 color-black500 semibold mb-1">Cash</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.price}</p>
                    </label>
                    {car.payments.map((pay, index) => 
                    <label onClick={() => setPaymentSelected(pay.id)} className={paymentSelected === pay.id ? 'payment-type-item d-flex flex-column justify-content-start w-100 mb-2 active' : 'payment-type-item d-flex flex-column justify-content-start w-100 mb-2'} key={index}>
                        <p className="bodytext2 color-black500 semibold mb-1">{pay.label}</p>
                        <div className="d-flex flex-fill flex-row justity-content-between w-100">
                            <p className="bodytext2 flex-fill color-black500 semibold mb-0">DP: {pay.dp}</p>
                            <p className="bodytext2 color-black500 semibold mb-0">Cicilan: {pay.cicilan}</p>
                        </div>
                    </label>    
                    )}
                </form>
            </div>
            }
        </main>

        <Footer withNavigation={!loading && car !== null}/>

        {!loading && car !== null && 
        <nav className="navbar bottom-nav-buy fixed-bottom navbar-expand bg-white px-3 py-3 shadow-sm col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center m-auto">
            <button onClick={() => navigate(-1)} type="reset" className="btn flex-fill button-action-filter button-back-payment w-50 bg-white bodytext2 semibold color-green500 mr-2">
                Kembali
            </button>
            <button onClick={createOrder} disabled={progress && 'disabled'} id="buttonSubmit" className="button-message flex-fill bodytext2 semibold w-50 text-white d-flex flex-row justify-content-center align-items-center background-green500" type="button">
                <p className="mb-0 py-1">
                    {progress ? <Spinner/> : 'Konfirmasi'}
                </p>
            </button>
        </nav>
        }
        </>
    );
});

export default OrderPaymentMethod;