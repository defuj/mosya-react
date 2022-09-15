import React,  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';

const ForgotPassword = () => {
    useEffect(() => {
        document.title = "Lupa Kata Sandi - Mosya";
    }, []);

    const navigate = useNavigate();
	const [email, setEmail] = useState('');
    const [onProgress, setProgress] = useState(false);

	const setContentProgess = (status) => {
		setProgress(status);
		document.getElementById('buttonCheck').disabled = status
	}

    const handleForgotPassword = async (e) => {
        if(email !== ''){
            setContentProgess(true)
            // set timeout
            setTimeout(async () => {
                setContentProgess(false)
                navigate('/otp', {state: {email: email}});
            }, 3000);
        }else{
            Swal.fire({
				title: 'Perhatian',
				text: 'Silahkan masukkan email anda!',
				icon: 'error',
				confirmButtonText: 'Mengerti',
			})
        }
    }

    return (
        <>
        <nav className="navbar navbar-expand-md fixed-top background-transparent">
            <Link className="navbar-brand" to="/signin" title="Sign In">
                <i className="fi fi-sr-angle-left color-black600 bodytext1"></i>
            </Link>
        </nav>
        
        <form className="form-signin" action="/otp">
            <p className="mb-2 headline5 color-black700 font-weight-bold text-justify">Lupa Kata Sandi?</p>
            <p className="mb-2 bodytext2 color-black500 text-justify">Silakan masukan email akun Anda dan kami akan mengirimkan kode verifikasi untuk mereset kata sandi Anda.</p>
            
            <p className="mb-2 mt-3 bodytext2 color-black500 text-justify">Alamat Email</p>
            <div className="input-group-custom mb-3 pl-1">
                <input type="email" name="email" onChange={e => setEmail(e.target.value)} className="form-input bodytext2" placeholder="ex : user@domain.com" required/>
            </div>

            <button onClick={handleForgotPassword} className="btn btn-lg btn-block button-primary bodytext2" type="button" id="buttonCheck">
                {onProgress ? <Spinner/> : 'Kirim Kode Verifikasi' }
            </button>
        </form>
        </>
    );
}

export default ForgotPassword;