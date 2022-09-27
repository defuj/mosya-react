import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../assets/styles/home.css';
import axios, {bannerlist, brandlist, carlist} from '../helper/axios';
import {checkAccount, getAccount, getBannerHome, getBrands, getListCar, setBannerHome, setBrands, setListCar} from '../helper/session';
import ImageSlider from "../components/ImageSlider";
import Loading from "../components/Loading";
import {Helmet} from "react-helmet";
import { stringToUrl } from "../helper/others";

const Home = React.memo(() => {
    const [banner, setBanner] = useState(getBannerHome());
    const [brand, setBrand] = useState(getBrands());
    const [car, setCar] = useState(getListCar());
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const onSearch = () => {
        if(keyword === ""){
            navigate('/products');
        }else{
            navigate('/products/'+keyword);
        }
    }

    const getBanner = () => {
        axios.get(bannerlist)
        .then(response => {
            let result = response.data;
            if(result.status){
                setBanner(result.data);
                setBannerHome(result.data)
            }else{
                setBanner([]);
                setBannerHome([])
            }
        }).catch(error => {
            setBanner([]);
        });
    }

    const getBrand = () => {
        axios.get(brandlist)
        .then(response => {
            let result = response.data;
            if(result.status){
                setBrand(result.data);
                setBrands(result.data);
            }else{
                setBrand([]);
                setBrands([]);
            }
        }).catch(error => {
            setBrand([]);
        });
    }

    const getCar = () => {
        axios.get(`${carlist}?limit=12`)
        .then(response => {
            let result = response.data;
            if(result.status){
                var cars = result.data;
                setCar(cars);
                setListCar(cars);
            }else{
                setCar([]);
                setListCar([]);
            }
        }).catch(error => {
            setCar([]);
        });
    }

    const BrandSlider = React.memo((props) => {
        const brands = props.brand;
        return (
            <>
            <div className="contaier-brand d-flex w-100 flex-row px-3 mt-4">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h2 className="bodytext1 color-black500 font-weight-bold">Merek Mobil</h2>
                    <Link to="/brands" className="text-decoration-none" title="daftar-brand-mobil">
                        <p className="caption color-green500 semibold">Lainnya</p>
                    </Link> 
                </div>
            </div>
            <div className="container-brand-text">
                <Link to="/products" className="bodytext2 text-decoration-none brand-slide active" title="daftar-produk">
                    Semua
                </Link>
                
                {brands.map((item,index) => 
                    index <= 6 && <Link to={'/products/'+item.name} title={`cari-mobil-${item.name}`} className="bodytext2 text-decoration-none flex-column brand-slide" key={item.id}>
                        {item.name}
                    </Link>
                )}
            </div>
            </>
        )
    })

    const CarContent = React.memo(({item}) => {
        return (
            <Link to={`/product/${item.id}/${stringToUrl(item.model)}`} title={`detail-mobil-${stringToUrl(item.model)}`} className="product-items w-50 flex-column" key={item.id}>
                <div className="product-cover mb-2" style={{backgroundImage: `url(${item.image_cover})`}}></div>
                <p className="bodytext1 color-black800 semibold m-0 px-2">{item.model}</p>
                <p className="bodytext2 color-black300 m-0 px-2">{item.year} | {item.color.length > 0 ? `${item.color.length} Warna` : 'Tidak Ada Warna'}</p>
                <p className="caption color-green500 m-0 py-1 px-2">{item.price}</p>
            </Link>
        );
    });

    const CarSection = (props) => {
        const cars = props.car;
        return (
            <>
            <div className="container-products w-100">
                <div className="w-100 d-flex justify-content-between align-items-center px-3 mt-4">
                    <h2 className="bodytext1 color-black500 font-weight-bold m-0">Mobil Tersedia</h2>
                    <Link to="/products" className="text-decoration-none" title="daftar-mobil">
                        <p className="caption color-green500 semibold m-0">Lainnya</p>
                    </Link>
                </div>
                <div id="container-product" className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-2 py-2">
                    
                    {cars.length >= 8 && cars.slice(0,8).map((item,index) => <CarContent item={item} key={item.id}/>)}
                </div>
            </div>
            </>
        )
    }

    // const testFunction = async () => {
    //     await imageUrlToBase64('https://admin.mosya.co.id/assets/banner/31-08-22-11-54-38.jpg', (result) => {
    //         console.log(result);
    //     })
    // }

    useEffect(() => {
        document.title = 'Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia';
        setCar(getListCar());
        setBanner(getBannerHome())
        setBrand(getBrands())
        getBanner();
        getBrand();
        getCar();
    }, []);


    return (
        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0">
            <Helmet
                title="Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia"
                meta={[
                    {"property" : "og:title", "content" : "Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia"},
                    {"property" : "og:description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                    {"property" : "og:image", "content" : 'https://admin.mosya.co.id/helper_assets/images/app_icon_title_h.png'},
                    {"property" : "og:image:type", "content" : 'image/png'},
                    {"property" : "og:url", "content" : window.location.href},
                    {"property" : "og:type", "content" : "website"},
                    {"property" : "og:site_name", "content" : "Mosya"},

                    {"name" : "twitter:title", "content" : 'Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia'},
                    {"name" : "twitter:description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                    {"name" : "twitter:image", "content" : "https://admin.mosya.co.id/helper_assets/images/app_icon_title_h.png"},
                    {"name" : "twitter:card", "content" : "summary_large_image"},
                    {"name" : "twitter:site", "content" : "@mosya.id"},
                    {"name" : "twitter:creator", "content" : "@mosya.id"},

                    {"name" : "description", "content" : "Mosya, pusat jual beli mobil syariah di Indonesia. Semua jenis dan merk mobil ada disini, temukan mobil impianmu hanya di Mosya tempat jual beli mobil syariah aman dan terpercaya"},
                    {"name" : "keywords", "content" : "cari mobil murah, mobil bekas murah, harga mobil bekas dibawah 50 juta, beli mobil bekas, mobil bekas, jual beli mobil bekas, mobil second murah, beli mobil second, jual mobil bekas, mobil cicilan syariah, mobil cicilan tanpa bunga, mobil cicilan syariah"},
                    {"name" : "author", "content" : "Sadigit"},
                    {"name" : "robots", "content" : "index, follow"},
                    {"name" : "googlebot", "content" : "index, follow"},
                    {"name" : "publisher", "content" : "Mosya"},
                    {"name" : "", "content" : ""},
                ]}/>
            <div className="container-user d-flex flex-row justify-content-between px-3 py-4">
                <div className="content-text flex-column w-100">
                <p className="bodytext2 color-black500 p-0 m-0" id="dataName">
                    {checkAccount() ? `Assalamualaikum, ${getAccount().name}` : 'Assalamualaikum'}
                </p>
                <h1 className="headline6 color-black500 semibold p-0 m-0">
                    Temukan mobil impian!
                </h1>
                
                </div>
                <Link className="content-image-profile flex-shrink" to="/home/profile" title="profile">
                    <div className="frame-image">
                        <img src={checkAccount() && getAccount().image !== null && getAccount().image !== '' ? getAccount().image : 'https://defuj.github.io/mosya.bootstrap/assets/images/user-default.png'} alt="profile" id="dataImage" title="image-profile"/>
                    </div>
                </Link>
            </div>

            <form action="products" onSubmit={onSearch} method="get" className="form-search container-search mx-3 mb-4 d-flex justify-content-between align-items-center" style={{height: '48px'}}>
                <div className="input-group-search bg-white h-100">
                    <input onChange={e => setKeyword(e.target.value)} type="text" name="search" className=" bodytext1 color-black800" placeholder="Cari mobil di sini ..." required/>
                </div>
                <button type="submit" className="h-100 d-flex align-items-center justify-content-center button-search ml-3" style={{width: '48px'}}>
                    <i className="fi fi-br-search text-white"></i>
                </button>
            </form>

            { banner.length === 0 && <Loading/>}
            { banner.length > 0 && <ImageSlider banner={banner}/>}
            
            { brand.length === 0 && <Loading/>}
            { brand.length > 0 && <BrandSlider brand={brand}/>}

            { car.length === 0 && <Loading/>}
            { car.length > 0 && <CarSection car={car}/>}
            
        </main>
    )
})

export default Home;