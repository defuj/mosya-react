export const safeString = (content) => {
    return content.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export const stringToUrl = (content) => {
    return content.toString().replaceAll(' ', '-').replaceAll('.', '-').replaceAll('/','-').toLowerCase();
}

export const imageUrlToBase64 = async (url, callback) => {
    const axios = require('axios');
    await axios.get(url, {
        crossdomain: true,
        responseType: 'arraybuffer',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
    })
    .then(response => {
        let raw = Buffer.from(response.data).toString('base64');
        let base64 = `data:${response.headers["content-type"]};base64,${raw}`;
        callback(base64);
    })
    .catch(() => callback('https://img.kpopmap.com/2018/07/mbc-rebel.jpg'));
}