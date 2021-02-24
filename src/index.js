/* Get real time/date */ 

function date(timestamp) {
let today = new Date(timestamp); 

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let day = days[today.getDay()]; 
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
let month = months[today.getMonth()]; 
let date = today.getDate();
let fullDate = `${day}, ${month} ${date}`; 


return `${fullDate} ${time(timestamp)}`;   
} 

function time(timestamp) {
  let today = new Date(timestamp); 
  let hours = today.getHours(); 
let minutes = today.getMinutes(); 

  if (hours < 10) {
    hours = `0${hours}`; 
  }
  if (minutes < 10) {
    minutes = `0${minutes}`; 
  }

  return `${hours}:${minutes}`; 
}

// Showing weather * forecast // 

 function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#current-city").innerHTML = response.data.name + ", <br>" + response.data.sys.country; 
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp); 
  document.querySelector("#description").innerHTML = response.data.weather[0].description; 
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector('#icon'); 

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);  
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp; 

  let showDate = document.querySelector("#date"); 
  showDate.innerHTML = date(response.data.dt * 1000);
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-2">
      <h3>
        ${time(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      alt="weather-icon"
      class="icon"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

// Searching City // 

function search(city) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl); 

  let apiForecast=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiForecast); 
  axios.get(apiForecast).then(displayForecast);

  document.getElementById('search-box').value='';
  celsiusLink.classList.add("active");  
  farenheitLink.classList.remove("active");
  
}

function cityEntered(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-box").value;  

  search(city);
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


// Current Location button //

function getCoords(position) {
  let apiKey = "6b9121d0e9ab077da17915a7fafe6157";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function searchLocation(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(getCoords);
}

// 

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
