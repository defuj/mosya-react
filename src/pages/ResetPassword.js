import React,  { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [onProgress, setProgress] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {state} = useLocation();
    // const {email: emailState} = state;

	const setContentProgess = (status) => {
		setProgress(status);
		document.getElementById('buttonReset').disabled = status
	}

    const handleResetPassword = async () => {
        if(password !== '' || confirmPassword !== ''){
            if(password === confirmPassword){
                // count down timer
                setContentProgess(true)
                setTimeout(async () => {
                    setContentProgess(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Kata sandi berhasil diubah!',
                        icon: 'success',
                        confirmButtonText: 'Masuk',
                    }).then((result) => {
                        navigate('/signin');
                    })
                }, 3000);
            }else{
                Swal.fire({
                    title: 'Perhatian',
                    text: 'Kata sandi tidak sama!',
                    icon: 'error',
                    confirmButtonText: 'Mengerti',
                })
            }
        }else{
            Swal.fire({
				title: 'Perhatian',
				text: 'Sila masukkan kata sandi baru anda!',
				icon: 'error',
				confirmButtonText: 'Mengerti',
			})
        }
    }

    useEffect(() => {
        document.title = 'Atur Ulang Kata Sandi';
        if(state.email === null){
            navigate('/forgot_password');
        }
    }, []);

    return (
        <>
        <nav className="navbar navbar-expand-md fixed-top background-transparent">
            <Link className="navbar-brand" to="/signin" title="Sign In">
                <i className="fi fi-sr-angle-left color-black600 bodytext1"></i>
            </Link>
        </nav>
        
        <form className="form-signin">
            <p className="mb-2 headline5 color-black700 font-weight-bold text-justify">Reset Kata Sandi</p>
            <p className="mb-2 bodytext2 color-black500 text-justify">Silakan masukkan kata sandi baru untuk akun Anda.</p>
            
            <div className="input-group-custom mb-3">
            <i className="fi fi-rr-lock bodytext1 color-black400"></i>
                <input onChange={ e=> setPassword(e.target.value)} type="password" name="password" className="form-input bodytext2" placeholder="Kata Sandi" required/>
            </div>
            <div className="input-group-custom mb-3">
            <i className="fi fi-rr-lock bodytext1 color-black400"></i>
                <input onChange={ e=> setConfirmPassword(e.target.value)} type="password" name="password_confirm" className="form-input bodytext2" placeholder="Konfirmasi Kata Sandi" required/>
            </div>

            <button onClick={handleResetPassword} className="btn btn-lg btn-block button-primary bodytext2" type="button" id="buttonReset">
                {onProgress ? <Spinner/> : 'Reset Kata Sandi'}
            </button>
        </form>
        </>
    );
}
export default ResetPassword;