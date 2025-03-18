/**********************************************/
/* تابع باز و بسته کردن منو */
function toggleMenu() {
    var menu = document.getElementById('menu');
    var menuButton = document.getElementById('menuButton');
    menu.classList.toggle('active');
    menuButton.style.opacity = menu.classList.contains('active') ? '0' : '1';
}

/**********************************************/
/* مقداردهی اولیه نقشه */
const map = L.map('map', {
    center: [36.2970, 59.6062], // مشهد
    zoom: 13,
    minZoom: 10,
    maxZoom: 18,
    zoomControl: true
});

// افزودن لایه کاشی OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**********************************************/
/* تعریف خط پیش‌فرض */
L.polyline([
    [
        36.267182562343734,
        59.69953536987305
    ],
    [
        36.3661484883983,
        59.637308120727546
    ]
], {color: 'red', weight: 3}).addTo(map);

/**********************************************/
/* موقعیت‌یابی کاربر */
let userMarker = null;
function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                if (userMarker) {
                    map.removeLayer(userMarker);
                }

                userMarker = L.marker([lat, lng], {
                    icon: L.icon({
                        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })
                }).addTo(map).bindPopup("موقعیت شما");

                map.setView([lat, lng], 15);
            },
            (error) => {
                alert("خطا در دریافت موقعیت: " + error.message);
            }
        );
    } else {
        alert("مرورگر شما از قابلیت موقعیت‌یابی پشتیبانی نمی‌کند.");
    }
}

/**********************************************/
/* داده‌های جلسات AA */
let markers = [];
const meetings = [
    { id: 1569687315, name: "همیاران", lat: 36.31611283194718, lng: 59.66326117515565, time: "night", isClosed:false },
    { id: 1569687316, name: "نیک روز", lat: 36.31031838186039, lng: 59.68653470277786, time: "night", isClosed:false },
];

/* آیکون‌های جلسات */
const openIcon = L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41] });
const closedIcon = L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] });

/* تابع نمایش جلسات */
function displayMeetings(filters = []) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const filteredMeetings = filters.length === 0 ? meetings : meetings.filter(meeting => filters.includes(meeting.time));

    filteredMeetings.forEach(meeting => {
        const icon = meeting.isClosed ? closedIcon : openIcon;
        const marker = L.marker([meeting.lat, meeting.lng], { icon })
            .addTo(map)
            .bindPopup(`${meeting.name} - ${getTimeLabel(meeting.time)} (${meeting.isClosed ? "بسته" : "باز"})`);

        markers.push(marker);
    });
}

/* تبدیل زمان به فارسی */
function getTimeLabel(time) {
    switch (time) {
        case "morning": return "صبح";
        case "noon": return "ظهر";
        case "afternoon": return "عصر";
        case "night": return "شب";
        default: return "نامشخص";
    }
}

/**********************************************/
/* داده‌های مکان‌های مهم */
let placeMarkers = [];
const places = [
    { id: 1, name: "کلانتری ۱۱۰", lat: 36.315, lng: 59.564, type: "police" },
    { id: 2, name: "بیمارستان امام رضا", lat: 36.306, lng: 59.604, type: "hospital" },
    { id: 3, name: "پمپ بنزین ولیعصر", lat: 36.295, lng: 59.625, type: "gas_station" },
    { id: 4, name: "پمپ گاز توس", lat: 36.278, lng: 59.640, type: "cng_station" },
    { id: 5, name: "کلینیک سینا", lat: 36.322, lng: 59.650, type: "clinic" },
    { id: 6, name: "کمپ ترک اعتیاد امید", lat: 36.285, lng: 59.570, type: "camp" }
];

/* آیکون‌های مکان‌ها */
const placeIcons = {
    police: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] }),
    hospital: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] }),
    gas_station: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] }),
    cng_station: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] }),
    clinic: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] }),
    camp: L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [25, 41] })
};

/* تابع نمایش مکان‌ها */
function displayPlaces(filters = []) {
    placeMarkers.forEach(marker => map.removeLayer(marker));
    placeMarkers = [];

    // اگر هیچ چک‌باکسی انتخاب نشده باشد، هیچ مکانی نمایش داده نشود
    if (filters.length === 0) return;

    const filteredPlaces = places.filter(place => filters.includes(place.type));

    filteredPlaces.forEach(place => {
        const icon = placeIcons[place.type] || placeIcons["clinic"];
        const marker = L.marker([place.lat, place.lng], { icon })
            .addTo(map)
            .bindPopup(`${place.name}`);

        placeMarkers.push(marker);
    });
}

/**********************************************/
/* فیلتر کردن جلسات و مکان‌ها */
function updateFilters() {
    // جلسات: فقط چک‌باکس‌های فعال را فیلتر کنیم (پیش‌فرض همه فعال)
    let selectedMeetings = [];
    if (document.getElementById("filterMorning").checked) selectedMeetings.push("morning");
    if (document.getElementById("filterNoon").checked) selectedMeetings.push("noon");
    if (document.getElementById("filterAfternoon").checked) selectedMeetings.push("afternoon");
    if (document.getElementById("filterNight").checked) selectedMeetings.push("night");

    // مکان‌ها: پیش‌فرض همه خاموش باشند، فقط اگر کلیک شدند فعال شوند
    let selectedPlaces = [];
    if (document.getElementById("filterPolice").checked) selectedPlaces.push("police");
    if (document.getElementById("filterHospitals").checked) selectedPlaces.push("hospital");
    if (document.getElementById("filterGasStations").checked) selectedPlaces.push("gas_station");
    if (document.getElementById("filterCNGStations").checked) selectedPlaces.push("cng_station");
    if (document.getElementById("filterClinics").checked) selectedPlaces.push("clinic");
    if (document.getElementById("filterCamps").checked) selectedPlaces.push("camp");

    // نمایش داده‌ها
    displayMeetings(selectedMeetings);
    displayPlaces(selectedPlaces);
}

/* نمایش اولیه همه نقاط */
document.addEventListener("DOMContentLoaded", () => {
    updateFilters();
});
