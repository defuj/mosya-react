import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import axios, { cardetail } from "../helper/axios";
import { deleteCurrentCar, setDataBooking } from "../helper/session";

const OrderInputIdentity = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [name,setName] = useState('');
    const [name2,setName2] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const getCar = () => {
        setLoading(true);
        axios.get(cardetail + '?id=' + id)
        .then(response => {
            let result = response.data;
            setLoading(false);
            if(result.status){
                setCar(result.data);
            }else{
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
            setCar(null);
            setLoading(false);

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
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const prepareDataBooking = async () => {
        const inputCarId = document.querySelector('#inputCardId');
        const inputCardFamilly = document.querySelector('#inputCardFamilly');
        const inputCardId2 = document.querySelector('#inputCardId2');

        let data = {
            name: name,
            address: address,
            phone: phone,
            cardId: await toBase64(inputCarId.files[0]),
            cardIdName: inputCarId.files[0].name,
            cardFamilly: await toBase64(inputCardFamilly.files[0]),
            cardFamillyName: inputCardFamilly.files[0].name,
            name2: name2,
            cardId2: inputCardId2.files.length > 0 ? await toBase64(inputCardId2.files[0]) : null,
            cardId2Name: inputCardId2.files.length > 0 ? inputCardId2.files[0].name : null,
        }
        setDataBooking(data)
    }

    const createOrder = () => {
        const inputCarId = document.querySelector('#inputCardId');
        const inputCardFamilly = document.querySelector('#inputCardFamilly');

        if(name === ''){
            Swal.fire({
                title: 'Perhatian',
                text: 'Nama lengkap harus diisi',
                icon: 'error',
                confirmButtonText: 'Mengerti',
            })
        }else{
            if(address === ''){
                Swal.fire({
                    title: 'Perhatian',
                    text: 'Alamat lengkap harus diisi',
                    icon: 'error',
                    confirmButtonText: 'Mengerti',
                })           
            }else{
                if(phone === ''){
                    Swal.fire({
                        title: 'Perhatian',
                        text: 'Nomor HP harus diisi',
                        icon: 'error',
                        confirmButtonText: 'Mengerti',
                    })
                }else{
                    if(inputCarId.files.length === 0){
                        Swal.fire({
                            title: 'Perhatian',
                            text: 'File KTP harus diisi',
                            icon: 'error',
                            confirmButtonText: 'Mengerti',
                        })
                    }else{
                        if(inputCardFamilly.files.length === 0){
                            Swal.fire({
                                title: 'Perhatian',
                                text: 'File KK harus diisi',
                                icon: 'error',
                                confirmButtonText: 'Mengerti',
                            })
                        }else{
                            prepareDataBooking();
                            navigate(`/order/${id}/payments`, { replace: true });
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        document.title = 'Identitas Pembeli';
        getCar();
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

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-2">
            {loading && <Loading/>}
            {!loading && car !== null && 
            <form className="container-form px-3 py-3 bg-white d-flex flex-column mb-3">
                <p className="headline6 color-black500 semibold p-0 mb-4">
                    Identitas Pembeli
                </p>

                <input type="text" name="id" id="productId" hidden/>
                <label className="bodytext1 color-black500 p-0 mb-1">
                    Nama Lengkap <span className="text-danger">*</span>
                </label>
                <input onKeyUp={e => setName(e.target.value)} type="text" id="inputName" name="name" maxLength="100" className="form-input form-data-booking bodytext2 mb-3" placeholder="Masukan nama lengkap" required/>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Alamat Lengkap <span className="text-danger">*</span>
                </label>
                <input onKeyUp={e => setAddress(e.target.value)} type="text" id="inputAddress" name="address" maxLength="250" className="form-input form-data-booking bodytext2 mb-3" placeholder="Masukan alamat lengkap" required/>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Nomor HP <span className="text-danger">*</span>
                </label>
                <input onKeyUp={e => setPhone(e.target.value)} type="number" id="inputPhone" name="phone" maxLength="15" className="form-input form-data-booking bodytext2 mb-3" placeholder="Masukan nomor hp" required/>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Upload KTP <span className="text-danger">*</span>
                </label>
                <input type="file" accept="image/*,.pdf" name="cardId" id="inputCardId" className="form-input form-data-file-booking bodytext2" placeholder="Pilih file KTP" encType="multipart/form-data" required/>
                <p className="mb-3 caption color-black300 mt-1">format file: JPG,JPEG, PNG,PDF max upload 2Mb</p>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Upload KK <span className="text-danger">*</span>
                </label>
                <input type="file" accept="image/*,.pdf" name="cardFamilly" id="inputCardFamilly" className="form-input form-data-file-booking bodytext2" placeholder="Pilih file KK" encType="multipart/form-data" required/>
                <p className="mb-3 caption color-black300 mt-1">format file: JPG,JPEG, PNG,PDF max upload 2Mb</p>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Nama Lengkap Pasangan (Jika Ada)
                </label>
                <input onKeyUp={e => setName2(e.target.value)} type="text" name="name2" id="inputName2" maxLength="100" className="form-input form-data-booking bodytext2 mb-3" placeholder="Masukan nama lengkap pasangan" encType="multipart/form-data"/>

                <label className="bodytext1 color-black500 p-0 mb-1">
                    Upload KTP Pasangan (Jika Ada)
                </label>
                <input type="file" accept="image/*,.pdf" name="cardId2" id="inputCardId2" className="form-input form-data-file-booking bodytext2" placeholder="Pilih file KTP" encType="multipart/form-data"/>
                <p className="mb-3 caption color-black300 mt-1">format file: JPG,JPEG, PNG,PDF max upload 2Mb</p>
            </form>
            }
        </main>

        <Footer withNavigation={!loading && car !== null}/>
        
        {!loading && car !== null && 
        <nav className="navbar bottom-nav-buy fixed-bottom navbar-expand bg-white px-3 py-3 shadow-sm col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center m-auto">
            <button onClick={createOrder} id="buttonSubmit" className="button-message flex-fill bodytext2 semibold text-white d-flex flex-row justify-content-center align-items-center background-green500" type="button">
                <p className="mb-0 py-1">Selanjutnya</p>
            </button>
        </nav>
        }
        
        </>
    );
}

export default OrderInputIdentity;