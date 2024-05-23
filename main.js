const APIKey = "e187dfd41d0d4238a26143218241705";
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
    console.log(data)
    inputCity.value = "";
  });
})

farenheitCelsiusButton.addEventListener("click", toggleCelsiusFarenheit )


async function getCurrentWeather(location){
  const currentweather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}&aqi=no`);
  const data = await currentweather.json();
  return data
}

function processData(data){
  const city = data.location.name;
  const country = data.location.country;
  const temperatureC = data.current.temp_c; 
  const temperatureF = data.current.temp_f
  const humidity = data.current.humidity;

  return { city, country, temperatureC, temperatureF, humidity }
}

function displayWeather(){
  displayWeatherDiv.innerHTML = ""
  const countryDiv = document.createElement("div");
  const cityDiv = document.createElement("div");
  const humidity = document.createElement("div");
  const temperature = document.createElement("div");

  countryDiv.innerText = `Country: ${currentLocation.country}`;
  cityDiv.innerText = `City: ${currentLocation.city}`;
  humidity.innerText = `Humidity: ${currentLocation.humidity}%`;
  temperature.innerText = `Temperature: ${currentTemperatureSystem == "°C" ? currentLocation.temperatureC : currentLocation.temperatureF } ${currentTemperatureSystem}`;

  displayWeatherDiv.appendChild(countryDiv);
  displayWeatherDiv.appendChild(cityDiv);
  displayWeatherDiv.appendChild(humidity);
  displayWeatherDiv.appendChild(temperature);

}

function toggleCelsiusFarenheit() {
  currentTemperatureSystem = currentTemperatureSystem == "°C" ? "°F" : "°C";
  displayWeather();
}
