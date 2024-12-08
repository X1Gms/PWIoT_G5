/* Code to fetch temperature */
//#region Temperatures

// const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal
const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=precipitation,rain,snowfall,cloud_cover,wind_speed_10m,temperature_2m";
let gtemperature = null;
let myW = null;
getWeather(api_url).then((data) => {
  const wstatus = filterConditions(data);
  myW = serveProperNames(wstatus);
  gtemperature = formatTemperature(data["temperature"].toString());
  gtemperature = Number(gtemperature);
  const temperature = formatTemperature(data["temperature"].toString());
  const el = document.getElementById("myTemperature");
  el.innerHTML = temperature.toString() + "ºC";
  document.getElementById("weather-name").innerHTML =
    serveProperNames(wstatus);
  document
    .getElementById("tempIcon")
    .setAttribute("src", `/public/imgs/weather/${wstatus}.png`);
});

function getWeather(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data.");
      }
      return response.json();
    })
    .then((data) => {
      /*
            Windy,Rainy,Sunny,Cloudy,snowing
            */
      // const _temperature = data["current"]["temperature_2m"];

      return {
        precipitation: data["current"]["precipitation"],
        rain: data["current"]["rain"],
        snowfall: data["current"]["snowfall"],
        cloud_cover: data["current"]["cloud_cover"],
        wind_speed: data["current"]["wind_speed_10m"],
        temperature: data["current"]["temperature_2m"],
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

function formatTemperature(temperature) {
  if (!temperature.includes(".")) return temperature;
  return temperature.split(".")[0];
}

function filterConditions(weather) {
  if (weather.snowfall > 0) return "snow";
  if (weather.rain > 0 || weather.precipitation > 0) return "rain";
  if (weather.wind_speed > 20) return "windy_cloud";
  if (weather.cloud_cover > 50) return "clouds";
  return "sunny";
}



function serveProperNames(weatherName) {
  if (weatherName === "snow") return "Snowy";
  if (weatherName === "rain") return "Rainy";
  if (weatherName === "windy_cloud") return "Windy with Clouds";
  if (weatherName === "clouds") return "Cloudy";
  if (weatherName === "sunny") return "Sunny";
  throw new Error("The Weather Name is not defined!");
}

//#endregion

//#region Recomendations
activaRequest((event) => {



});

function activaRequest(callback) {
  document.addEventListener("DOMContentLoaded", () => {
    const eventTypes = document.querySelectorAll(".event-type");
    eventTypes.forEach((eventType) => {
      eventType.addEventListener("click", () => {
        eventTypes.forEach((et) => et.classList.remove("active"));
        eventType.classList.add("active");
        const event = eventType.getElementsByTagName("p")[0].innerHTML;
        callback(event);
      });
    });
  });
}


function getClothes() {
  fetch("http://127.0.0.1/recommendation.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: gtemperature,
      weather: myW,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed getting clothes");
      // console.log(response);
      return response.json();
    })
    .then((data) => console.log("WORK HERE"))
    .catch((error) => console.error(error));
}

//#endregion

//#region Filtering for clothes

function anyClothes() {
  return;
}

function walkClothes() {
  return;
}
function businessClothes() {
  return;
}
function academicClothes() {
  return;
}

function runningClothes() {
  return;
}

function Clothes(CEvent) {
  switch (CEvent.toString().toLowerCase()) {
    case "any":
      return anyClothes();
    // break;
    case "walk":
      return walkClothes();
    // break;
    case "business":
      return businessClothes();
    // break;
    case "academic":
      return academicClothes();
    // break;
    case "running":
      return runningClothes();
    // break;
  }
}
//#endregion
