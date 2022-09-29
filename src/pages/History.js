import React, {useEffect, useState} from "react";
import { Link} from "react-router-dom";
import '../assets/styles/home.css';
import Loading from '../components/Loading';
import axios, {historylist} from '../helper/axios';
import { getAccount, getHistories, setHistories} from '../helper/session';
import EmptyState from "../components/EmptyState";

const History = React.memo(() => {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(getHistories());
    const [account, setAccount] = useState(getAccount());

    const getHistory = async () => {
        axios.get(`${historylist}?id=${account.id}`)
        .then(response => {
            let result = response.data;
            if(result.status){
                setHistory(result.data);
                setHistories(result.data);
            }else{
                setHistory([]);
                setHistories([]);
            }
            setLoading(false);
        }).catch(error => {
            setHistory([]);
            setLoading(false);
        });
    }

    const HistoryContent = React.memo(({data}) => {
        return(
            <Link to={`/order/${data.id}/detail`} title={`detail-order-${data.id}`} className="d-flex flex-column history-item mb-3 text-decoration-none" key={data.id}>
                <div className=" d-flex flex-row justify-content-center align-items-center">
                    <div className="d-flex flex-column flex-fill">
                        <p className="semibold bodytext2 color-black500 mb-0">
                            Pesanan
                        </p>
                        <p className="caption color-black400 mb-0">
                            {data.date}
                        </p>
                    </div>
                    <p className={(data.status === 'Belum Bayar' || data.status === 'Batal' || data.status === null) ? 'payment-status-1 semibold caption mb-0' : 'payment-status-2 semibold caption mb-0'}>
                        {data.status == null ? 'Belum Bayar' : data.status}
                    </p>
                </div>

                <div className="d-flex flex-row align-items-center mt-2">
                    <img src={data.image} alt={data.model.replaceAll(' ','-').replaceAll('.','-').toLowerCase()} title={data.model.replaceAll(' ','-').replaceAll('.','-').toLowerCase()}/>
                    <div className="d-flex flex-fill flex-column pl-3">
                        <p className="caption semibold color-green500 mb-0">{data.brand}</p>
                        <p className="bodytext1 semibold color-black800 mb-0">{data.model}</p>
                        <p className="caption semibold color-black300 mb-0">{data.note === '' ? '-' : data.note} | {data.year}</p>
                    </div>
                </div>
            </Link>
        );
    });

    useEffect(() => {
        document.title = 'Riwayat Pesanan - Mosya - Mobil Bekas Berkualitas - Harga Terbaik di Indonesia';
        setHistory(getHistories());
        setAccount(getAccount());
        getHistory();
        setLoading(true);
    }, []);

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <p className="navbar-brand mb-0 bodytext1 semibold color-black500 px-1 py-2" title="back">
                Riwayat Pemesanan
                </p>
            </div>
        </nav>

        <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5 pt-4" style={{minHeight: 'calc(100% - 365px)'}}>
            {loading && history.length === 0 && <Loading />}
            {!loading && history.length === 0 && <EmptyState title="Tidak Ada Riwayat" desc="Anda belum melakukan pemesanan mobil" />}
            {history.length > 0 && 
            <div className="container-history w-100 d-flex flex-column w-100 py-1 px-3">
                {history.map((data, i) => <HistoryContent data={data} key={i}/>).reverse()}
            </div>}
        </main>
        </>
    )
})

export default History;