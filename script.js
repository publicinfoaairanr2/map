/**
 * @file مدیریت نقشه و نمایش جلسات AA و مکان‌های مهم
 */

// تنظیمات و متغیرهای سراسری
const CONFIG = {
    defaultLocation: [36.2970, 59.6062], // مشهد
    defaultZoom: 13,
    minZoom: 10,
    maxZoom: 18
};

// آیکون‌های مورد استفاده
const ICONS = {
    user: L.icon({
        iconUrl: 'images/user.png',
        iconSize: [20, 20],
        iconAnchor: [0, 0]
    }),
    meetingOpen: L.icon({
        iconUrl: 'images/m_blue.png',
        iconSize: [40, 40]
    }),
    meetingClosed: L.icon({
        iconUrl: 'images/m_red.png',
        iconSize: [40, 40]
    }),
    place: L.icon({
        iconUrl: 'images/place.png',
        iconSize: [40, 40]
    })
};

// داده‌های جلسات
const MEETINGS = [
    {nu:1, id: 1569687317, name: "ظهر آزادی", lat: 36.34143067011347, lng: 59.63444754481317, time: "noon", isClosed:false },
    {nu:2, id: 1569687300, name: "ظهر مهرآباد", lat: 36.280654256395046, lng: 59.667415916919715, time: "noon", isClosed:false },
    {nu:3, id: 1569687486, name: "ظهر نشاط", lat: 36.3083817594449, lng: 59.64717328548432, time: "noon", isClosed:false },
    {nu:4, id: 1569687312, name: "آرمون", lat: 36.2875081425391, lng: 59.664076566696174, time: "night", isClosed:false },
    {nu:5, id: 1569687462, name: "ابوذر", lat: 36.308632485593165, lng: 59.62988913059235, time: "night", isClosed:false },
    {nu:6, id: 1569687905, name: "صبح بهمن", lat: 36.345649834323204, lng: 59.61667563332185, time: "morning", isClosed:false },
    {nu:7, id: 1569687310, name: "حکمت", lat: 36.39292667675493, lng: 59.67340421670089, time: "night", isClosed:false },
    {nu:8, id: 1569687314, name: "راه ابریشم", lat: 36.20667618467275, lng: 59.76513147354126, time: "night", isClosed:false },
    {nu:9, id: 1569688034, name: "صبح زندگی", lat: 36.28701257272533, lng: 59.665232041725915, time: "morning", isClosed:false },
    {nu:10, id: 1569687309, name: "شب معجزه", lat: 36.33149704911336, lng: 59.698526859283454, time: "night", isClosed:false },
    {nu:11, id: 1569687318, name: "گلهای کلات", lat: 36.99464558041857, lng: 59.771834356501984, time: "night", isClosed:false },
    {nu:12, id: 1569687306, name: "شب فجر", lat: 36.31757804929432, lng: 59.64199855342311, time: "night", isClosed:false },
    {nu:13, id: 1569687316, name: "نیک روز", lat: 36.31031838186039, lng: 59.68653470277786, time: "night", isClosed:false },
    {nu:14, id: 1569687315, name: "همیاران", lat: 36.31611283194718, lng: 59.66326117515565, time: "night", isClosed:false },
    {nu:15, id: 1569687436, name: "شب نشاط", lat: 36.30841418097496, lng: 59.647272527217865, time: "night", isClosed:false },
    {nu:16, id: 1569687433, name: "صبح فجر", lat: 36.31758412735139, lng: 59.641987009055654, time: "morning", isClosed:false },
    {nu:17, id: 1569688078, name: "شب آزادی", lat: 36.274443765809195, lng: 59.69249826511526, time: "night", isClosed:false },
    {nu:18, id: 1569687487, name: "شب ابرار", lat: 36.31835120507939, lng: 59.68168090442003, time: "night", isClosed:false },
    {nu:19, id: 1569687494, name: "شب عشق و امید", lat: 36.362689923828924, lng: 59.66584966055663, time: "night", isClosed:false },
    //
    {nu:21, id: 1569687539, name: "نیایش", lat: 36.300965520618846, lng: 59.61454153060914, time: "afternoon", isClosed:false },
    {nu:22, id: 1569687538, name: "ظهر پنجتن", lat: 36.312485825124874, lng: 59.67131428420713, time: "noon", isClosed:false },
    {nu:23, id: 1569687602, name: "شب لاله", lat: 36.31476228399316, lng: 59.688752655149834, time: "night", isClosed:false },
    {nu:24, id: 1569687608, name: "صبح پنجتن", lat: 36.31449625115507, lng: 59.68135872694617, time: "morning", isClosed:false },
    {nu:25, id: 1569688080, name: "مسیر زندگی", lat: 36.32798273163978, lng: 59.651513699626626, time: "night", isClosed:false },
    {nu:26, id: 1569687824, name: "امید میامی", lat: 36.251533430494476, lng: 60.12534141540528, time: "night", isClosed:false },
    {nu:27, id: 1569687767, name: "ظهر آسمان", lat: 36.2973085274899, lng: 59.607088522844435, time: "noon", isClosed:false },
    {nu:28, id: 1569687659, name: "شب آرامش", lat: 36.330088583233625, lng: 59.66486444051824, time: "night", isClosed:false },
    {nu:29, id: 1569687748, name: "ظهر شفیعی گلشهر", lat: 36.29231107651871, lng: 59.68233984426679, time: "noon", isClosed:false },
    {nu:30, id: 1569687785, name: "شب بهمن", lat: 36.34531194635828, lng: 59.621249029569114, time: "night", isClosed:false },
    {nu:31, id: 1569687305, name: "امید خلق آباد", lat: 36.39572826137379, lng: 59.63342964649201, time: "night", isClosed:false },
    {nu:32, id: 1569688079, name: "امید گلشهر", lat: 36.29898641469837, lng: 59.67063228560866, time: "night", isClosed:false },
    {nu:33, id: 1569687915, name: "عصر شفیعی", lat: 36.29885779577981, lng: 59.689104553900016, time: "afternoon", isClosed:false },
    {nu:34, id: 1569687928, name: "شب آسمان", lat: 36.29738427117523, lng: 59.60713790350447, time: "night", isClosed:false },
    {nu:35, id: 1569687930, name: "ظهر رسالت", lat: 36.32420464940783, lng: 59.643036588959795, time: "noon", isClosed:false },
    {nu:36, id: 1569688032, name: "صبح حکمت", lat: 36.39360572745487, lng: 59.67175629589459, time: "morning", isClosed:false },
    {nu:37, id: 1569687953, name: "امید کوشک آباد", lat: 36.678028485687335, lng: 59.62652131145774, time: "night", isClosed:false },
    {nu:38, id: 1569687957, name: "شب رهایی", lat: 36.32370799769551, lng: 59.64268853171481, time: "night", isClosed:false },
    {nu:39, id: 1569687829, name: "عصر کبود گنبد کلات", lat: 36.99459797373597, lng: 59.77192816317744, time: "afternoon", isClosed:false },
    {nu:40, id: 1569688050, name: "صبح نشاط", lat: 36.30836230652038, lng: 59.64711403955924, time: "morning", isClosed:false },
    {nu:41, id: 1569688053, name: "گلهای بلغور", lat: 36.84693687282908, lng: 59.60190964373688, time: "night", isClosed:false },
    // {nu:42, id: 42, name: "عصر گلبو", lat: 36.2875081425391, lng: 59.664076566696174, time: "afternoon", isClosed:false },
    {nu:43, id: 43, name: "صبح رهایی", lat:36.298950844866006,lng:59.65561151552875, time: "morning", isClosed:false },
    {nu:44, id: 44, name: "شب مفتح", lat:36.28785406405296,lng:59.65716722226003, time: "night", isClosed:false },
    {nu:45, id: 45, name: "شب وحدت", lat:36.28716221949179,lng:59.632799375286105, time: "night", isClosed:false },
];

// داده‌های مکان‌های مهم
const PLACES = [
    { id: 1, name: "کلینیک دانیال", lat: 36.3069,lng: 59.6626, type: "clinic" },
    { id: 2, name: "کلینیک نگار", lat: 36.3067,lng: 59.6626, type: "clinic" },
    { id: 3, name: "کلینیک بهار سلامت", lat: 36.3167,lng: 59.6177, type: "clinic" },
    { id: 4, name: "کلینیک بنیاد", lat: 36.3391,lng: 59.6250, type: "clinic" },
    //
    // { id: 11, name: "کمپ ترک اعتیاد امید دوباره رهایی", lat: 36.285, lng: 59.570, type: "camp" },
    { id: 12, name: "کمپ ترک اعتیاد خانه امید", lat: 36.330, lng: 59.684, type: "camp" },
    // { id: 13, name: "کمپ ترک اعتیاد ارسلان", lat: 36.285, lng: 59.570, type: "camp" },
    { id: 14, name: "کمپ ترک اعتیاد شکوه پرواز", lat: 36.340, lng: 59.746, type: "camp" },
    { id: 15, name: "کمپ ترک اعتیاد رضوان گستر عصر", lat: 36.285, lng: 59.700, type: "camp" },
    // { id: 16, name: "کمپ ترک اعتیاد اشک شوق", lat: 36.285, lng: 59.570, type: "camp" },
    { id: 17, name: "کمپ ترک اعتیاد بهشت سبز سعادت", lat: 36.311, lng: 59.686, type: "camp" },
    // { id: 18, name: "کمپ ترک اعتیاد امیر علی", lat: 36.285, lng: 59.570, type: "camp" },
    { id: 19, name: "کمپ ترک اعتیاد آسمان آبی", lat: 36.339, lng: 59.639, type: "camp" },
    { id: 20, name: "کمپ ترک اعتیاد افق", lat: 36.379, lng: 59.676, type: "camp" },
    // { id: 21, name: "کمپ ترک اعتیاد رهایی و زندگی", lat: 36.285, lng: 59.570, type: "camp" },
    //
    { name: "مرکز اشکان (۱)", lat: 36.279,lng: 59.694, type: "correctional_center" },
    { name: "مرکز بهار", lat: 36.340,lng: 59.698, type: "correctional_center" },
    { name: "مرکز خلق آباد", lat: 36.387,lng: 59.645, type: "correctional_center" },
    { name: "مرکز امید آزادی", lat: 36.264,lng: 59.755, type: "correctional_center" },
    { name: "مرکز اشکان (۲)", lat: 36.216,lng: 59.814, type: "correctional_center" },
    { name: "مرکز ثامن (۳)", lat: 36.476,lng: 59.675, type: "correctional_center" },
    //
    { "name": "بیمارستان امام سجاد", "lat": 36.30026178, "lng": 59.674040919999996, "type": "hospital" },
    { "name": "بیمارستان بیست و دو بهمن", "lat": 36.299354, "lng": 59.660503, "type": "hospital" },
    { "name": "بیمارستان امام حسین", "lat": 36.299, "lng": 59.647, "type": "hospital" },
    { "name": "بیمارستان هاشمی نژاد", "lat": 36.301, "lng": 59.646, "type": "hospital" },
    { "name": "بیمارستان حجازی", "lat": 36.315, "lng": 36.315, "type": "hospital" },
    //
    { "name": "درمانگاه امام حسن بن علی", "lat": 36.291751975, "lng": 59.64351135, "type": "hospital" },
    { "name": "درمانگاه حضرت زینب", "lat": 36.294, "lng": 59.677, "type": "hospital" },
    { "name": "درمانگاه امین اطبا", "lat": 36.296, "lng": 59.680, "type": "hospital" },
    { "name": "درمانگاه خیریه امام جواد", "lat": 36.300, "lng": 59.662, "type": "hospital" },
    { "name": "درمانگاه المهدی", "lat": 36.306, "lng": 59.657, "type": "hospital" },
    { "name": "درمانگاه امید شفا", "lat": 36.310, "lng": 59.651, "type": "hospital" },
    { "name": "درمانگاه ثارالله", "lat": 36.308, "lng": 59.664, "type": "hospital" },
    { "name": "درمانگاه دکتر رحمتی", "lat": 36.310, "lng": 59.669, "type": "hospital" },
    { "name": "درمانگاه مصلی", "lat": 36.322, "lng": 59.693, "type": "hospital" },
    { "name": "درمانگاه شبانه‌روزی طبرسی", "lat": 36.3201156, "lng": 59.6674189, "type": "hospital" },
    { "name": "درمانگاه نور القائم", "lat": 36.3201156, "lng": 59.6674189, "type": "hospital" },
    { "name": "درمانگاه شبانه روزی نورالقائم(عج)", "lat": 36.316, "lng": 59.662, "type": "hospital" },
    { "name": "درمانگاه بلال حبشی", "lat": 36.32313688, "lng": 59.63456649999999, "type": "hospital" },
    { "name": "درمانگاه رسالت", "lat": 36.322558, "lng": 59.640667, "type": "hospital" },
    { "name": "درمانگاه سیدالشهدا", "lat": 36.330, "lng": 59.649, "type": "hospital" },
    { "name": "درمانگاه روح الله", "lat": 36.312, "lng": 59.638, "type": "hospital" },
    { "name": "درمانگاه فجر", "lat": 36.320302, "lng": 59.667167, "type": "hospital" },
    //
    { "name": "کلانتری بیست و هفت شهرک رجائی", "lat": 36.266607557142855, "lng": 59.667712314285716, "type": "police" },
    { "name": "کلانتری مصلی", "lat": 36.27861108, "lng": 59.62574224, "type": "police" },
    { "name": "کلانتری سی و سه شهید باهنر", "lat": 36.24675876666667, "lng": 59.71384713333334, "type": "police" },
    { "name": "کلانتری ثامن", "lat": 36.2721578, "lng": 59.61935642500001, "type": "police" },
    { "name": "کلانتری بیست و چهار میزرا کوچک خان", "lat": 36.280841439999996, "lng": 59.64728742, "type": "police" },
    { "name": "کلانتری بیست و پنج میدان جهاد", "lat": 36.27300604, "lng": 59.569136400000005, "type": "police" },
    { "name": "کلانتری هجده شهید فیاض بخش", "lat": 36.27642741666667, "lng": 59.59070221666667, "type": "police" },
    { "name": "ایستگاه پلیس آزاد شهر", "lat": 36.326385, "lng": 59.535143, "type": "police" },
    { "name": "کلانتری سناباد", "lat": 36.307034, "lng": 59.57271426, "type": "police" },
    { "name": "داروخانه دکتر مهین دخت کلانتری", "lat": 36.2946711, "lng": 59.6705819, "type": "police" },
    { "name": "کلانتری بیست و یک سجاد", "lat": 36.319992, "lng": 59.542374, "type": "police" },
    { "name": "ایستگاه پلیس راهنمای و رانندگی", "lat": 36.3262907, "lng": 59.6242484, "type": "police" },
    { "name": "کلانتری آبکوه", "lat": 36.339071, "lng": 59.561821, "type": "police" },
    { "name": "کلانتری امام رضا", "lat": 36.283545, "lng": 59.613115, "type": "police" },
    { "name": "ایستگاه پلیس راهنمایی و رانندگی فردوسی", "lat": 36.324337, "lng": 59.56225, "type": "police" },
    { "name": "ایستگاه پلیس دانش", "lat": 36.278854, "lng": 59.608195, "type": "police" },
    { "name": "کلانتری شانزده ابوذر غفاری", "lat": 36.288894, "lng": 59.564389, "type": "police" },
    { "name": "ایستگاه پلیس راهنمایی و رانندگی چهارراه نادری", "lat": 36.294166, "lng": 59.610193, "type": "police" },
    { "name": "مطب دکتر محمد ابراهیم کلانتری", "lat": 36.289205, "lng": 59.572846, "type": "police" },
    { "name": "مطب دکتر مسعود کلانتری", "lat": 36.3154709, "lng": 59.5589416, "type": "police" },
    { "name": "ایستگاه اتوبوس شهید کلانتری سیزده", "lat": 36.29804, "lng": 59.54208, "type": "police" },
    { "name": "ایستگاه پلیس نجفی", "lat": 36.2913132, "lng": 59.5377348, "type": "police" },
    { "name": "کلانتری چهل و یک رسالت", "lat": 36.317474, "lng": 59.638953, "type": "police" },
    { "name": "حوزه کلانتری بیست و یک سجاد", "lat": 36.326384, "lng": 59.535149, "type": "police" },
    { "name": "پایگاه مقاومت بسیج شهید کلانتری", "lat": 36.3041768, "lng": 59.641273, "type": "police" },
    { "name": "کلانتری بیست و نه شیرازی", "lat": 36.291382, "lng": 59.616662, "type": "police" },
    { "name": "کلانتری بیست و پنج خواجه ربیع", "lat": 36.329945, "lng": 59.624886, "type": "police" },
    { "name": "کلانتری سی سپاد", "lat": 36.348897, "lng": 59.598221, "type": "police" },
    { "name": "کلانتری سی و نه طبرسی شمالی", "lat": 36.328043, "lng": 59.681005, "type": "police" },
    { "name": "کلانتری آستانه پرست", "lat": 36.2982401, "lng": 59.6192676, "type": "police" },
    { "name": "ایستگاه پلیس راهنمایی و رانندگی پنجراه", "lat": 36.281424, "lng": 59.623633, "type": "police" },
    { "name": "ایستگاه پلیس", "lat": 36.2642625, "lng": 59.6716649, "type": "police" },
    { "name": "مجموعه ورزشی شهید کلانتری", "lat": 36.3008025, "lng": 59.5376377, "type": "police" },
    { "name": "کلانتری گلشهر", "lat": 36.297954, "lng": 59.664039, "type": "police" },
    { "name": "کیوسک کلانتری امام رضا", "lat": 36.2788828, "lng": 59.608031, "type": "police" },
    { "name": "کلانتری چهل و دو نواب صفوی", "lat": 36.2836659, "lng": 59.6254102, "type": "police" },
    { "name": "ایستگاه پلیس راهنمایی رانندگی", "lat": 36.283506, "lng": 59.612473, "type": "police" },
    { "name": "کلانتری خلق آباد", "lat": 36.392153, "lng": 59.638541, "type": "police" },
    { "name": "ایستگاه پلیس راهنمایی و رانندگی چهارطبقه", "lat": 36.291878, "lng": 59.601924, "type": "police" },
    { "name": "ایستگاه اتوبوس شهید کلانتری هجده", "lat": 36.2967, "lng": 59.54296, "type": "police" },
    //
    { "name": "ایستگاه اختصاصی صد و چهل و نه", "lat": 36.318373980000004, "lng": 59.59089252, "type": "gas_station" },
    { "name": "مشهد،کوشش، بلوار جمهوری اسلامی، جمهوری اسلامی سیزده، خ فارابی", "lat": 36.26340482857143, "lng": 59.602881028571424, "type": "gas_station" },
    { "name": "پمپ بنزین صد و پنجاه و دو کوهسنگی", "lat": 36.2786445, "lng": 59.5543219, "type": "gas_station" },
    { "name": "جایگاه سوخت عدالتیان", "lat": 36.3500939, "lng": 59.62854143333334, "type": "gas_station" },
    { "name": "جایگاه سوخت سه منظوره سازگار", "lat": 36.26056261666667, "lng": 59.680313149999996, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره صد و بیست و دو جلالیان", "lat": 36.3403249, "lng": 59.65517279999999, "type": "gas_station" },
    { "name": "پمپ بنزین صد و شش خواجه ربیع", "lat": 36.32305828, "lng": 59.621065959999996, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره هفده شهریور شماره صد و هفت", "lat": 36.272136100000004, "lng": 59.613213349999995, "type": "gas_station" },
    { "name": "جایگاه اختصاصی پزشکی صد و دو", "lat": 36.31875952, "lng": 59.582833019999995, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره صد و هجده کوهی", "lat": 36.35357066, "lng": 59.55960458, "type": "gas_station" },
    { "name": "پمپ بنزین صد و سی و هشت توس", "lat": 36.33461736, "lng": 59.57671187999999, "type": "gas_station" },
    { "name": "پمپ بنزین صد و سی و سه پهلوان", "lat": 36.332132916666666, "lng": 59.544513783333336, "type": "gas_station" },
    { "name": "جایگاه دو منظوره علی نژاد", "lat": 36.30157125, "lng": 59.66445428333333, "type": "gas_station" },
    { "name": "جایگاه اختصاصی صد و بیست و هشت طبرسی", "lat": 36.30722052, "lng": 59.645908940000005, "type": "gas_station" },
    { "name": "پمپ بنزین صد و هفتاد و یک سعدآباد", "lat": 36.30229344000001, "lng": 59.58966352, "type": "gas_station" },
    { "name": "جایگاه سوخت آزادی شماره صد و بیست و یک", "lat": 36.26728434, "lng": 59.655716059999996, "type": "gas_station" },
    { "name": "پمپ بنزین صد و چهل و پنج فخار", "lat": 36.271196, "lng": 59.5758154, "type": "gas_station" },
    { "name": "جایگاه سوخت CNG", "lat": 36.2580155, "lng": 59.6206804, "type": "gas_station" },
    { "name": "پمپ بنزین صد و شصت و چهار مجاور", "lat": 36.2866717, "lng": 59.6554148, "type": "gas_station" },
    { "name": "پمپ بنزین صد و هشتاد و شش الماس بهارستان", "lat": 36.345288, "lng": 59.610291, "type": "gas_station" },
    { "name": "پمپ بنزین صد و چهل و هشت مینائی", "lat": 36.324406, "lng": 59.598112, "type": "gas_station" },
    { "name": "پمپ بنزین جایگاه اختصاصی صد و هفتاد و هفت", "lat": 36.3785121, "lng": 59.6714756, "type": "gas_station" },
    { "name": "جایگاه گازوئیل صد و دوازده مسافربری", "lat": 36.25996, "lng": 59.588514, "type": "gas_station" },
    { "name": "پمپ بنزین سجاد", "lat": 36.349835, "lng": 59.579351, "type": "gas_station" },
    { "name": "پمپ بنزین صد و سیزده کامرانفر", "lat": 36.28811, "lng": 59.55811, "type": "gas_station" },
    { "name": "پمپ بنزین نیشان توس", "lat": 36.279429, "lng": 59.628732, "type": "gas_station" },
    { "name": "پمپ بنزین صد و شصت و چهار مجاور", "lat": 36.281617, "lng": 59.6570295, "type": "gas_station" },
    { "name": "جایگاه سوخت صد و شصت و سه", "lat": 36.268903, "lng": 59.607808, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره راه ابریشم", "lat": 36.268927, "lng": 59.695258, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره صد و بیست و یک آزادی", "lat": 36.2672955, "lng": 59.6557465, "type": "gas_station" },
    { "name": "پمپ بنزین صد و شصت و سه فداییان اسلام", "lat": 36.268901, "lng": 59.607806, "type": "gas_station" },
    { "name": "پمپ بنزین طلاب شماره صد و هشت", "lat": 36.297994, "lng": 59.63404, "type": "gas_station" },
    { "name": "جایگاه سوخت سه منظوره ولیعصر", "lat": 36.3813833, "lng": 59.6377909, "type": "gas_station" },
    { "name": "پمپ بنزین صد و چهل جهانی پور", "lat": 36.348991, "lng": 59.576527, "type": "gas_station" },
    { "name": "جایگاه سوخت دو منظوره امام خمینی", "lat": 36.25609, "lng": 59.69289, "type": "gas_station" },
    { "name": "پمپ بنزین صد و هشتاد و چهار معراج", "lat": 36.3421425, "lng": 59.5945101, "type": "gas_station" },
    { "name": "پمپ بنزین نادر", "lat": 36.26263, "lng": 59.648164, "type": "gas_station" },
    { "name": "جایگاه بنزین رادمرد", "lat": 36.3579007, "lng": 59.6649331, "type": "gas_station" },
    { "name": "پمپ بنزین سیار خیام جنوبی", "lat": 36.3107363, "lng": 59.5560381, "type": "gas_station" },
    { "name": "جایگاه بنزین و گاز طبیعی بهمن", "lat": 36.3501017, "lng": 59.6282142, "type": "gas_station" }
];

// جدول تبدیل کدهای زمان به متن فارسی
const TIME_LABELS = {
    "morning": "صبح",
    "noon": "ظهر",
    "afternoon": "عصر",
    "night": "شب",
    "default": "نامشخص"
};

// کلاس مدیریت نقشه
class MapManager {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.meetingMarkers = [];
        this.placeMarkers = [];

        this.initialize();
        this.setupEventListeners();
    }

    /**
     * راه‌اندازی اولیه نقشه
     */
    initialize() {
        // ایجاد نقشه
        this.map = L.map('map', {
            center: CONFIG.defaultLocation,
            zoom: CONFIG.defaultZoom,
            minZoom: CONFIG.minZoom,
            maxZoom: CONFIG.maxZoom,
            zoomControl: true
        });

        // افزودن لایه کاشی OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // افزودن خط پیش‌فرض
        this.addDefaultRoute();
    }

    /**
     * افزودن خط پیش‌فرض به نقشه
     */
    addDefaultRoute() {
        L.polyline([
            [
                36.267182562343734,
                59.69953536987305
            ],
            [
                36.27029661150109,
                59.69159603118897
            ],
            [
                36.276628128472815,
                59.68159675598145
            ],
            [
                36.282889943447486,
                59.67224121093751
            ],
            [
                36.27638594874375,
                59.66636180877686
            ],
            [
                36.26915480789592,
                59.65996742248536
            ],
            [
                36.27401600746136,
                59.64775800704957
            ],
            [
                36.276956799760534,
                59.640376567840576
            ],
            [
                36.27908448041087,
                59.63462591171265
            ],
            [
                36.28143697036607,
                59.624111652374275
            ],
            [
                36.284896385615696,
                59.62700843811036
            ],
            [
                36.286721165382474,
                59.629851579666145
            ],
            [
                36.287681103487714,
                59.6304202079773
            ],
            [
                36.28913396032074,
                59.630591869354255
            ],
            [
                36.29240278929061,
                59.63095664978027
            ],
            [
                36.29584442416479,
                59.62821006774903
            ],
            [
                36.297643007108206,
                59.62115049362183
            ],
            [
                36.299718243589965,
                59.61771726608277
            ],
            [
                36.29404579975299,
                59.61022853851319
            ],
            [
                36.29724524714404,
                59.60677385330201
            ],
            [
                36.298127233892274,
                59.60795402526856
            ],
            [
                36.29947613551203,
                59.60668802261353
            ],
            [
                36.30310767777371,
                59.60919857025147
            ],
            [
                36.30815696979895,
                59.61230993270875
            ],
            [
                36.311580618791744,
                59.61443424224854
            ],
            [
                36.32024281675542,
                59.61975574493409
            ],
            [
                36.327503797873874,
                59.62400436401368
            ],
            [
                36.336700069393146,
                59.6054220199585
            ],
            [
                36.338221152528355,
                59.60692405700684
            ],
            [
                36.3409866821269,
                59.60846900939942
            ],
            [
                36.34416691976725,
                59.610357284545906
            ],
            [
                36.34665571080782,
                59.61173057556153
            ],
            [
                36.34803833812564,
                59.6074390411377
            ],
            [
                36.34949007038575,
                59.60675239562989
            ],
            [
                36.352946466817286,
                59.61104393005372
            ],
            [
                36.356817448638495,
                59.61645126342774
            ],
            [
                36.363383852514296,
                59.626321792602546
            ],
            [
                36.3661484883983,
                59.637308120727546
            ]
        ], {color: 'red', weight: 3}).addTo(this.map);
    }

    /**
     * تنظیم گوش‌دهنده‌های رویداد
     */
    setupEventListeners() {
        document.addEventListener("DOMContentLoaded", () => {
            this.updateFilters();

            // افزودن گوش‌دهنده به فیلترها
            const filterElements = document.querySelectorAll('input[type="checkbox"][id^="filter"]');
            filterElements.forEach(element => {
                element.addEventListener('change', () => this.updateFilters());
            });
        });
    }

    /**
     * بروزرسانی فیلترها و نمایش مجدد نقاط
     */
    updateFilters() {
        // فیلترهای جلسات
        const selectedMeetings = ['morning', 'noon', 'afternoon', 'night'].filter(time =>
            document.getElementById(`filter${this.capitalizeFirstLetter(time)}`).checked
        );

        // فیلترهای مکان‌ها
        const placeTypes = ['police', 'hospital', 'gas_station', 'cng_station', 'clinic', 'camp','correctional_center'];
        const selectedPlaces = placeTypes.filter(type => {
            const elementId = `filter${this.getFilterIdFromType(type)}`;
            return document.getElementById(elementId).checked;
        });

        // نمایش داده‌ها
        this.displayMeetings(selectedMeetings);
        this.displayPlaces(selectedPlaces);
    }

    /**
     * حرف اول یک رشته را بزرگ می‌کند
     * @param {string} string - رشته ورودی
     * @returns {string} رشته با حرف اول بزرگ
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * تبدیل نوع مکان به شناسه فیلتر
     * @param {string} type - نوع مکان
     * @returns {string} شناسه فیلتر
     */
    getFilterIdFromType(type) {
        const typeMap = {
            'police': 'Police',
            'hospital': 'Hospitals',
            'gas_station': 'GasStations',
            'cng_station': 'CNGStations',
            'clinic': 'Clinics',
            'camp': 'Camps',
            'correctional_center': 'CorrectionalCenters'
        };
        return typeMap[type] || 'Unknown';
    }

    /**
     * نمایش جلسات بر اساس فیلترها
     * @param {Array} filters - آرایه فیلترهای فعال
     */
    displayMeetings(filters = []) {
        // حذف مارکرهای قبلی
        this.meetingMarkers.forEach(marker => this.map.removeLayer(marker));
        this.meetingMarkers = [];

        // فیلتر کردن جلسات
        const filteredMeetings = filters.length === 0 ?
            [] :  // نمایش هیچ جلسه‌ای اگر هیچ فیلتری فعال نیست
            MEETINGS.filter(meeting => filters.includes(meeting.time));

        // نمایش جلسات فیلتر شده
        filteredMeetings.forEach(meeting => {
            const icon = meeting.isClosed ? ICONS.meetingClosed : ICONS.meetingOpen;
            const timeLabel = TIME_LABELS[meeting.time] || TIME_LABELS.default;
            const statusLabel = meeting.isClosed ? "بسته" : "باز";

            const marker = L.marker([meeting.lat, meeting.lng], { icon })
                .addTo(this.map)
                .bindPopup(`${meeting.name} - ${timeLabel} (${statusLabel})`);

            this.meetingMarkers.push(marker);
        });
    }

    /**
     * نمایش مکان‌ها بر اساس فیلترها
     * @param {Array} filters - آرایه فیلترهای فعال
     */
    displayPlaces(filters = []) {
        // حذف مارکرهای قبلی
        this.placeMarkers.forEach(marker => this.map.removeLayer(marker));
        this.placeMarkers = [];

        // اگر فیلتری انتخاب نشده باشد، هیچ مکانی نمایش داده نشود
        if (filters.length === 0) return;

        // فیلتر کردن مکان‌ها
        const filteredPlaces = PLACES.filter(place => filters.includes(place.type));

        // نمایش مکان‌های فیلتر شده
        filteredPlaces.forEach(place => {
            const marker = L.marker([place.lat, place.lng], { icon: ICONS.place })
                .addTo(this.map)
                .bindPopup(place.name);

            this.placeMarkers.push(marker);
        });
    }

    /**
     * موقعیت‌یابی کاربر
     */
    locateUser() {
        if (!navigator.geolocation) {
            alert("مرورگر شما از قابلیت موقعیت‌یابی پشتیبانی نمی‌کند.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // حذف مارکر قبلی در صورت وجود
                if (this.userMarker) {
                    this.map.removeLayer(this.userMarker);
                }

                // افزودن مارکر جدید
                this.userMarker = L.marker([lat, lng], { icon: ICONS.user })
                    .addTo(this.map)
                    .bindPopup("موقعیت شما");

                // تنظیم نمای نقشه روی موقعیت کاربر
                this.map.setView([lat, lng], 15);
            },
            (error) => {
                alert("خطا در دریافت موقعیت: " + error.message);
            }
        );
    }
}

/**
 * تابع باز و بسته کردن منو
 */
function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menuButton');

    menu.classList.toggle('active');
    menuButton.style.opacity = menu.classList.contains('active') ? '0' : '1';
}

// ایجاد نمونه از کلاس مدیریت نقشه
const mapApp = new MapManager();

// تعریف توابع سراسری
window.toggleMenu = toggleMenu;
window.locateUser = () => mapApp.locateUser();