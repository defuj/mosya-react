import React, {useState, useEffect} from "react";
import axios, {cardetail} from '../helper/axios';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { Link, useNavigate, useParams } from "react-router-dom";
import { changeColorSelected, getDetailCar, setCurrentCar, setDetailCar } from "../helper/session";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import ImageSliderNav from "../components/ImageSliderNav";
import { Helmet } from "react-helmet";

const Product = () => {
    let { id } = useParams();
    const [car, setCar] = useState(getDetailCar(id));
    const [loading, setLoading] = useState(false);
    const [onOrder, setOnOrder] = useState(false);
    const [colorSelected, setColorSelected] = useState(null);

    const navigate = useNavigate();

    const setColor = (color) => {
        setColorSelected(color);
        changeColorSelected(color);
    }
    
    const getCar = () => {
        if(car === null){
            setLoading(true);
        }
        axios.get(cardetail + '?id=' + id)
        .then(response => {
            let result = response.data;
            if(result.status){
                setCar(result.data);
                setDetailCar(id, result.data);

                if(result.data.color.length > 0){
                    setColor(result.data.color[0]);
                }
            }else{
                setDetailCar(id, null);
            }
            setLoading(false);
        }).catch(error => {
            setCar(null);
            setLoading(false);
        });
    }

    const createRequest = () => {
        if(colorSelected !== null){
            setOnOrder(false);
            // axios.get(cardetail + '?id=' + id)
            // .then(response => {
            //     let result = response.data;
            //     setOnOrder(false);
            //     if(result.status){
            //         if(result.data.status === 'Ready'){
            //             navigate(`/order/${id}/identity`);
            //         }else{
            //             Swal.fire({
            //                 icon: 'error',
            //                 title: 'Oops...',
            //                 text: 'Mobil ini sudah tidak tersedia!',
            //             })
            //         }
            //     }else{
            //         Swal.fire({
            //             icon: 'error',
            //             title: 'Tidak Ditemukan',
            //             text: 'Data mobil tidak ditemukan',
            //             confirmButtonText: 'Mengerti',
            //         })
            //     }
            // }).catch(error => {
            //     setOnOrder(false);
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: 'Terjadi kesalahan saat mengambil data mobil, silahkan coba lagi',
            //         confirmButtonText: 'Mengerti',
            //     })
            // });
            setCurrentCar(car);
            navigate(`/order/${id}/identity`);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Perhatian',
                text: 'Silahkan pilih warna mobil',
                confirmButtonText: 'Mengerti'
            })
        }
        
    }

    useEffect(() => {
        setCar(getDetailCar(id));
        getCar();
    }, []);
    

    return (
        <>
        {car !== null && 
        <Helmet
            title={`Jual Mobil ${car.model}`}
            meta={[
                {"property" : "og:title", "content" : `Jual Mobil ${car.model}`},
                {"property" : "og:description", "content" : car.description.replace(/(\r\n|\n|\r)/gm, "")},
                {"property" : "og:image", "content" : car.image.length > 0 ? car.image[0] : 'https://admin.mosya.co.id/helper_assets/images/app_icon_title_h.png'},
                {"property" : "og:image:type", "content" : "image/png"},
                {"property" : "og:url", "content" : window.location.href},
                {"property" : "og:type", "content" : "website"},
                {"property" : "og:site_name", "content" : "Mosya"},
                {"name" : "twitter:title", "content" : `Jual Mobil ${car.model}`},
                {"name" : "twitter:description", "content" : car.description.replace(/(\r\n|\n|\r)/gm, "")},
                {"name" : "twitter:image", "content" : car.image[0]},
                {"name" : "twitter:card", "content" : "summary_large_image"},
                {"name" : "twitter:site", "content" : "@mosya.id"},
                {"name" : "twitter:creator", "content" : "@mosya.id"},

                {"name" : "description", "content" : car.description.replace(/(\r\n|\n|\r)/gm, "")},
                {"name" : "keywords", "content" : `beli mobil, jual mobil, mobil bekas, cari mobil, mobil second, mobil cicilan ${car.model.toLowerCase()}`},
                {"name" : "author", "content" : "Sadigit"},
                {"name" : "robots", "content" : "index, follow"},
                {"name" : "googlebot", "content" : "index, follow"},
                {"name" : "publisher", "content" : "Mosya"},
            ]}/>
        }
        
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="" className="navbar-brand" title="back" onClick={() => navigate(-1)}>
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2">Detail Mobil</p>
            </div>
        </nav>

        <main role="main" className="container-car container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-4" style={{minHeight: '1vh'}}>
            {loading && <Loading />}

            {!loading && car === null && <EmptyState/>}
            
            {car !== null && car.image.length > 0 && <ImageSliderNav banner={car.image} car={car}/>}

            {car !== null && 
            <div className="container-data mt-5 mb-3">
                <p className="color-black300 caption semibold mb-0 px-3" id="data-merk">
                    {car.brand}
                </p>
                <h2 className="color-black800 headline5 semibold px-3 mb-0" id="data-model">
                    {car.model}
                </h2>
                <p className="color-green500 bodytext1 semibold px-3 mb-4" id="data-price">
                    {car.price}
                </p>
        
                <p className="color-black500 bodytext1 semibold mb-1 px-3">Deskripsi</p>
                <p className="color-black500 bodytext2 px-3 text-justify" id="data-desc">
                    {car.description}
                </p>

                {car.catalog.link !== '' && 
                <a href={car.catalog.link} title="download-katalog-mobil" target="_blank" rel="noopener noreferrer" className="text-decoration-none container-spec d-flex align-content-start flex-wrap px-2 mb-3 data-spec" id="data-spec">
                    <div className="spec-item d-flex flex-row item-align-center justify-content-start w-100">
                        <i className="headline4 color-black400 fi fi-rr-document" style={{height: '32px'}}></i>
                        <div className="flex-fill align-items-center pl-3">
                            <p className="bodytext1 color-black500 semibold mb-0">Unduh Katalog Produk</p>
                            <p className="caption color-black300 mb-0 align-items-center">
                                <i className="bodytext2 color-black400 fi fi-rr-download mr-2"></i>
                                {car.catalog.size !== '' ? `${parseFloat(car.catalog.size/1024).toFixed(2)} MB` : '-'}
                            </p>
                        </div>
                    </div>
                </a>
                }

                <p className="color-black500 bodytext1 semibold mb-1 px-3">Spesifikasi</p>
                <div className="container-spec d-flex align-content-start flex-wrap px-2 mb-3 data-spec" id="data-spec">
                    <div className="spec-item flex-column justify-content-start">
                        <p className="caption color-black300 mb-0">Tahun</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.year !== undefined ? car.year : '-'}</p>
                    </div>

                    <div className="spec-item flex-column justify-content-start">
                        <p className="caption color-black300 mb-0">Bahan Bakar</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.fuel !== undefined ? car.fuel : '-'}</p>
                    </div>

                    <div className="spec-item flex-column justify-content-start">
                        <p className="caption color-black300 mb-0">Kilometer</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.kilometer !== undefined ? car.kilometer : '-'}</p>
                    </div>

                    <div className="spec-item flex-column justify-content-start">
                        <p className="caption color-black300 mb-0">Plat Nomor</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.plate_number !== undefined ? car.plate_number : '-'}</p>
                    </div>

                    
                </div>

                {car.color.length > 0 && 
                <>
                <p className="color-black500 bodytext1 semibold mb-1 px-3">Warna Tersedia</p>
                <div className="container-spec d-flex align-content-start flex-wrap px-2 data-dp mb-3">
                    {car.color.map((color, index) => 
                    <div className="spec-item flex-column justify-content-start" key={index}>
                        <p className="caption color-black300 mb-0">Warna</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{color !== '' ? color : '-'}</p>
                    </div>)} 
                </div>
                </>
                }
                
                <p className="color-black500 bodytext1 semibold mb-1 px-3">Harga &amp; Cicilan</p>
                <div className="container-spec d-flex align-content-start flex-wrap px-2 data-dp mb-3" id="data-dp">
                    <div className="spec-item flex-column justify-content-start flex-fill">
                        <p className="caption color-black300 mb-0">Tunai</p>
                        <p className="bodytext2 color-black500 semibold mb-0">{car.price}</p>
                    </div>

                    <div className="spec-item flex-column justify-content-start flex-fill">
                        <p className="caption color-black300 mb-0">Booking Fee</p>
                        <p className="bodytext2 color-black500 semibold mb-0">Rp 200.000</p>
                    </div>

                    {car.payments.map((pay, index) => 
                    <div className="spec-item d-flex flex-row justify-content-start w-100" key={index}>
                        <div className="flex-fill w-50">
                            <p className="caption color-black300 mb-0">DP</p>
                            <p className="bodytext2 color-black500 semibold mb-0">{pay.dp}</p>
                        </div>
                        <div className="flex-fill w-50">
                            <p className="caption color-black300 mb-0">Cicilan</p>
                            <p className="bodytext2 color-black500 semibold mb-0">{pay.cicilan}</p>
                        </div>
                    </div>
                    )}
                </div>
        
                <p className="color-black500 bodytext1 semibold mb-2 px-3">Kontak</p>
                    <div className="container-contact d-flex flex-row align-items-center px-3 py-3 mx-3 mb-5">
                    <img src={require('../assets/images/contact.jpg')} alt="image-contact-person" title="content-person" className="mr-3"/>
                    <div className="flex-column flex-fill">
                        <p className="mb-0 bodytext1 semibold color-black600">Sintia</p>
                        <p className="mb-0 bodytext2 color-black300">Narahubung</p>
                    </div>
                    <a href="https://wa.me/+6285315131514/?text=Hallo," target="_blank" id="sendMessage" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="fi fi-brands-whatsapp mr-2 px-2 mt-1" ></i>
                    </a>
                    
                    <i className="fi fi-rr-phone-call  px-2 mt-1" onClick={() => window.open('tel:+6285315131514')}></i>
                </div>
            </div>
            }
        </main>
        <Footer withNavigation={car !== null && car.status === 'Ready' && car.color.length > 0}/>
        {car !== null && car.status === 'Ready' && car.color.length > 0 && 
        <>
        <nav className="navbar bottom-nav-buy fixed-bottom navbar-expand bg-white px-3 py-3 shadow-sm col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center m-auto">
            <form className="text-decoration-none d-flex flex-fill">
                <button id="toggleFilter" data-toggle="modal" data-target="#dialogFilter" disabled={onOrder && 'disabled'} className="button-message flex-fill bodytext2 semibold text-white d-flex flex-row justify-content-center align-items-center background-green500" type="button">
                    <p className="mb-0 py-1">
                        {onOrder ? <Spinner/> : 'Pesan Mobil'}
                    </p>
                </button>
            </form>
        </nav>

        {car.color.length > 0 && 
        <div className="modal fade" id="dialogFilter" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="modal-content modal-filter-content">
                    <div className="modal-header">
                        <h5 className="modal-title headline6" id="staticBackdropLabel">Pilihan Warna</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fi fi-br-cross headline6"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-row product-section-payment justify-content-between mb-3">
                            <img id="dataImage" title={car.model.replaceAll(' ','-').replaceAll('.','-').toLowerCase()} src={car.image_cover} alt={car.model.replaceAll(' ','-').replaceAll('.','-').toLowerCase()}/>
                            <div className="flex-fill ml-3">
                                <p className="caption color-green500 semibold mb-0" id="dataMerk">{car.brand}</p>
                                <p className="headline6 semibold color-black800 mb-0" id="dataModel">{car.model}</p>
                                <p className="bodytext1 color-black300 mb-0" id="dataColorYear">{colorSelected} | {car.year}</p>
                            </div>
                        </div>
                        <p className="textbody1 semibold mb-2">Warna Tersedia</p>
                        <div className="container-select-color d-flex align-content-start flex-wrap flex-wrap w-100 my-2">
                            {car.color.map((color, index) =>  
                            <label onClick={() => setColor(color)} className={colorSelected === color ? 'select-item select-color-item active' : 'select-item select-color-item'} key={'color'+index}>
                                {color}
                            </label>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer justify-content-around">
                        <button onClick={createRequest} type="button" className="btn flex-fill button-message background-green500 bodytext2 text-white" data-dismiss="modal" id="buttonFilter">Lanjutkan Pemesanan</button>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
        }


        
        </>
    )
}

export default Product;