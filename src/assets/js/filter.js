var merkSelector = document.querySelectorAll(".select-merk-item");
merkSelector.forEach( (item) => {
    item.addEventListener("click", (e) => {
        merkSelector.forEach( (item) => {
            console.log("remove active");
            item.classList.remove("active");
        });
        item.classList.add("active");
    });
});

$(".input-select-merk").change(function() {
    $(".input-select-merk").not(this).prop('checked', false);
});

var colorSelector = document.querySelectorAll(".select-color-item");
colorSelector.forEach( (item) => {
    item.addEventListener("click", (e) => {
        colorSelector.forEach( (item) => {
            console.log("remove active");
            item.classList.remove("active");
        });
        item.classList.add("active");
        
        let filter = getFilter();
        filter.color = item.textContent.toString().replace(/\s/g, '');
        setFilter(filter);
    });
});

$(".input-select-color").change(function() {
    $(".input-select-color").not(this).prop('checked', false);
});

var fuelSelector = document.querySelectorAll(".select-fuel-item");
fuelSelector.forEach( (item) => {
    item.addEventListener("click", (e) => {
        fuelSelector.forEach( (item) => {
            console.log("remove active");
            item.classList.remove("active");
        });
        item.classList.add("active");
        
        let filter = getFilter();
        filter.fuel = item.textContent.toString().replace(/\s/g, '');
        setFilter(filter);
    });
});

$(".input-select-fuel").change(function() {
    $(".input-select-fuel").not(this).prop('checked', false);
});

const resetFilter = () => {
    document.querySelectorAll(".select-merk-item").forEach(item => {
        const resultName = item.textContent.toString().replace(/\s/g, '')
        if(resultName.toString() === "Semua"){
            item.click();
            return false;
        }
    });

    document.querySelectorAll(".select-color-item").forEach(item => {
        const resultName = item.textContent.toString().replace(/\s/g, '')
        if(resultName.toString() === "Semua"){
            item.click();
            return false;
        }
    });

    document.querySelectorAll(".select-fuel-item").forEach(item => {
        const resultName = item.textContent.toString().replace(/\s/g, '')
        if(resultName.toString() === "Semua"){
            item.click();
            return false;
        }
    });

    document.querySelector("#tahun-awal").value = "";
    document.querySelector("#tahun-akhir").value = "";
    document.querySelector("#harga-awal").value = "";
    document.querySelector("#harga-akhir").value = "";

    clearFilter();
    const keyword = $('#input-search').val();
    loadCars(keyword);
}

// $("#tahun-awal").datepicker({
//     format: "yyyy",
//     viewMode: "years", 
//     minViewMode: "years"
// });

// $("#tahun-akhir").datepicker({
//     format: "yyyy",
//     viewMode: "years", 
//     minViewMode: "years"
// });

const prepareFilter = () => {
    const filter = getFilter();
    if(filter.merk != ''){
        document.querySelectorAll(".select-merk-item").forEach(item => {
            const resultName = item.textContent.toString().replace(/\s/g, '')
            if(filter.merk === resultName.toString()){
                item.click();
                return false;
            }
        });
    }

    if(filter.color != ''){
        document.querySelectorAll(".select-color-item").forEach(item => {
            const resultName = item.textContent.toString().replace(/\s/g, '')
            if(filter.color === resultName.toString()){
                item.click();
                return false;
            }
        });
    }

    if(filter.fuel != ''){
        document.querySelectorAll(".select-fuel-item").forEach(item => {
            const resultName = item.textContent.toString().replace(/\s/g, '')
            if(filter.fuel === resultName.toString()){
                item.click();
                return false;
            }
        });
    }

    if(filter.start_year != ''){
        document.querySelector("#tahun-awal").value = filter.start_year;
    }

    if(filter.end_year != ''){
        document.querySelector("#tahun-akhir").value = filter.end_year;
    }

    if(filter.start_price != ''){
        document.querySelector("#harga-awal").value = filter.start_price;
    }

    if(filter.end_price != ''){
        document.querySelector("#harga-akhir").value = filter.end_price;
    }
}

const isFiltered = ()=> $('#toggleFilter').html('<i class="fi fi-sr-filter text-white headline5"></i>');

const isNotFiltered = ()=> $('#toggleFilter').html('<i class="fi fi-rr-filter text-white headline5"></i>');

window.onload = prepareFilter();