import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner';
import axios,{signup} from '../helper/axios';

const Signup = () => {
	useEffect(() => {
        document.title = "Buat Akun";
    }, []);

	const navigate = useNavigate();
	const [onProgress, setProgress] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	
	const setContentProgress = (status) => {
		setProgress(status);
		document.getElementById('buttonRegister').disabled = status
	}

	const handleSignup = async () => {
		if(name !== '' && phone !== '' && email !== '' && password !== '' && passwordConfirm !== ''){
			if(password === passwordConfirm){
				setContentProgress(true)
				await axios.postForm(signup, {
					name: name,
					phone: phone,
					email: email,
					password: password,
				  })
				  .then(response => {
					setContentProgress(false)
					let result = response.data;
					if(result.status){
					  Swal.fire({
						icon: 'success',
						title: 'Selamat!',
						text: 'Akun kamu berhasil dibuat!',
						confirmButtonText: 'Masuk'
					  }).then((result) => {
						if (result.value) {
						  navigate('/signin');
						}
					  })
					}else{
					  Swal.fire({
						icon: 'error',
						title: 'Perhatian',
						text: result.message,
						confirmButtonText: 'Mengerti',
					  })
					}
				  })
				  .catch(error=>{
					setContentProgress(false)
					Swal.fire({
						icon: 'error',
						title: 'Perhatian',
						text: 'Terjadi kesalahan! Silahkan coba lagi',
						confirmButtonText: 'Mengerti',
					  })
				  })
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
				text: 'Semua kolom harus diisi!',
				icon: 'error',
				confirmButtonText: 'Mengerti',
			})
		}
	}

    return (
        <>
		<nav className="navbar navbar-expand-md fixed-top background-transparent">
			<Link to="/signin" className="navbar-brand" title="Sign In">
				<i className="fi fi-sr-angle-left color-black600 bodytext1"></i>
			</Link>
		</nav>
		
		<form className="form-signin">
			<p className="mb-0 bodytext1 color-black500 text-center">Mendaftar</p>
			<p className="mb-2 headline6 color-black700 text-center font-weight-bold">Siapkan Akun kamu</p>
			<p className="mb-2 mt-3 bodytext2 color-black500 text-center">Masukan informasi akun kamu</p>
			
			<div className="input-group-custom">
				<i className="fi fi-rr-user color-black400 bodytext1"></i>
				<input onChange={e => setName(e.target.value)} type="name" name="name" className="form-input bodytext2" placeholder="Nama Lengkap" required/>
			</div>

			<div className="input-group-custom mt-3">
				<i className="fi fi-rr-hastag color-black400 bodytext1"></i>
				<input onChange={e => setPhone(e.target.value)} type="phone" name="phone" className="form-input bodytext2" placeholder="Nomor Telpon" required/>
			</div>

			<div className="input-group-custom mt-3">
				<i className="fi fi-rr-at color-black400 bodytext1"></i>
				<input onChange={e => setEmail(e.target.value)} type="email" name="email" className="form-input bodytext2" placeholder="Alamat Email" required/>
			</div>

			<div className="input-group-custom mt-3">
				<i className="fi fi-rr-lock color-black400 bodytext1"></i>
				<input onChange={e => setPassword(e.target.value)} type="password" name="password" className="form-input bodytext2" placeholder="Kata Sandi" required/>
			</div>

			<div className="input-group-custom mt-3">
				<i className="fi fi-rr-lock color-black400 bodytext1"></i>
				<input onChange={e => setPasswordConfirm(e.target.value)} type="password" name="passwordConfirm" className="form-input bodytext2" placeholder="Konfirmasi Kata Sandi" required/>
			</div>

			<p className="mt-3 mb-3 bodytext2">Dengan mendaftar, kamu menyetujui <Link to="#" className="color-primary">Syarat Ketentuan</Link> dan <Link to="#" className="color-primary">Kebijakan Privasi</Link> kami.</p>
			<button onClick={handleSignup} className="btn btn-lg btn-block button-primary bodytext2" type="button" id="buttonRegister">
				{onProgress ? <Spinner/> : 'Buat Akun'}
			</button>
		</form>
		</>
    );
}

export default Signup;