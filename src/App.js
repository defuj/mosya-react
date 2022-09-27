import React, {useEffect} from "react";
import {
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import {checkAccount} from './helper/session';

import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import Main from './pages/Main';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OneTimePassword from './pages/OneTimePassword';
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import Products from "./pages/Products";

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import History from './pages/History';
import Profile from './pages/Profile';
import Brands from "./pages/Brands";
import Product from "./pages/Product";
import OrderInputIdentity from "./pages/OrderInputIdentity";
import OrderPaymentMethod from "./pages/OrderPaymentMethod";
import OrderBill from "./pages/OrderBill";
import OrderDetail from "./pages/OrderDetail";
import OrderTracking from "./pages/OrderTracking";
import { safeString } from "./helper/others";

const App = () => {
  const configClass = () => {
    let pathname = safeString(window.location.pathname);
    if(pathname === '/signin' || pathname === 'signup' || pathname === '/forgot_password' || pathname === '/reset_password' || pathname === '/otp'){
      document.getElementById('body').classList.remove('align-items-start');
      document.getElementById('body').classList.remove('py-0');
      document.getElementById('body').classList.remove('flex-column');
      document.getElementById('body').classList.add('text-center');
    }else{
      document.getElementById('body').classList.remove('text-center');
      document.getElementById('body').classList.add('align-items-start');
      document.getElementById('body').classList.add('py-0');
      document.getElementById('body').classList.add('flex-column');
    }
  }
  useEffect(() => {
    configClass();
  }, [configClass]);

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/home" replace="true"/>} />
      <Route path="/signin" element={checkAccount() ? <Navigate to="/home" replace="true"/> : <Signin/>} /> 
      <Route path="/signup" element={checkAccount() ? <Navigate to="/home" replace="true"/> : <Signup/>} /> 
      <Route path="/forgot_password" element={checkAccount() ? <Navigate to="/home" replace="true"/> : <ForgotPassword/>} /> 
      <Route path="/reset_password" element={checkAccount() ? <Navigate to="/home" replace="true"/> : <ResetPassword/>} /> 
      <Route path="/otp" element={checkAccount() ? <Navigate to="/home" replace="true"/> : <OneTimePassword/>} /> 
      <Route path="/home">
        <Route path="" element={<Main component={Home}/>} />  
        <Route path="catalog" element={<Main component={Catalog}/>} /> 
        <Route path="history" element={checkAccount() ? <Main component={History}/> : <Navigate to="/signin" replace="true"/>} /> 
        <Route path="profile" element={checkAccount() ? <Main component={Profile}/> :  <Navigate to="/signin" replace="true"/>} /> 
        <Route path="*" element={<Navigate to="/home" replace="true"/>} />
      </Route> 
      <Route path="/profile">
        <Route path="" element={checkAccount() ?<Navigate to="/home/profile" replace="true"/> : <Navigate to="/signin" replace="true"/>} />
        <Route path="edit" element={checkAccount() ? <UpdateProfile/> :  <Navigate to="/signin" replace="true"/>} /> 
        <Route path="password" element={checkAccount() ? <UpdatePassword/> :  <Navigate to="/signin" replace="true"/>} /> 
        <Route path="*" element={<Navigate to="/home" replace="true"/>} />
      </Route>
      <Route path="/products">
        <Route path="" element={<Products/>}/>
        <Route path=":keyword" element={<Products/>}/>
      </Route>
      <Route path="/product">
        <Route path="" element={<Navigate to="/home" replace="true"/>}/>
        <Route path=":id/:title" element={<Product/>}/>
      </Route>
      <Route path="/brands">
        <Route path="" element={<Brands/>}/>
        <Route path=":keyword" element={<Brands/>}/>
      </Route>
      <Route path="/order">
        <Route path="" element={<Navigate to="/home" replace="true"/>}/>
        <Route path=":id/identity" element={checkAccount() ? <OrderInputIdentity/> : <Navigate to="/signin" replace="true"/>}/>
        <Route path=":id/payments" element={checkAccount() ? <OrderPaymentMethod/> : <Navigate to="/signin" replace="true"/>}/>
        <Route path=":code/bill" element={checkAccount() ? <OrderBill/> : <Navigate to="/signin" replace="true"/>}/>
        <Route path=":code/detail" element={checkAccount() ? <OrderDetail/> :  <Navigate to="/signin" replace="true"/>}/>
        <Route path=":code/tracking" element={checkAccount() ? <OrderTracking/> : <Navigate to="/signin" replace="true"/>}/>
        <Route path=":id/*" element={<Navigate to="/home" replace="true"/>} /> 
        <Route path=":code/*" element={<Navigate to="/home" replace="true"/>} /> 
        <Route path="*" element={<Navigate to="/home" replace="true"/>} /> 
      </Route>
      <Route path="/*" element={<Navigate to="/home" replace="true"/>} /> 
      
    </Routes>
  );
}

export default App;
