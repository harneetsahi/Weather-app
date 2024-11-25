const apiKey = "df593b7fb74e80356d67edf1c8c500b6";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const form = document.querySelector("form");
const button = document.querySelector("button");
const locationInput = document.querySelector("input");

const result = document.querySelector(".result");
const locationName = document.querySelector(".location-name");
const temp = document.querySelector(".temp");
const weatherDesc = document.querySelector(".weather-desc");

async function getApi(locationValue) {
  try {
    const response = await fetch(
      `${weatherUrl}${locationValue}&units=metric&appid=${apiKey}`,
      { mode: "cors" }
    );

    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      alert("Location not found");
      return;
    }

    console.log(weatherData);

    result.classList.remove("hidden");
    locationName.innerText = `location: ${weatherData.name}, ${weatherData.sys.country}`;
    temp.innerText = `Temp: ${weatherData.main.temp} C, feels like: ${weatherData.main.feels_like}`;
    weatherDesc.innerText = `${weatherData.weather[0].description}`;

    // reset location input value
    locationInput.value = "";
    
  } catch (error) {
    alert("An error has occured. Please try again");
    console.log(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationValue = locationInput.value;
  

  getApi(locationValue);
});
