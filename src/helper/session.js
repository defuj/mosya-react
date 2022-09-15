const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export const getLastBooking = (id) => {
    if (storageAvailable('localStorage')) {
        return JSON.parse(localStorage.getItem(`${id}`));
    }
    return null;
}

export const setLastBooking = (id, data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem(`${id}`, JSON.stringify(data));
    }
}

export const deleteLastBooking = (id) => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem(`${id}`);
    }
}

export const setAccount = (data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('account', JSON.stringify(data));
    }
}

export const getAccount = () => {
    if (storageAvailable('localStorage')) {
        return JSON.parse(localStorage.getItem('account'));
    }
    return null;
}

export const getDataBooking = () => {
    if (storageAvailable('localStorage')) {
        return localStorage.getItem('data_booking') != null ? JSON.parse(localStorage.getItem('data_booking')) : null;
    }
    return null;
}

export const setDataBooking = (data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('data_booking', JSON.stringify(data));
    }
}

export const deleteDataBooking = () => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem('data_booking');
    }
}

export const getBooking = () => {
    if (storageAvailable('localStorage')) {
        return localStorage.getItem('booking') != null ? JSON.parse(localStorage.getItem('booking')) : null;
    }
    return null;
}

export const setBooking = (data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('booking', JSON.stringify(data));
    }
}

export const deleteBooking = () => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem('booking');
    }
}

export const getCurrentCar = () => {
    if (storageAvailable('localStorage')) {
        return localStorage.getItem('current_car') != null ? JSON.parse(localStorage.getItem('current_car')) : null;
    }
    return null;
}

export const setCurrentCar = (data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('current_car', JSON.stringify(data));
    }
}

export const deleteCurrentCar = () => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem('current_car');
    }
}

export const checkDeffTime = (time1, time2) => {
    var date1 = new Date(time1);
    var date2 = new Date(time2);
    var diff = date2.getTime() - date1.getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    return mm;
}

export const setLastPage = (url) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('last_page', url);
    }
}

export const getLastPage = () => {
    if (storageAvailable('localStorage')) {
        return localStorage.getItem('last_page');
    }
    return null;
}

export const changeColorSelected = (color) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('color_selected', color);
    }
}

export const getColorSelected = () => {
    if (storageAvailable('localStorage')) {
        return localStorage.getItem('color_selected');
    }
    return null;
}

export const checkAccount = () => {
    const pathname = window.location.pathname;
    setLastPage(pathname);
    if (storageAvailable('localStorage')) {
        if(localStorage.getItem('account') !== null){
            var user = getAccount();
            if(user.lasttime !== null && user.lasttime !== undefined){
                var now = new Date().getTime();
                var lasttime = user.lasttime;
                var diff = now - lasttime;
                var msec = diff;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);

                if(mm < 15){
                    // console.log('last time : '+lasttime);
                    // console.log('update time : ' + now);

                    user.lasttime = now;
                    localStorage.setItem('account', JSON.stringify(user));
                    return true;
                }else{
                    deleteAccount();
                    return false;
                }
            }else{
                const time = new Date().getTime();
                const newUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    image: user.image,
                    lasttime: time
                };
                localStorage.setItem('account', JSON.stringify(newUser));
                return true;
            }
        }
        return localStorage.getItem('account') !== null;
    }
    return false;
}

export const deleteAccount = () => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem('account');
    }
}

export const account = {
    id: '',
    name: '',
    email: '',
    phone: '',
    image: '',
};
const pathname = window.location.pathname;

export const filter = {
    color: '',
    fuel: '',
    merk: '',
    start_year: '',
    end_year: '',
    start_price: '',
    end_price: '',
}

export const setFilter = (data) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('filter', JSON.stringify(data));
    }
}

export const getFilter = () => {
    if (storageAvailable('localStorage')) {
        return JSON.parse(localStorage.getItem('filter') === null ? JSON.stringify(filter) : localStorage.getItem('filter'));
    }
    return JSON.parse(JSON.stringify(filter));
}

export const clearFilter = () => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('filter', JSON.stringify(filter));
    }
}

export const deleteLastPage = () => {
    if (storageAvailable('localStorage')) {
        localStorage.removeItem('last_page');
    }
}

export const checkSession = () => {
    if(checkAccount()){
        if(pathname === '/sign' || pathname === '/signup' || pathname === '/forgot_password' || pathname === '/reset_password'){
            window.location.href = '/home';
        }
    }else{
        if(pathname === '/profile' || pathname === '/history' || pathname === '/detail_history' || pathname === '/input_data_booking'  || pathname === '/select_payment_booking'  || pathname === '/upload_payment' || pathname === '/tracking_location') {
            window.location.href = '/signin';
        }
    }
}

export const safeString = (content) => {
    return content.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
}