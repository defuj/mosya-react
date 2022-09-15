import React, {useState, useEffect} from "react";
import {
    Link,
    useNavigate
  } from "react-router-dom";
import { checkAccount, getAccount, safeString, setAccount } from "../helper/session";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import axios, { updateprofile } from "../helper/axios";
import Spinner from "../components/Spinner";

const UpdateProfile = () => {
    const [user, setUser] = useState(getAccount);
    const [onProgress, setProgress] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);


    useEffect(() => {
        if(!checkAccount()){
            window.location.replace('/signin');
        }else{
            setUser(getAccount());
        }
    }, [])

    const onBack = () => {
        navigate('/home/profile');
    }

    const handleImage = (evt) => {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
        
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('image-profile').src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }else{
          document.getElementById('image-profile').src = 'https://defuj.github.io/mosya.bootstrap/assets/images/user-default.png';
        }
    }

    const setContentProgess = (status) => {
		setProgress(status);
		document.getElementById('buttonSave').disabled = status
	}

    const onUpdate = () => {
        const inputName = safeString(name);
        const inputPhone = safeString(phone);
        if(inputName !== '' && inputPhone !== ''){
            setContentProgess(true);
            const postForm = {
                id: user.id,
                name: inputName,
                phone: inputPhone,
                image: document.querySelector('#choose-image').files.length > 0 ? document.querySelector('#choose-image').files[0] : null
            }
            axios.postForm(updateprofile, postForm)
            .then(response => {
                setContentProgess(false);
                let result = response.data;
                if(result.status){
                    setAccount(result.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil disimpan',
                    }).then(res => {
                        if(res.value){
                            navigate('/home/profile', { replace: true });
                        }
                    })
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: result.message,
                  })
                }
              })
              .catch(error=>{
                setContentProgess(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Terjadi kesalahan saat menghubungi server',
                  })
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Perhatian',
                text: 'Data tidak boleh kosong',
              })
        }
    }

    return (
        <>
        <nav className="navbar fixed-top bg-white border-bottom shadow-sm px-0">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-flex justify-content-start align-items-center flex-row py-0 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-3">
                <Link className="navbar-brand" title="back" onClick={onBack}>
                    <i className="fi fi-sr-angle-left color-black400 headline6"></i>
                </Link>
                <p className="mb-0 bodytext1 semibold color-black500 px-2 py-2">Edit Profil</p>
            </div>
        </nav>

        <div className="align-items-start pt-0 flex-column mt-5">
            <main role="main" className="container-fluid col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 pt-0 pl-0 pr-0 mt-5">
            <form encType="multipart/form-data" className="container-user d-flex justify-content-center flex-column w-100 px-3 py-4 mb-4">
                <label className="container-image-profile mx-auto" htmlFor="choose-image">
                    <img src={user.image !== null && user.image !== '' ? user.image : 'https://defuj.github.io/mosya.bootstrap/assets/images/user-default.png'} alt="profile" className="image-profile" id="image-profile"/>
                    <input type="file" name="picture"  id="choose-image" accept="image/png, image/gif, image/jpeg" onChangeCapture={e => handleImage(e)} hidden/>
                    <i className="fi fi-rr-camera change-picture"></i>
                </label>

                <div className="input-group-custom bg-white mt-3">
                    <i className="fi fi-rr-user color-black400"></i>
                    <input type="text" name="name" id="dataName" defaultValue={user.name} onChange={e => setName(e.target.value)} className="form-input bodytext2" placeholder="Nama Lengkap" required/>
                </div>

                <div className="input-group-custom bg-white mt-3">
                    <i className="fi fi-rr-hastag color-black400"></i>
                    <input type="number" name="phone" id="dataPhone" defaultValue={user.phone} onChange={e => setPhone(e.target.value)} maxLength="15" className="form-input bodytext2" placeholder="Nomor Telpon" required/>
                </div>

                <div className="input-group-custom bg-light mt-3">
                    <i className="fi fi-rr-at color-black300"></i>
                    <input type="email" name="email" id="dataEmail" defaultValue={user.email} className="form-input bodytext2 color-black300" placeholder="Alamat Email" disabled required/>
                </div>

                <button onClick={onUpdate} type="button" id="buttonSave" className="button-action-save text-white background-green500 bodytext1 text-center mt-5">
                    {onProgress ? <Spinner/> : 'Simpan Perubahan'}
                </button>
            </form>
            </main>
        </div>
        

        <Footer/>

        </>
    )
}

export default UpdateProfile;