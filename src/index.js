/* Get real time/date */ 

function dateTime(timestamp) {
let today = new Date(timestamp); 

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let day = days[today.getDay()]; 
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
let month = months[today.getMonth()]; 
let date = today.getDate();
let fullDate = `${day}, ${month} ${date}`; 
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
  document.querySelector("#description").innerHTML = response.data.weather[0].description; 
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  celsiusTemp = response.data.main.temp; 

  let showDate = document.querySelector("#date"); 
  showDate.innerHTML = dateTime(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl); 
  axios.get(apiUrl).then(showWeather);
}

function cityEntered(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-box").value; 
  search(city); 
}

function getCoords(position) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl); 
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(getCoords);
}

/*  Change between F to C */ 

function showFaren(event) {
  event.preventDefault();
  let farenheit = (celsiusTemp * 9/5) + 32; 
  celsiusLink.classList.remove("active");  
  farenheitLink.classList.add("active");  
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = Math.round(farenheit);
}

 function showCels(event) {
  event.preventDefault(); 
  celsiusLink.classList.add("active");  
  farenheitLink.classList.remove("active");
  let changeUnit = document.querySelector("#temp"); 
  changeUnit.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null; 

let button = document.querySelector("#search-button"); 
button.addEventListener("click", cityEntered);

let currentButton = document.querySelector("#current-button"); 
currentButton.addEventListener("click", searchLocation); 

let farenheitLink = document.querySelector("#fahrenheit-link");
 farenheitLink.addEventListener("click", showFaren); 

let celsiusLink = document.querySelector("#celsius-link");
 celsiusLink.addEventListener("click", showCels); 

search("Santiago"); 

