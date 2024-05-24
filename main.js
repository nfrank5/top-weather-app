const APIKey = "e187dfd41d0d4238a26143218241705"; //FREE API
const goButton = document.getElementById("go");
const inputCity = document.getElementById("city");
const displayWeatherDiv = document.getElementById("display-weather");
const farenheitCelsiusButton = document.getElementById("farenheit-celsius");

let currentLocation = {}; 
let currentTemperatureSystem = "°C";


goButton.addEventListener("click", (e)=> {
  e.preventDefault();
  getCurrentWeather(inputCity.value).then(processData).then((data)=> {
    currentLocation = data;
    displayWeather();
    inputCity.value = "";
  }).catch((err)=>{    
    console.log(err);
    inputCity.placeholder = `${inputCity.value} City Not Found!`; 
    inputCity.value = "";
  });
})

farenheitCelsiusButton.addEventListener("click", toggleCelsiusFarenheit )


async function getCurrentWeather(location){
    let data;

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}&aqi=no`, 
    { mode: 'cors' });

    if(response.ok) {
      data = await response.json();
    } else {
      throw (
        `Error: Response status ${response.status}`
      );
    }
    return data 
}

function processData(data){
  const city = data.location.name;
  const country = data.location.country;
  const temperatureC = data.current.temp_c; 
  const temperatureF = data.current.temp_f
  const humidity = data.current.humidity;
  const is_day = data.current.is_day;
  const condition_icon = data.current.condition.icon;
  const condition_text = data.current.condition.text;
  return { city, country, temperatureC, temperatureF, humidity, condition_icon, condition_text, is_day }
}

function displayWeather(){
  displayWeatherDiv.innerHTML = "";
  inputCity.placeholder = "";

  let iconURL = `weather/64x64/${currentLocation.is_day?"day":"night"}/${currentLocation.condition_icon.slice(-7)}`;
  const image = new Image();
  const countryDiv = document.createElement("div");
  const cityDiv = document.createElement("div");
  const humidity = document.createElement("div");
  const temperature = document.createElement("div");
  const conditionDiv = document.createElement("div");
  const conditionText = document.createElement("div");

  image.src = iconURL;
  countryDiv.innerText = `Country: ${currentLocation.country}`;
  cityDiv.innerText = `City: ${currentLocation.city}`;
  humidity.innerText = `Humidity: ${currentLocation.humidity}%`;
  temperature.innerText = `Temperature: ${currentTemperatureSystem == "°C" ? currentLocation.temperatureC : currentLocation.temperatureF } ${currentTemperatureSystem}`;
  conditionText.innerText = `${currentLocation.condition_text}`;
  conditionDiv.classList.add("icon");
  displayWeatherDiv.classList.add("display-weather");


  displayWeatherDiv.appendChild(countryDiv);
  displayWeatherDiv.appendChild(cityDiv);
  displayWeatherDiv.appendChild(humidity);
  displayWeatherDiv.appendChild(temperature);
  conditionDiv.appendChild(conditionText);
  conditionDiv.appendChild(image);


  displayWeatherDiv.appendChild(conditionDiv);

}

function toggleCelsiusFarenheit() {
  currentTemperatureSystem = currentTemperatureSystem == "°C" ? "°F" : "°C";
  displayWeather();
}

async function getWeatherConditionsTable(){
  let weather_conditions_table;
  response = await fetch("weather_conditions.json");
  weather_conditions_table = await response.json();
  return weather_conditions_table
}

