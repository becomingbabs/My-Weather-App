/* Get real time/date */ 

function getDate(timestamp) {
let today = new Date(timestamp); 

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let day = days[today.getDay()]; 
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
let month = months[today.getMonth()]; 
let date = today.getDate(); 
let year = today.getFullYear(); 
let fullDate = `${day}, ${month} ${date}, ${year}`; 
let hours = today.getHours(); 
let minutes = today.getMinutes(); 

  if (hours < 10) {
    hours = `0${hours}`; 
  }
  if (minutes < 10) {
    minutes = `0${minutes}`; 
  }

return `${fullDate} <br> ${hours}:${minutes}`;   
} 



// API Weather changes // 

 function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#current-city").innerHTML = response.data.name; 
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp); 

  celsiusTemp = response.data.main.temp; 

  let dateTime = document.querySelector("#date"); 
  dateTime.innerHTML = getDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl); 
  axios.get(apiUrl).then(showWeather);
}

function citySubmit(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-box").value; 
  search(city); 
}

function searchLocation(position) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl); 
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/*  Change between F to C */ 

function unitChange(event) {
  event.preventDefault();
  let farenheit = (celsiusTemp * 9/5) + 32; 
  celsiusLink.classList.remove("active");  
  farenheitLink.classList.add("active");  
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = Math.round(farenheit);
}

 function changeBack(event) {
  event.preventDefault(); 
  celsiusLink.classList.add("active");  
  farenheitLink.classList.remove("active");
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null; 

let button = document.querySelector("#search-button"); 
button.addEventListener("click", citySubmit);

let currentButton = document.querySelector("#current-button"); 
currentButton.addEventListener("click", getCurrentLocation); 

let farenheitLink = document.querySelector("#fahrenheit-link");
 farenheitLink.addEventListener("click", unitChange); 

let celsiusLink = document.querySelector("#celsius-link");
 celsiusLink.addEventListener("click", changeBack); 

search("Santiago"); 

