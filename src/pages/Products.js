import React, {useState, useEffect} from "react";
import axios, {carlist} from '../helper/axios';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListCar } from "../helper/session";
import Footer from "../components/Footer";
import { safeString, slugify } from "../helper/others";

const Products = () => {
    let { keyword } = useParams();
    const [cars, setCars] = useState(getListCar());
    const [keywords, setKeywords] = useState(keyword);
    const [loading, setLoading] = useState(true);
    
    const [contentSort, setContentSort] = useState('all'); // all, new, price
    const [contentOrder, setContentOrder] = useState('desc'); // asc, desc
    const [filterColor, setFilterColor] = useState('Semua');
    const [filterBrand, setFilterBrand] = useState('Semua');
    const [filterFuel, setFilterFuel] = useState('Semua');
    const [filterStartPrice, setFilterStartPrice] = useState('');
    const [filterEndPrice, setFilterEndPrice] = useState('');
    const [filterStartYear, setFilterStartYear] = useState('');
    const [filterEndYear, setFilterEndYear] = useState('');

    const navigate = useNavigate();

    const sortCars = (cars) => {
        let res = cars;
        if(keywords !== undefined && keywords !== ''){
            let keyword = slugify(keywords.toLowerCase());
            res = cars.filter((car) => slugify(`${car.model.toString().toLowerCase()} ${car.brand.toString().toLowerCase()} ${car.fuel.toString().toLowerCase()} ${car.color.toString().toLowerCase()} ${car.description.toString().toLowerCase()}`)
            .includes(keyword));
        }

        if(contentSort === 'all'){
            setCars(res);
        }else if(contentSort === 'new'){
            res = res.sort((a, b) =>  (a, b) => parseFloat(b.id) - parseFloat(a.id));
            setCars(res);
        }else if(contentSort === 'price'){
            if(contentOrder === 'asc'){
                res = res.sort((a, b) => parseFloat(a.price.replace('Rp. ','')) - parseFloat(b.price.replace('Rp. ','')));
            }else if(contentOrder === 'desc'){
                res = res.sort((a, b) => parseFloat(b.price.replace('Rp. ','')) - parseFloat(a.price.replace('Rp. ','')));
            }
            setCars(res);
        }
    }

    const changeContentOrder = (sort) => {
        setContentSort(sort)
        setContentOrder(contentOrder === 'asc' ? 'desc' : 'asc')
        sortCars(cars);
    }

    const changeContentSort = (sort) => {
        setContentSort(sort);
        sortCars(cars);
    }
    
    const getCar = () => {
        setLoading(true);
        axios.get(carlist)
        .then(response => {
            let result = response.data;
            if(result.status){
                let res = result.data;
                
                if(filterColor !== 'Semua' && filterColor !== ''){
                    res = res.filter((item) => item.color === filterColor)
                }

                if(filterFuel !== 'Semua' && filterFuel !== ''){
                    res = res.filter((item) => item.fuel === filterFuel)
                }

                if(filterBrand !== 'Semua' && filterBrand !== ''){
                    res = res.filter((item) => item.brand === filterBrand)
                }

                if(filterStartPrice !== ''){
                    if(filterEndPrice !== ''){
                        res = res.filter((item) => parseInt(item.price.replace('Rp. ','')) >= parseInt(filterStartPrice) && parseInt(item.price.replace('Rp. ','')) <= parseInt(filterEndPrice))
                    }else{
                        res = res.filter((item) => parseInt(item.price.replace('Rp. ','')) >= parseInt(filterStartPrice))
                    }
                }else{
                    if(filterEndPrice !== ''){
                        res = res.filter((item) => parseInt(item.price.replace('Rp. ','')) <= parseInt(filterEndPrice))
                    }
                }

                if(filterStartYear !== ''){
                    if(filterEndYear !== ''){
                        res = res.filter((item) => parseInt(item.year) >= parseInt(filterStartYear) && parseInt(item.year) <= parseInt(filterEndYear))
                    }else{
                        res = res.filter((item) => parseInt(item.year) >= parseInt(filterStartYear))
                    }
                }else{
                    if(filterEndYear !== ''){
                        res = res.filter((item) => parseInt(item.year) <= parseInt(filterEndYear))
                    }
                }
                sortCars(res);
            }else{
                setCars([]);
            }
            setLoading(false);
        }).catch(error => {
            setCars([]);
            setLoading(false);
        });
    }

    const CarContent = React.memo(({data, index}) => {
        return (
            <Link title={`detail-mobil-${slugify(data.model)}`} className="product-items w-50 flex-column lazy" to={`/mobil/${data.id}-${slugify(data.model)}`} key={index}>
                <div className="lazy product-cover mb-2" style={{backgroundImage : `url('${data.image_cover}')`}}></div>
                <p className="bodytext1 color-black800 semibold m-0 px-2">{data.model}</p>
                <p className="bodytext2 color-black300 m-0 px-2">{data.year} | {data.color.length > 0 ? `${data.color.length} Warna` : 'Tidak Ada Warna'}</p>
                <p className="bodytext2 semibold color-green500 m-0 py-1 px-2">{data.price}</p>
            </Link>
        )
    });
 
    const onSearch = (e) => {  
        if(keywords === ""){
            navigate('/search', {replace: true});
        }else{
            navigate('/search/'+keywords, {replace: true});
        }
        e.preventDefault();
        getCar();
    }

    const onWritingKeyword = (keyword) => {
        setKeywords(keyword);

        if(keyword === ""){
            navigate('/search', {replace: true});
            getCar();
        }
    }

    const goBack = () => {
        navigate.length > 0 ? navigate(-1) : window.location.href = '/home';
    }

    const resetFilter = () => {
        setFilterColor('Semua');
        setFilterBrand('Semua');
        setFilterFuel('Semua');
        setFilterStartPrice('');
        setFilterEndPrice('');
        setFilterStartYear('');
        setFilterEndYear('');
        getCar();
    }

    useEffect(() => {
        document.title = "Pencarian Mobil";
        setKeywords(keyword === undefined ? '' : keyword);
        getCar();
    }, []);
    

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-between align-items-center flex-column py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <form onSubmit={onSearch} action="" id="form-search" className="container-search form-search w-100 d-flex justify-content-between align-items-center" style={{height: '48px'}}>
                    <Link to="" className="navbar-brand" title="back" onClick={goBack}>
                        <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                    </Link>
                    <div className="input-group-search background-black50 h-100">
                        <i className="fi fi-br-search color-black200 mr-2 headline5"></i>
                        <input type="text" defaultValue={keywords} onChange={e => onWritingKeyword(safeString(e.target.value))} className="bodytext1" id="input-search" placeholder="Cari mobil ..."/>
                    </div>
                    <button type="button" id="toggleFilter" data-toggle="modal" data-target="#dialogFilter" className="h-100 d-flex align-items-center justify-content-center button-search ml-3 menu-filter" style={{width: '48px'}}>
                        {filterColor === 'Semua' && filterBrand === 'Semua' && filterFuel === 'Semua' && filterStartPrice === '' && filterEndPrice === '' && filterStartYear === '' && filterEndYear === '' ? <i className="fi fi-rr-filter text-white headline5"></i> : <i className="fi fi-sr-filter text-white headline5"></i>}
                    </button>
                </form>

                <div className="container-menu-tab w-100 d-flex justify-content-between mt-2">
                    <button onClick={() => changeContentSort('all')} className={contentSort === 'all' ? 'menu-tab-item bodytext2 flex-fill active' : 'menu-tab-item bodytext2 flex-fill'}>Semua</button>
                    <button onClick={() => changeContentSort('new')} className={contentSort === 'new' ? 'menu-tab-item bodytext2 flex-fill active' : 'menu-tab-item bodytext2 flex-fill'}>Terbaru</button>
                    <button onClick={() => changeContentOrder('price') } id="menu-price" className={contentSort === 'price' ? 'menu-tab-item bodytext2 flex-fill active' : 'menu-tab-item bodytext2 flex-fill'}>
                        Harga 
                        {(contentSort === 'price' && contentOrder === 'asc') && <i className="fi fi-sr-arrow-up"></i>}
                        {(contentSort === 'price' && contentOrder === 'desc') && <i className="fi fi-sr-arrow-down"></i>}
                    </button>
                </div>
            </div>
        </nav>

        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 main-content">
            {loading && cars.length === 0 && <Loading />}
            {!loading && cars.length === 0 && <EmptyState title={keywords !== undefined && keywords !== '' && `Pencarian <span class="color-green500 semibold">"${keyword}"</span> Tidak Ditemukan`} desc={keywords !== undefined && keywords !== '' && `Silahkan gunakan kata kunci lain`}/>}

            <div className="container-products w-100 mb-2">
                <div className="container-product d-flex justify-content-start d-flex w-100 flex-wrap px-2 py-1">
                    {cars.length > 0 && keyword !== undefined && (
                        <p className="mb-0 bodytext1 color-black500 text-search-result semibold px-3 w-100">
                            Menemukan <span className="color-green500">{cars.length}</span> Mobil dengan kata kunci <span className="color-green500">{keyword}</span>
                        </p>
                    )}

                    {cars.length > 0 && keyword === undefined && (
                        <p className="mb-0 bodytext1 color-black500 text-search-result semibold px-3 w-100">
                            <span className="color-green500 semibold">{cars.length}</span> mobil ditemukan
                        </p>
                    )}

                    {cars.length > 0 && cars.map((data, index) => <CarContent data={data} index={index} key={index}/>)}
                </div>
            </div>
        </main>
        <Footer/>

        <form action="" method="get" id="form-filter">
            <div className="modal fade" id="dialogFilter" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="modal-content modal-filter-content">
                    <div className="modal-header">
                        <h5 className="modal-title headline6" id="staticBackdropLabel">Filter</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fi fi-br-cross headline6"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* <p className="textbody1 semibold mb-2">Warna</p>
                        <div className="container-select-color d-flex align-content-start flex-wrap flex-wrap w-100 my-2">
                            <label className="select-item select-color-item active">
                                <input type="checkbox" name="color" className="input-select-color" value="Semua" hidden defaultChecked/>
                                Semua
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Hitam" hidden/>
                                Hitam
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Silver" hidden/>
                                Silver
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Putih" hidden/>
                                Putih
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Biru" hidden/>
                                Biru
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Jingga" hidden/>
                                Jingga
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Merah" hidden/>
                                Merah
                            </label>
                            <label className="select-item select-color-item">
                                <input type="checkbox" name="color" className="input-select-color" value="Gray" hidden/>
                                Gray
                            </label>
                        </div> */}
                        <p className="textbody1 semibold mb-2">Bahan Bakar</p>
                        <div className="container-select-fuel d-flex align-content-start flex-wrap flex-wrap w-100 my-2">
                            <label onClick={() => setFilterFuel('Semua')} className={filterFuel === 'Semua' ? 'select-item select-fuel-item active' : 'select-item select-fuel-item'}>
                                <input type="checkbox" name="fuel" className="input-select-fuel" value="Semua" hidden/>
                                Semua
                            </label>
                            <label onClick={() => setFilterFuel('Bensin')} className={filterFuel === 'Bensin' ? 'select-item select-fuel-item active' : 'select-item select-fuel-item'}>
                                <input type="checkbox" name="fuel" className="input-select-fuel" value="Bensin" hidden/>
                                Bensin
                            </label>
                            <label onClick={() => setFilterFuel('Solar')} className={filterFuel === 'Solar' ? 'select-item select-fuel-item active' : 'select-item select-fuel-item'}>
                                <input type="checkbox" name="fuel" className="input-select-fuel" value="Solar" hidden/>
                                Solar
                            </label>
                            <label onClick={() => setFilterFuel('Listrik')} className={filterFuel === 'Listrik' ? 'select-item select-fuel-item active' : 'select-item select-fuel-item'}>
                                <input type="checkbox" name="fuel" className="input-select-fuel" value="Listrik" hidden/>
                                Listrik
                            </label>
                            <label onClick={() => setFilterFuel('Hybrid')} className={filterFuel === 'Hybrid' ? 'select-item select-fuel-item active' : 'select-item select-fuel-item'}>
                                <input type="checkbox" name="fuel" className="input-select-fuel" value="Hybrid" hidden/>
                                Hybrid
                            </label>
                        </div>
                        <p className="textbody1 semibold mb-2">Tahun</p>
                        <div className="container-input-year d-flex lex-column justify-content-between align-items-center mb-2">
                            <div className="input-group-search form-search background-black50 h-50 py-0 px-3">
                                <input type="text" onChange={e => setFilterStartYear(e.target.value)} pattern="\d*" maxLength="4" name="tahun-awal" id="tahun-awal" className="bodytext1 text-center" placeholder="Tahun Awal"/>
                            </div>
                            <p className="bodytext1 color-black500 semibold px-2 pt-3">sd</p>
                            <div className="input-group-search form-search background-black50 h-50 py-0 px-3">
                                <input type="text" onChange={e => setFilterEndYear(e.target.value)}  pattern="\d*" maxLength="4" name="tahun-akhir" id="tahun-akhir" className="bodytext1 text-center" placeholder="Tahun Akhir"/>
                            </div>
                        </div>
                        
                        <p className="textbody1 semibold mb-2">Batas Harga (Rp)</p>
                        <div className="container-input-year d-flex lex-column justify-content-between align-items-center mb-2">
                            <div className="input-group-search form-search background-black50 h-50 py-0 px-3">
                                <input type="number" onChange={e => setFilterStartPrice(e.target.value)}  name="harga-awal" id="harga-awal" className="bodytext1 text-center" placeholder="Harga Awal"/>
                            </div>
                            <p className="bodytext1 color-black500 semibold px-2 pt-3">sd</p>
                            <div className="input-group-search form-search background-black50 h-50 py-0 px-3">
                                <input type="number" onChange={e => setFilterEndPrice(e.target.value)}  name="harga-akhir" id="harga-akhir" className="bodytext1 text-center" placeholder="Harga Akhir"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer justify-content-around">
                        <button onClick={resetFilter} type="reset" className="btn flex-fill button-action-filter button-action-filter-reset bg-white bodytext2 py-2 color-green500" data-dismiss="modal"  id="buttonReset">Atur ulang</button>
                        <button onClick={getCar} type="button" className="btn flex-fill button-action-filter background-green500 bodytext2 text-white py-2" data-dismiss="modal" id="buttonFilter">Tampilkan</button>
                    </div>
                </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default Products;