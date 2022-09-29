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