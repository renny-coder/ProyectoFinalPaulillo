const container = document.getElementById("container");
const searchForm = document.getElementById("search__submit");
const searchInput = document.getElementById("search__input");
const temperatureDegrees = document.getElementById("degreeNumber");
const weatherIcon = document.getElementById("weatherIcon");
const temperatureDescription = document.getElementById("description");
const timezone = document.getElementById("timezone");
const date = document.getElementById("date");
const min = document.getElementById("min");
const max = document.getElementById("max");

let dateSpanish = "";

const displayBackgroundImage = (weatherData) => {
  dateSpanish = new Date(weatherData.list[4].dt * 1000).toLocaleString("es-ES", {
    timeStyle: "short",
    dateStyle: "long",
  });

  date.textContent = `Actualización ${dateSpanish}`;

  const dayHour = new Date(weatherData.list[4].dt * 1000).getHours();

  if (dayHour > 6 && dayHour < 18) {
    container.classList.remove("night");
    container.classList.add("day");
  } else {
    container.classList.remove("day");
    container.classList.add("night");
  }
};

const displayData = (weatherData) => {
  
};

const getWeatherData = async (city) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "720de12586msh83f5bc803e5f381p135df5jsn27f4031ab3ec",
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://open-weather13.p.rapidapi.com/city/${city}`,
      options
    );
    const weatherData = await response.json();

    if (weatherData.list && weatherData.list.length >= 5) {
      displayBackgroundImage(weatherData);
      displayData(weatherData);
    } else {
      console.error(
        `Error al obtener los datos del clima: los datos no son válidos.`
      );
    }
  } catch (error) {
    console.error(`Error al obtener los datos del clima: ${error}`);
  }
};

window.onload = () => {
  getWeatherData(`Buenos Aires`);
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData(searchInput.value);
});
