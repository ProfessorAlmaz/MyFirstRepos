const inputWeather = document.getElementById("inputWeather");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const temperature = document.querySelector(".temperature");
const clouds = document.querySelector(".clouds");
const wind = document.querySelector(".wind");
const icons = document.querySelector(".icons");
const apiKey = "88832530a984eedf4f18e38c8e19ff6c";

// let apiKey = "88832530a984eedf4f18e38c8e19ff6c";

async function getCoordinates(city){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&lang=ru&appid=${apiKey}`);
    let answer = await response.json();
    let lat = answer[0].lat;
    let lon = answer[0].lon;
    return [lat, lon];
}

function kelvinsToCelsius(k){
    return k - 273.15;
}

async function getWeather(city){
    let coordinates = await getCoordinates(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}&lang=ru`);
    const answer = await response.json();
    console.log(answer);
    temperature.textContent = `${Math.round(kelvinsToCelsius(answer.main.temp))} C˚`;
    clouds.textContent = `${answer.weather[0].description} `;
    wind.textContent = `Скорость ветра ${answer.wind.speed} м/с`;
    icons.innerHTML = `<img src="https://openweathermap.org/img/wn/${answer.weather[0]['icon']}@2x.png">`;

}

getWeatherBtn.addEventListener("click", function(){
    let value = inputWeather.value;
    getWeather(value);
});