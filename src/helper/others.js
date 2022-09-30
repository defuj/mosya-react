export const configClass = () => {
    let pathname = window.location.pathname;    
    if(pathname === '/signin' || pathname === '/signup' || pathname === '/forgot_password' || pathname === '/reset_password' || pathname === '/otp'){
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

export const safeString = (content) => {
    return content.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const imageUrlToBase64 = async (url, callback) => {
    const axios = require('axios');
    await axios.get(url, {
        mode : 'no-cors',
        responseType: 'arraybuffer',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
    .then(response => {
        let raw = Buffer.from(response.data).toString('base64');
        let base64 = `data:${response.headers["content-type"]};base64,${raw}`;
        callback(base64);
    })
    .catch(() => callback('https://img.kpopmap.com/2018/07/mbc-rebel.jpg'));
}

export const validateEmail = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
}

export const validatePhone = (phone) => {
    var validRegex = /^[0-9]*$/; // without +
    var validRegex2 = /^\+[0-9]*$/; // with +
    return phone.match(validRegex) || phone.match(validRegex2);
}