import React, {useState, useEffect} from "react";
import {
  Link,useNavigate
} from "react-router-dom";
import { getAccount } from "../helper/session";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import axios from "../helper/axios";
import Spinner from "../components/Spinner";
import { safeString } from "../helper/others";

const UpdatePassword = () => {
    const [user, setUser] = useState(getAccount);
    const [onProgress, setProgress] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      document.title = "Ubah Kata Sandi";
      setUser(getAccount);
    }, [])

    const setContentProgess = (status) => {
      setProgress(status);
      document.getElementById('buttonSave').disabled = status
    }

    const onSave = () => {
      const inputPasswordOld = safeString(passwordOld);
      const inputPassword = safeString(password);
      const inputConfirmPassword = safeString(confirmPassword);

      if(inputPasswordOld === "" || inputPassword === "" || inputConfirmPassword === ""){
        Swal.fire({
          icon: 'error',
          title: 'Perhatian',
          text: 'Semua form harus diisi',
          confirmButtonText: 'Mengerti'
        })
      }else{
        if(password !== confirmPassword){
          Swal.fire({
            icon: 'error',
            title: 'Perhatian',
            text: 'Konfirmasi kata sandi tidak sama',
            confirmButtonText: 'Mengerti'
          })
        }else{
          setContentProgess(true);
          axios.postForm('auth/update_password', {
            id: user.id,
            password_old: inputPasswordOld,
            password_new: inputPassword,
            password_confirm: inputConfirmPassword
          }).then(response => {
            setContentProgess(false);
            let result = response.data;
            if(result.status){
              Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Kata sandi berhasil diperbarui',
              }).then(res => {
                if(res.value){
                  navigate('/home/profile');
                }
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: result.message,
                confirmButtonText: 'Mengerti'
              })
            }
          })
          .catch(error=>{
            setContentProgess(false);
            Swal.fire({
              icon: 'error',
              title: 'Terjadi Kesalahan',
              text: 'Tidak dapat terhubung ke server',
              confirmButtonText: 'Mengerti'
            })
          })
        }
      }
    }

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link to="/home/profile" className="navbar-brand" title="back">
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2 py-2">Ubah Kata Sandi</p>
            </div>
        </nav>

        <div className="align-items-start pt-0 flex-column mt-5">
            <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5">
                <form onSubmit={onSave} className="container-user d-flex justify-content-start flex-column w-100 px-3 py-4 mb-4">
                  <p className="headline5 color-black500 semibold p-0 mb-1">
                    Ubah Kata Sandi
                  </p>
                  <p className="bodytext2 color-black500 p-0 m-0 mb-3">
                    Ubah kata sandi anda dengan yang baru.
                  </p>

                  <div className="input-group-custom bg-white mt-3">
                      <i className="fi fi-rr-lock-alt color-black400"></i>
                      <input type="password" onChange={e => setPasswordOld(e.target.value)} id="passwordOld" className="form-input bodytext2" placeholder="Masukan Kata Sandi Lama" required/>
                  </div>

                  <div className="input-group-custom bg-white mt-3">
                      <i className="fi fi-rr-lock color-black400"></i>
                      <input type="password" onChange={e => setPassword(e.target.value)} id="password" className="form-input bodytext2" placeholder="Masukan Kata Sandi Baru" required/>
                  </div>

                  <div className="input-group-custom bg-white mt-3">
                      <i className="fi fi-rr-lock color-black400"></i>
                      <input type="password" onChange={e => setConfirmPassword(e.target.value)} id="passwordConfirm" className="form-input bodytext2" placeholder="Konfirmasi Kata Sandi Baru" required/>
                  </div>

                  <button onClick={onSave} type="submit" id="buttonSave" className="button-action-save text-white background-green500 bodytext1 text-center mt-5">
                      {onProgress ? <Spinner /> : "Simpan Perubahan"}
                  </button>
                

                </form>
            </main>
        </div>
        

        <Footer/>

        </>
    )
}

export default UpdatePassword;