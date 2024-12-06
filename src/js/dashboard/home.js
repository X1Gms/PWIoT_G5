/* Code to fetch temperature */
//#region Temperatures

// const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal
const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=precipitation,rain,snowfall,cloud_cover,wind_speed_10m,temperature_2m";

getWeather(api_url).then((data) => {
  const status = filterConditions(data);
  const temperature = formatTemperature(data["temperature"].toString());
  const el = document.getElementById("myTemperature");
  el.innerHTML = temperature.toString() + "ºC";
  document
    .querySelector("div.weather-status_image > img")
    .setAttribute("src", `/public/imgs/weather/${status}.png`);
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

function filterConditions(weather) {
  if (weather.snowfall > 0) return "snow";
  if (weather.rain > 0 || weather.precipitation > 0) return "rain";
  if (weather.wind_speed > 20) return "windy_cloud";
  if (weather.cloud_cover > 50) return "clouds";
  return "sunny";
}

function formatTemperature(temperature) {
  if (!temperature.includes(".")) return temperature;
  return temperature.split(".")[0];
}

//#endregion

//#region Recomendations
myclothes((clothes) => {
  // console.log(clothes);
  Clothes(clothes);
});
activaRequest((event) => {
  console.log(event);
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

function myclothes(callback) {
  fetch("http://127.0.0.1/recommendation.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: 1, // some user info to select on db :)
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed getting clothes");
      // console.log(response);
      return response.json();
    })
    .then((data) => callback(data))
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

function Clothes(CEvent, ClothesArray) {
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
