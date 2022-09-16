import React, {useState, useEffect} from "react";
import {
    Link
  } from "react-router-dom";
import '../assets/styles/home.css';
import { checkAccount, deleteAccount, getAccount } from "../helper/session";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import axios, { historylist } from "../helper/axios";

const Profile = () => {
    const [account, setAccount] = useState(getAccount);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    const signOut = () => {
        Swal.fire({
            title: 'Keluar Akun?',
            text: "Apakah kamu yakin ingin keluar akun?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Keluar!',
            cancelButtonText: 'Tidak'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteAccount();
                window.location.replace('/home');
            }
          })
    }

    const ContentUser = () => {
        return (
            <div className="container-user d-flex flex-column w-100 px-3 py-4 mb-4">
                <div className="content-profile d-flex flex-column align-items-center mt-2 py-4">
                    <div className="container-image-profile">
                        <img src={account.image !== null && account.image !== '' ? account.image : 'https://defuj.github.io/mosya.bootstrap/assets/images/user-default.png'} alt="profile" className="image-profile" id="dataImage"/>
                    </div>
                    <div className="data-profile d-flex flex-column flex-fill">
                        <p className="headline5 color-black500 semibold p-0 mb-2 mt-2 text-center" id="dataName">
                            {account.name}
                        </p>
                        <p className="bodytext2 color-black500 p-0 m-0 text-center" id="dataEmail">
                            {account.email} | {account.phone}
                        </p>
                    </div>
                </div>

                <div className="container-spec d-flex align-content-between flex-wrap mt-3 mb-3 data-spec" id="data-spec">
                  <div className="spec-item flex-column flex-fill justify-content-start m-0 mr-1 p-3 radius-16">
                    <p className="bodytext2 color-black300 mb-2">Pesanan Diproses</p>
                    <p className="headline5 color-black500 semibold mb-0" id="dataProcess">
                        {history.filter((item) => item.status !== 'Selesai' && item.status !== 'Batal' && item.status !== 'Belum Bayar').length}
                    </p>
                  </div>
                  <div className="spec-item flex-column flex-fill justify-content-start m-0 ml-1 p-3 radius-16">
                    <p className="bodytext2 color-black300 mb-2">Pesanan Selesai</p>
                    <p className="headline5 color-black500 semibold mb-0" id="dataFinished">
                        {history.filter((item) => item.status === 'Selesai').length}
                    </p>
                  </div>
                  <div className="spec-item flex-column flex-fill justify-content-column m-0 mt-3 p-3 radius-16">
                    <p className="bodytext1 color-black500 semibold mb-2 flex-fill w-100">Pengaturan Akun</p>

                    <Link to="/profile/edit" className="text-decoration-none d-flex">
                      <button className="button-action-profile color-black500 bg-white bodytext1 d-flex flex-row justify-content-between align-items-center flex-fill px-0 py-2">
                          <p className="mb-0 bodytext1 flex-fill text-left">
                            Edit Profil
                          </p>
                          <i className="fi fi-sr-angle-right"></i>
                      </button>
                    </Link>
                  
                    <Link to="/profile/password" className="text-decoration-none d-flex">
                      <button className="button-action-profile color-black500 bg-white bodytext1 d-flex flex-row justify-content-between align-items-center flex-fill px-0 py-2">
                          <p className="mb-0 bodytext1 flex-fill text-left">
                            Ubah Kata Sandi
                          </p>
                          <i className="fi fi-sr-angle-right"></i>
                      </button>
                    </Link>

                    <button onClick={signOut} className="button-action-logout text-white bodytext1 text-center mt-3 d-flex flex-row w-100 justify-content-center flex-fill" id="buttonLogout">
                      <p className="mb-0">Keluar Akun</p>
                    </button>
                  </div>
                </div>
             </div>
        )
    }

    const getHistory = () => {
      axios.get(`${historylist}?id=${account.id}`)
        .then(response => {
            let result = response.data;
            if(result.status){
                setHistory(result.data);
            }else{
                setHistory([]);
            }
        }).catch(error => {
            setHistory([]);
        });
    }

    useEffect(() => {
        document.title = "Profil";
        if(checkAccount()){
            setLoading(false);
            setAccount(getAccount);
            getHistory();
        }else{
            window.location.replace('/signin');
        }
    }, [])

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-between  align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-2">
                <p className="navbar-brand mb-0 bodytext1 semibold color-black500 px-1 py-2 flex-fill" title="Profile">
                    Profil Akun
                </p>
            </div>
        </nav>

        <main role="main" id="container-user" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5">
            {loading && <Loading />}
            {!loading && checkAccount() && <ContentUser />}
        </main>

        </>
    )
}

export default Profile;