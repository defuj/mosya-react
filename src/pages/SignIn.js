import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from '../assets/images/app_icon_title_h.png';
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';
import axios, {signin} from '../helper/axios';
import {setAccount} from '../helper/session';

const Signin = () => {
	const navigate = useNavigate();

	const prepareMain = () => {
		document.getElementById('body').classList.remove('text-center');
		document.getElementById('body').classList.add('align-items-start');
		document.getElementById('body').classList.add('py-0');
		document.getElementById('body').classList.add('flex-column');

		if(navigate.length > 0){
			navigate(-1, { replace: true });
			// window.history.back();
		}else{
			// navigate('/home');
			// window.location.href = '/home';
		}
		window.location.href = '/home';
	}

	const prepareSignin = () => {
		document.getElementById('body').classList.remove('align-items-start');
		document.getElementById('body').classList.remove('py-0');
		document.getElementById('body').classList.remove('flex-column');
		document.getElementById('body').classList.add('text-center');
	}

	useEffect(() => {
        document.title = "Masuk";
		prepareSignin();

		console.log('History Page');
		console.log(document.referrer);
    }, []);

	const [onProgress, setProgress] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignin = async () =>{
		if(email === '' && password === ''){
			Swal.fire({
				title: 'Perhatian',
				text: 'Email dan kata sandi tidak boleh kosong!',
				icon: 'error',
				confirmButtonText: 'Mengerti',
			})
		}else{
			setProgress(true)
			await axios.postForm(signin, {
				email: email,
				password: password
			  })
			  .then(function(response) {
				setProgress(false)
				const result = response.data;
				if(result.status){
				  const account = result.data;
				  if(account !== undefined){
					setAccount(account);
					// let page = getLastPage();
					// if(page != null){
					// 	navigate(page);
					//   	deleteLastPage();
					// }else{
					// 	// window.location.href = '/home';
					// 	navigate('/home', { replace: true });
					// }
					// navigate('/home', { replace: true });
					// if(navigate.length > 0){
					// 	// navigate(-1, { replace: true });
					// 	window.history.back();
					// }else{
					// 	window.location.href = '/home';
					// }
					prepareMain();
				  }else{
					Swal.fire({
					  title: 'Perhatian',
					  text: 'Terjadi kesalahan! Silahkan coba lagi.',
					  icon: 'error',
					  confirmButtonText: 'Mengerti',
					})
				  }
				  
				}else{
				  Swal.fire({
					title: 'Perhatian',
					text: result.message,
					icon: 'error',
					confirmButtonText: 'Mengerti'
				  })
				}
			  }).catch((error)=> {
				setProgress(false)
				Swal.fire({
				  title: 'Perhatian',
				  text: 'Terjadi kesalahan! Silahkan coba lagi.',
				  icon: 'error',
				  confirmButtonText: 'Mengerti',
				})
			  });
		}
	}

    return (
        <form className="form-signin text-center" style={{maxWidth: '300px'}}>
			<Link to="/home" className="text-decoration-none">
				<img className="mb-4 w-100" src={icon} alt=""/>
			</Link>

			<div className="input-group-custom">
				<i className="fi fi-rr-at color-black400"></i>
				<input onChange={e => setEmail(e.target.value)} type="email" name="email" id="inputEmail" className="form-input bodytext2" placeholder="Alamat Email" required/>
			</div>

			<div className="input-group-custom mt-3">
				<i className="fi fi-rr-lock color-black400"></i>
				<input onChange={e => setPassword(e.target.value)} type="password" name="password" id="inputPassword" className="form-input bodytext2" placeholder="Kata Sandi" required />
			</div>

			<Link to="/forgot_password" className="mb-3 mt-2 font-weight-normal color-primary float-right bodytext2">
                Lupa kata sandi?
            </Link>
			<button disabled={onProgress && 'disabled'} onClick={handleSignin} className="btn btn-lg btn-block button-primary bodytext2" type="button" id="buttonLogin">
				{onProgress ? <Spinner/> : 'Masuk'}
			</button>
			<p className="mt-3 mb-1 bodytext2">
				Belum punya akun? 
				<Link to="/signup" href="register" className="color-primary"> Daftar</Link>
			</p>
		</form>
    );
}

export default Signin;