/* Code to fetch temperature */
//#region Temperatures

// const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal
const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=precipitation,rain,snowfall,cloud_cover,wind_speed_10m,temperature_2m,is_day,cloud_cover,relative_humidity_2m,weather_code";
let gtemperature = null;
let myW = null;
let clothes = [];
getWeather(api_url).then((data) => {
  const wstatus = filterConditions(data);
  // console.log(wstatus);
  gtemperature = formatTemperature(data["temperature"].toString());
  gtemperature = Number(gtemperature);
  const temperature = formatTemperature(data["temperature"].toString());
  const el = document.getElementById("myTemperature");
  el.innerHTML = temperature.toString() + "ºC";
  document.getElementById("weather-name").innerHTML = serveProperNames(wstatus);
  document
    .getElementById("tempIcon")
    .setAttribute("src", `/public/imgs/weather/${wstatus}.png`);
  const session = sessionStorage.getItem("session");
  const object = JSON.parse(session);
  getClothes(object.value.id);
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
        is_day: data["current"]["is_day"],
        relative_humidity: data["current"]["relative_humidity_2m"],
        code: data["current"]["code"],
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

// function filterConditions(weather) {
//   if (weather.snowfall > 0) return "snow";
//   if (weather.rain > 0 || weather.precipitation > 0) return "rain";
//   if (weather.wind_speed > 20) return "windy_cloud";
//   if (weather.cloud_cover > 50) return "clouds";
//   return "sunny";
// }

function dbFilter(weather) {
  if (weather.snowfall > 0) return "snow";
  if (weather.rain > 0 || weather.precipitation > 0) return "rain";
  if (weather.wind_speed > 20) return "windy_cloud";
  if (weather.cloud_cover > 50) return "clouds";
  return "sunny";
}

function filterConditions(weather) {
  if (weather.code === 95 || weather.code === 96 || weather.code === 99) {
    if (Boolean(weather.is_day) === 1) return "thunder_day";
    return "thunder_night";
  }
  if (
    (weather.code >= 61 && weather.code <= 67) ||
    (weather.code >= 80 && weather.code <= 82)
  ) {
    return weather.code === 65 || weather.code === 67 || weather.code === 82
      ? "rain_more"
      : "rain";
  }
  if (
    (weather.code >= 71 && weather.code <= 77) ||
    (weather.code >= 85 && weather.code <= 86)
  ) {
    return "snow";
  }
  if (weather.code === 45 || weather.code === 48) {
    return "fog";
  }
  if (weather.code === 51 || weather.code === 53 || weather.code === 55) {
    return "mist";
  }
  if ((weather.code >= 1 && weather.code <= 3) || weather.cloud_cover > 50) {
    if (weather.code === 1 || weather.code === 2) return "partially_sun";
    return "clouds";
  }
  if (
    weather.cloud_cover > 0 &&
    (weather.rain > 0 || weather.precipitation > 0)
  ) {
    return "sun_rain";
  }
  if (weather.wind_speed > 20) {
    return "windy_cloud";
  }
  // return weather.is_day === 1 ? "sunny" : "nighty";
  return "sunny";
}

function serveProperNames(weatherName) {
  // if (weatherName === "snow") return "Snowy";
  // if (weatherName === "rain") return "Rainy";
  // if (weatherName === "windy_cloud") return "Windy with Clouds";
  // if (weatherName === "clouds") return "Cloudy";
  // if (weatherName === "sunny") return "Sunny";
  if (weatherName === "cloud") return "Cloudy";
  if (weatherName === "clouds") return "Very Cloudy";
  if (weatherName === "cloud_night") return "Cloudy";
  if (weatherName === "fog") return "Foggy";
  if (weatherName === "mist") return "Misty";
  if (weatherName === "partially_sun") return "Partially Sunny";
  if (weatherName === "rain") return "Rainy";
  if (weatherName === "rain_more") return "Very Rainy";
  if (weatherName === "snow") return "Snowy";
  if (weatherName === "sunny") return "Sunny";
  if (weatherName === "sun_cloud") return "Sunny with clouds";
  if (weatherName === "sun_rain") return "Sunny with rain";
  if (weatherName === "thunder_day") return "Thundering";
  if (weatherName === "thunder_lightning") return "Thunder with Lighting";
  if (weatherName === "thunder_night") return "Thundering";
  if (weatherName === "windy_cloud") return "Windy with Clouds";
  throw new Error("The Weather Name is not defined!");
}

//#endregion

//#region Recomendations
activaRequest((event) => {
  // Clothes showing goes here
  console.log(event);
  clothes_filtered = ClothesFilter(clothes, event.toLowerCase());

  let topClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "top"
  );
  let bottomClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "bottom"
  );
  let outerwearClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "outerwear"
  );
  let accesoryClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "accessory"
  );
  let shoesClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "shoes"
  );
  let top1 = null;
  let top2 = null;
  let top3 = null;
  let bottom1 = null;
  let bottom2 = null;
  let extra = [];
  let extra1 = null;
  let extra2 = null;

  if (outerwearClothes) {
    outerwearClothes.forEach((element) => {
      extra.push(element);
    });
  }
  if (accesoryClothes) {
    accesoryClothes.forEach((element) => {
      extra.push(element);
    });
  }
  if (shoesClothes) {
    shoesClothes.forEach((element) => {
      extra.push(element);
    });
  }
  if (bottomClothes) {
    bottomClothes.forEach((element) => {
      extra.push(element);
    });
  }

  if (topClothes) {
    top1 = topClothes.splice(
      [Math.floor(Math.random() * topClothes.length)],
      1
    )[0];
    top2 = topClothes.splice(
      [Math.floor(Math.random() * topClothes.length)],
      1
    )[0];
    top3 = topClothes.splice(
      [Math.floor(Math.random() * topClothes.length)],
      1
    )[0];
  }
  if (bottomClothes) {
    bottom1 = bottomClothes.splice(
      [Math.floor(Math.random() * bottomClothes.length)],
      1
    )[0];
    bottom2 = bottomClothes.splice(
      [Math.floor(Math.random() * bottomClothes.length)],
      1
    )[0];
  }
  if (extra) {
    extra1 = extra.splice([Math.floor(Math.random() * extra.length)], 1)[0];
    extra2 = extra.splice([Math.floor(Math.random() * extra.length)], 1)[0];
  }

  if (top1) {
    document.getElementById("roupa1").setAttribute("src", top1.clothes_image);
    document.getElementById("roupa1title").innerHTML = top1.clothes_name;
  } else {
    document.getElementById("roupa1").setAttribute("src", "");
    document.getElementById("roupa1title").innerHTML = ""
  }
  if (top2) {
    document.getElementById("roupa3").setAttribute("src", top2.clothes_image);
    document.getElementById("roupa3title").innerHTML = top2.clothes_name;
  } else {
    document.getElementById("roupa3").setAttribute("src", "");
    document.getElementById("roupa3title").innerHTML = "";
  }
  if (top3) {
    document.getElementById("roupa5").setAttribute("src", top3.clothes_image);
    document.getElementById("roupa5title").innerHTML = top3.clothes_name;
  } else {
    document.getElementById("roupa5").setAttribute("src", "");
    document.getElementById("roupa5title").innerHTML = "";
    document.getElementById("plus3").style.display = 'none'
  }
  if (bottom1) {
    document.getElementById("plus1").style.display = ''
    document.getElementById("roupa2title").innerHTML = bottom1.clothes_name;
    document
      .getElementById("roupa2")
      .setAttribute("src", bottom1.clothes_image);
  } else {
    document.getElementById("plus1").style.display = 'none'
    document.getElementById("roupa2").setAttribute("src", "");
    document.getElementById("roupa2title").innerHTML = "";

  }
  if (bottom2) {
    document.getElementById("plus2").style.display = ''
    document
      .getElementById("roupa4")
      .setAttribute("src", bottom2.clothes_image);
  } else {
    document.getElementById("plus2").style.display = 'none'
    document.getElementById("roupa4").setAttribute("src", "");
    document.getElementById("roupa4title").innerHTML = "";

  }
  if (extra) {
    if (extra1) {
      document.getElementById("roupa6title").innerHTML =
        extra1.clothes_name + " " + extra1.id_usr_clothes;
      document
        .getElementById("roupa6")
        .setAttribute("src", extra1.clothes_image);
    } else {
      document.getElementById("plus3").style.display = 'none'
      document.getElementById("roupa6title").innerHTML = "";
      document.getElementById("roupa6").setAttribute("src", "");
    }
    if (extra2) {
      document.getElementById("plus4").style.display = ''
      document.getElementById("roupa7title").innerHTML =
        extra2.clothes_name + " " + extra2.id_usr_clothes;
      document
        .getElementById("roupa7")
        .setAttribute("src", extra2.clothes_image);
    } else {
      document.getElementById("plus4").style.display = 'none'
      document.getElementById("roupa7title").innerHTML = "";
      document.getElementById("roupa7").setAttribute("src", "");
    }
  } else {
    document.getElementById("plus4").style.display = 'none'
    document.getElementById("roupa7").setAttribute("src", "");
    document.getElementById("roupa7title").innerHTML = "";

    document.getElementById("plus3").style.display = 'none'
    document.getElementById("roupa6").setAttribute("src", "");
    document.getElementById("roupa6title").innerHTML = "";

  }

  if(top3 && extra1 && extra2){
    document.getElementById("plus3").style.display = ''
  }

  // 1st: Top + bottom/outwear/any except top and accesory
  // 2st: Top + other bottom/outwear/any except top and accesory
  // 3st: Top + other bottom/outwear/any + accesory (if available, else make top+any except top+any except top)
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

function getClothes(id) {
  fetch("http://127.0.0.1/recommendation.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: gtemperature.toString(),
      id: id,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed getting clothes");
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      if (!data.success === 1); // No clothes!
      clothes = data.content;
      document.querySelectorAll(".event-type")[0].click();
    })
    .catch((error) => console.error(error));
}

//#endregion

//#region Algorithm To Recommend

function ClothesFilter(clothes, eventFilter) {
  if (eventFilter === "walk")
    return clothes.filter((clothing) => clothing.Event.includes(eventFilter));
  if (eventFilter === "academic")
    return clothes.filter((clothing) => clothing.Event.includes(eventFilter));
  if (eventFilter === "business")
    return clothes.filter((clothing) => clothing.Event.includes(eventFilter));
  if (eventFilter === "running")
    return clothes.filter((clothing) => clothing.Event.includes(eventFilter));
  return clothes;
}

//#endregion
