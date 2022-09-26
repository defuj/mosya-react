import React, {useState, useEffect} from "react";
import {
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";
import Footer from "../components/Footer";
import axios, { brandlist, carlist } from "../helper/axios";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { safeString } from "../helper/session";

const Brands = () => {
    let { keyword } = useParams();
    const [brands, setBrands] = useState([]);
    const [cars, setCars] = useState([]);
    const [onProgress, setProgress] = useState(false);
    const [keywords, setKeywords] = useState(keyword === undefined ? "" : keyword);
    const navigate = useNavigate();

    const getBrands = () => {
        setProgress(true);
        axios.get(brandlist)
        .then(response => {
            setProgress(false);
            let result = response.data;
            if(result.status){
                // console.log(`keyword : ${keyword}`);
                // console.log(`keywords : ${keywords}`);
                if(keywords === ''){
                    setBrands(result.data);
                }else{
                    let filtered = result.data.filter(brand => brand.name.toLowerCase().includes(keywords.toLowerCase()));
                    setBrands(filtered);
                }
            }else{
                setBrands([]);
            }
        }).catch(error => {
            setProgress(false);
            setBrands([]);
        });
    }

    const reGetBrands = (e) => {
        if(keywords === ""){
            navigate('/brands', {replace: true});
        }else{
            navigate('/brands/'+keywords, {replace: true});
        }
        e.preventDefault();
        getBrands();
    }

    const getCars = () => {
        setProgress(true);
        axios.get(carlist)
        .then(response => {
            setProgress(false);
            let result = response.data;
            if(result.status){
                var cars = result.data;
                setCars(cars);
            }else{
                setCars([]);
            }
        }).catch(error => {
            setProgress(false);
            setCars([]);
        });
    }

    const setupKeyword = (keyword) => {
        setKeywords(keyword);

        if(keyword === ""){
            navigate('/brands', {replace: true});
            getBrands();
        }
    }

    useEffect(() => {
        document.title = "Merek Mobil";
        setKeywords(keyword === undefined ? '' : keyword);
        cars.length === 0 && getCars();
        getBrands();        
    }, [])

    const onBack = () => {
        navigate(-1);
    }

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="" className="navbar-brand" title="back" onClick={onBack}>
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2 py-2">List Merek Mobil</p>
            </div>
        </nav>

        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5">
            <div className="container-user d-flex flex-row justify-content-between px-3 py-4">
                <div className="content-text flex-column w-100">
                    <p className="headline5 color-black500 semibold p-0 mb-1">
                        Merek Mobil Tersedia
                    </p>
                    <p className="bodytext2 color-black500 p-0 m-0">
                        Merek mobil  yang tersedia di mosya
                    </p>
                </div>
            </div>

            <form onSubmit={reGetBrands} className="form-search container-search mx-3 mb-4 d-flex justify-content-between align-items-center" style={{height: '48px'}}>
                <div className="input-group-search bg-white h-100">
                    <input type="text" defaultValue={keywords} onChange={e => setupKeyword(safeString(e.target.value))} id="search-merk" className="bodytext1 color-black800" placeholder="Cari merk mobil"/>
                </div>
                <button onClick={reGetBrands} type="button" className="h-100 d-flex align-items-center justify-content-center button-search ml-3" style={{width: '48px'}}>
                    <i className="fi fi-br-search text-white headline6"></i>
                </button>
            </form>
            
            <div className="container-merk d-flex flex-wrap align-content-start px-2 mb-3" id="container-merk" style={{minHeight: '200px'}}>
                {onProgress && <Loading/>}
                {!onProgress && brands.length > 0 && brands.map((brand, index) => {
                    const countCar = cars.filter(car => car.brand.toString().toLowerCase() === brand.name.toString().toLowerCase()).length;
                    return (
                    <Link to={`/products/${brand.name}`} title={`daftar-mobil-${brand.name}`} className="merk-item text-decoration-none" key={index}>
                        <p className="bodytext1 color-black500 semibold mb-0 merk-name">{brand.name}</p>
                        <p className="caption color-black400 mb-0 merk-car">{countCar > 99 ? '99+ Mobil Tersedia' : countCar === 0 ? 'Tidak Ada Mobil' : countCar+' Mobil Tersedia'}</p>
                    </Link>
                    )})}
            </div>
            {!onProgress && brands.length === 0 && <EmptyState imageWidth="120" wrapHeight={true} title={keyword === undefined ? 'Tidak ada merk' : `Merk <span class="color-green500 semibold">"${keyword}"</span> Tidak Ditemukan`} desc={keyword === undefined ? 'Silahkan coba lagi nanti' : `Silahkan gunakan kata kunci lain`} />}
        </main>
        
        <Footer/>

        </>
    )
}

export default Brands;