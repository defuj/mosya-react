import axios from 'axios';

export default axios.create({
  baseURL: `https://apimosya.miebledek.com/`, // https://api.mosya.co.id/
  headers: {
    Authorization: `Basic bW9zeWFBcGk6OWY2NjE1ZjdmYzA1MDNiODEzODIwZTFiYTRiYWQ1MzA=`
  }
});

export const signin = 'auth/sign';
export const signup = 'auth/register';
export const bannerlist = 'banner/list';
export const brandlist = 'brand/list';
export const carlist = 'car/list';
export const cardetail = 'car/detail';
export const cataloglist = 'car/list_catalog';
export const historylist = 'history/list';
export const updateprofile = 'auth/update_profile';
export const updatepassword = 'auth/update_password';
export const ordercreate = 'booking/create';
export const orderupload = 'booking/upload';
export const orderpayment = 'booking/payment';
export const orderpaymentinfo = 'booking/payment_info';
export const orderuploadpayment = 'booking/payment_upload';
export const orderdetail = 'history/detail';
export const orderconfirm = 'history/confirm';