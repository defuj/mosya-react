import React, {useState, useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import '../assets/styles/otp.css';

const OneTimePassword = () => {
    const navigate = useNavigate();
    const [onProgress, setProgress] = useState(false);
    const [counter, setCounter] = useState(60);
    const [otp, setOtp] = useState(Math.floor(Math.random() * 900000) + 99999);
    const [otpExpired, setOtpExpired] = useState(new Date().getTime());

    const {state} = useLocation();
    // const {email: emailState} = state;

    const resendCode = () => {
        let code = Math.floor(Math.random() * 900000) + 99999
        setOtp(code)
        let expired = new Date().getTime();
        setOtpExpired(expired)
        // console.log(`Kode OTP : ${code}`);
        
        setProgress(true)
        // count down
        let count = 60;
        const interval = setInterval(() => {
            count--;
            setCounter(count);
            if(count === 0){
                clearInterval(interval);
                setProgress(false);
            }
        }, 1000);
    }

    const checkDeffTime = (time1, time2) => {
        var date1 = new Date(time1);
        var date2 = new Date(time2);
        var diff = date2.getTime() - date1.getTime();
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        return mm;
    }

    const WaitingAction = () => {
        return (
            <p id="counter" className="color-black500 bodytext2">
                Silahkan tunggu {counter} detik untuk mengirim ulang kode
            </p>
        );
    }

    const ResendAction = () => {
        return (
            <Link to="" id="resend" onClick={resendCode} className="color-green500 bodytext2">
                Kirim Ulang Kode
            </Link>
        );
    }

    const configInputOtp = () => {
        let code = '';
        const inputs = document.querySelectorAll('#otp > *[id]');
        for (let i = 0; i < inputs.length; i++) { 
            // eslint-disable-next-line
            inputs[i].addEventListener('keydown', (event) => { 
                if (event.key === "Backspace" ) { 
                    code = code.slice(0, -1);
                    inputs[i].value='';
                    if (i !== 0) {
                        inputs[i - 1].focus(); 
                    }
                } else { 
                    if (i === inputs.length - 1 && inputs[i].value !=='' ) {
                        return true; 
                    } else if (event.keyCode> 47 && event.keyCode < 58) { 
                        inputs[i].value=event.key; 
                        if (i !==inputs.length - 1) {
                            inputs[i + 1].focus();
                        }
                        code += inputs[i].value;
                        event.preventDefault(); 
                    } else if (event.keyCode> 64 && event.keyCode < 91) { 
                        inputs[i].value = String.fromCharCode(event.keyCode); 
                        if (i !== inputs.length - 1) {
                            inputs[i + 1].focus(); 
                        }
                        code += inputs[i].value;
                        event.preventDefault(); 
                    } 

                    if(code.length === 6){
                        // console.log(`input code : ${code}`);
                        // console.log(`current code : ${otp}`);
                        if(otp === code){
                            const now = new Date().getTime();
                            if(checkDeffTime(otpExpired,now) <= 5){
                                navigate('/reset_password', {state: {email: state.email}});
                            }else{
                                Swal.fire({
                                    title: 'Perhatian',
                                    text: 'Kode OTP sudah tidak berlaku',
                                    icon: 'error',
                                    confirmButtonText: 'Mengerti',
                                })
                            }
                            
                        }else{
                            code = '';
                            for (let j = 0; j < inputs.length; j++) { 
                                inputs[j].value='';
                            }
                            inputs[0].focus();

                            Swal.fire({
                                title: 'Perhatian',
                                text: 'Kode OTP yang anda masukkan salah',
                                icon: 'error',
                                confirmButtonText: 'Mengerti',
                            })
                        }
                    }
                } 
            });  
        } 
    } 

    useEffect(() => {
        document.title = "Kode OTP";
        if(state.email !== null){
            configInputOtp();
            resendCode();
        }else{
            navigate('/forgot_password', {replace: true});
        }
    }, []);

    return (
        <>
        <nav className="navbar navbar-expand-md fixed-top background-transparent">
            <Link className="navbar-brand" to="/signin" title="Sign In">
                <i className="fi fi-sr-angle-left color-black600 bodytext1"></i>
            </Link>
        </nav>
        
        <form className="form-otp" action="reset_password.html">
            <i className="fi fi-sr-shield-interrogation color-green500 headline2"></i>
            <p className="mb-2 mt-2 headline6 color-black700 font-weight-bold">Masukan Kode OTP</p>
            <p className="mb-2 bodytext2 color-black500">Masukan Kode OTP yang dikirim melalui email ke <b className="color-black500" id="dataEmail">{state.email}</b></p>
        
            <div id="otp" className="inputs d-flex flex-row justify-content-center mt-3 mb-4"> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="first" maxLength={1} /> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="second" maxLength={1} /> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="third" maxLength={1} /> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="fourth" maxLength={1} /> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="fifth" maxLength={1} /> 
                <input className="m-2 text-center otp-form bodytext2" type="password" id="sixth" maxLength={1} /> 
            </div> 

            {
                onProgress ? <WaitingAction/> : <ResendAction/>
            }

        </form>
        </>
    );
}

export default OneTimePassword;