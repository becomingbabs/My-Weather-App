/* Get real time/date */ 

let today = new Date(); 

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let day = days[today.getDay()]; 
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
let month = months[today.getMonth()]; 
let date = today.getDate(); 
let year = today.getFullYear(); 

let fullDate = `${day}, ${month} ${date}, ${year}`; 

let hours = today.getHours(); 
let minutes = today.getMinutes(); 
let seconds = today.getSeconds(); 

let time = `${hours}:${minutes}:${seconds}`; 

let dateTime = `${fullDate} <br> ${time}`; 

document.querySelector("#date").innerHTML = `${dateTime}`;  

/*  Change between F to C */ 

function unitChange(event) {
  event.preventDefault();
  let farenheit = 79; 
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = `${farenheit}`;
}

let farenheitLink = document.querySelector("#fahrenheit-link");
 farenheitLink.addEventListener("click", unitChange); 


 function changeAgain(event) {
  event.preventDefault();
  let celsius = 26; 
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = `${celsius}`;
}

let celsiusLink = document.querySelector("#celsius-link");
 celsiusLink.addEventListener("click", changeAgain); 

// API Weather changes // 

 function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#current-city").innerHTML = response.data.name; 
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp); 
}

function search(city) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  console.log(`${apiUrl}`);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function citySubmit(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-box").value; 
  search(city); 
}

function searchLocation(position) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}


function getCurrentLocation(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#search-button"); 
button.addEventListener("click", citySubmit);

let currentButton = document.querySelector("#current-button"); 
currentButton.addEventListener("click", getCurrentLocation); 

search("Santiago"); 
