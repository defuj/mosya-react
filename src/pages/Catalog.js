import React, {useState, useEffect} from "react";
import axios, {cataloglist} from '../helper/axios';
import Catalogs from "../components/Catalog";
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { useNavigate } from "react-router-dom";
import { getCatalogCar, safeString, setCatalogCar } from "../helper/session";

const Catalog = React.memo(() => {
    const [catalog, setCatalog] = useState(getCatalogCar());
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    let navigate = useNavigate();

    const getCatalog = () => {
        setLoading(true);
        axios.get(cataloglist)
        .then(response => {
            let result = response.data;
            if(result.status){
                setCatalog(result.data);
                setCatalogCar(result.data)
            }else{
                setCatalog([]);
                setCatalogCar([])
            }
            setLoading(false);
        }).catch(error => {
            setCatalog([]);
            setLoading(false);
        });
    }

    const onSearch = () => {
        if(keyword === ""){
            navigate('/products');
        }else{
            navigate('/products/'+keyword);
        }
    }

    useEffect(() => {
        document.title = 'Katalog Mobil - Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia';
        setLoading(true);
        setCatalog(getCatalogCar())
        getCatalog();
    }, []);
    

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-between align-items-center flex-column py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <form onSubmit={onSearch} id="form-search" className="container-search form-search w-100 d-flex justify-content-between align-items-center" style={{height: '48px'}}>
                    <div className="input-group-search background-black50 h-100">
                        <i className="fi fi-br-search color-black200 mr-2 headline5"></i>
                        <input type="text" onChange={e => setKeyword(safeString(e.target.value))} name="search" className="bodytext1" id="input-search" placeholder="Cari mobil ..."/>
                    </div>
                    <button type="submit" className="h-100 d-flex align-items-center justify-content-center button-search ml-3 menu-filter" style={{width: '48px'}}>
                        <i className="fi fi-rr-search text-white headline5"></i>
                    </button>
                </form>
            </div>
        </nav>

        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-4 pl-0 pr-0 mt-5">
            {loading && catalog.length === 0 && <Loading />}
            {!loading && catalog.length === 0 && <EmptyState />}

            <div className="container-products w-100 mb-2">
                <div className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-2 py-1">
                    {catalog.length > 0 && <Catalogs catalog={catalog} />}
                </div>
            </div>
        </main>
        </>
    )
})

export default Catalog;