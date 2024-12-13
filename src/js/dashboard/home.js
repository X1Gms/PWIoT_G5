/* Code to fetch temperature */
//#region Temperatures

// const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal

const plusCloth = [
  document.getElementById("plus1"),
  document.getElementById("plus2"),
  document.getElementById("plus3"),
  document.getElementById("plus4"),
];
const roupa = [
  document.getElementById("roupa1"),
  document.getElementById("roupa2"),
  document.getElementById("roupa3"),
  document.getElementById("roupa4"),
  document.getElementById("roupa5"),
  document.getElementById("roupa6"),
  document.getElementById("roupa7"),
];

const roupatitle = [
  document.getElementById("roupa1title"),
  document.getElementById("roupa2title"),
  document.getElementById("roupa3title"),
  document.getElementById("roupa4title"),
  document.getElementById("roupa5title"),
  document.getElementById("roupa6title"),
  document.getElementById("roupa7title"),
];

const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=precipitation,rain,snowfall,cloud_cover,wind_speed_10m,temperature_2m,is_day,cloud_cover,relative_humidity_2m,weather_code";
let gtemperature = null;
let myW = null;
let clothes = [];
getWeather(api_url).then((data) => {
  const wstatus = filterConditions(data);
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
  document.getElementsByClassName("recommendations")[1].style.display = "";
  document.getElementsByClassName("recommendations-error")[0].style.display =
    "none";
  resetDisplayClothes();
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
  let accessoryClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "accessory"
  );
  let shoesClothes = clothes_filtered.filter(
    (clothing) => clothing.name_type.toLowerCase() === "shoes"
  );

  let extra = [];
  if (outerwearClothes) {
    outerwearClothes.forEach((element) => {
      extra.push(element);
    });
  }
  if (accessoryClothes) {
    accessoryClothes.forEach((element) => {
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

  recommendations = [[], [], []];
  if (topClothes.length > 0) {
    let x = 0;
    let l = parseInt(topClothes.length);
    while (x < 3 && x < l) {
      recommendations[x].push(
        topClothes.splice([Math.floor(Math.random() * topClothes.length)], 1)[0]
      );
      x++;
    }
  }
  if (bottomClothes > 0) {
    let x = 0;
    let l = parseInt(bottomClothes.length);
    while (x < 3 && x < l) {
      recommendations[x].push(
        bottomClothes.splice(
          [Math.floor(Math.random() * bottomClothes.length)],
          1
        )[0]
      );
      x++;
    }
  }
  if (extra) {
    let x = 0;
    let l = parseInt(extra.length);
    while (x < 2 && x < l) {
      recommendations[2].push(
        extra.splice([Math.floor(Math.random() * extra.length)], 1)[0]
      );
      x++;
    }
  }
  console.log(recommendations);
  console.log("FIM RECO ");
  ValidateR(recommendations);

  // 1st: Top + bottom/outwear/any except top and accessory
  // 2st: Top + other bottom/outwear/any except top and accesory
  // 3st: Top + other bottom/outwear/any + accessory (if available, else make top+any except top+any except top)
});

function ValidateR(myR) {
  let counts = {
    top: 0,
    bottom: 0,
    shoes: 0,
    outerwear: 0,
    accessory: 0,
  };
  if (!(myR[0].length === 0)) {
    for (let k = 0; k < myR[0].length; k++) {
      console.log(myR[0]);
      if (myR[0][k].name_type === "Top") {
        counts.top++;
        roupa[0].setAttribute("src", myR[0][k].clothes_image);
        roupatitle[0].innerHTML = myR[0][k].clothes_name;
      }
      if (myR[0][k].name_type === "Bottom") {
        counts.bottom++;
        roupa[1].setAttribute("src", myR[0][k].clothes_image);
        roupatitle[1].innerHTML = myR[0][k].clothes_name;
      }
    }
  }
  // console.log(counts.top);
  if (!(myR[1].length === 0)) {
    for (let k = 0; k < myR[1].length; k++) {
      if (myR[1][k].name_type === "Top") {
        counts.top++;
        roupa[2].setAttribute("src", myR[1][k].clothes_image);
        roupatitle[2].innerHTML = myR[1][k].clothes_name;
      }
      if (myR[1][k].name_type === "Bottom") {
        counts.bottom++;
        roupa[3].setAttribute("src", myR[1][k].clothes_image);
        roupatitle[3].innerHTML = myR[1][k].clothes_name;
      }
    }

    // myR[1].forEach((el) => {
    //   if (el.name_type === "Top"){
    //     roupa[2].setAttribute("src",myR[1][k].clothes_image)
    //     counts.top = counts.top++;
    //   }
    //   if (el.name_type === "Bottom"){
    //     roupa[3].setAttribute("src",myR[1][k].clothes_image)
    //     counts.top = counts.bottom++
    //   };
    // });
  }
  if (!(myR[2].length === 0)) {
    let yy = [];
    for (let k = 0; k < myR[2].length; k++) {
      if (myR[2][k].name_type === "Top") {
        counts.top++;
        roupa[4].setAttribute("src", myR[2][k].clothes_image);
        roupatitle[4].innerHTML = myR[2][k].clothes_name;
      }
      if (myR[2][k].name_type === "Bottom") {
        counts.bottom++;
      }
      if (myR[2][k].name_type === "Shoes") {
        counts.shoes++;
      }
      if (myR[2][k].name_type === "Outerwear") {
        counts.outerwear++;
      }
      if (myR[2][k].name_type === "Accessory") {
        counts.accessory++;
      }
      if (
        myR[2][k].name_type === "Bottom" ||
        myR[2][k].name_type === "Accessory" ||
        myR[2][k].name_type === "Outerwear" ||
        myR[2][k].name_type === "Shoes"
      ) {
        yy.push(k);
      }
    }
    if (yy.length > 0) {
      roupa[5].setAttribute("src", myR[2][yy[0]].clothes_image);
      roupatitle[5].innerHTML = myR[2][yy[0]].clothes_name;
    }

    if (yy.length > 1) {
      roupa[6].setAttribute("src", myR[2][yy[1]].clothes_image);
      roupatitle[6].innerHTML = myR[2][yy[1]].clothes_name;
    }
  }
  if (!counts.top >= 1 && !counts.bottom >= 1) return ShowError();
  if (counts.bottom < 1) {
    plusCloth[0].style.display = "none";
    plusCloth[1].style.display = "none";
    // roupa[2].style.display = "none";
    roupa[3].style.display = "none";
  }

  if (counts.bottom < 2) {
    roupa[3].style.display = "none";
    plusCloth[1].style.display = "none";
  }

  if (
    !counts.top > 2 &&
    !counts.outerwear > 0 &&
    !counts.bottom > 2 &&
    !counts.shoes > 0 &&
    !counts.accessory > 0
  ) {
    document.getElementById("3rdopt").style.display = "none";
    document.getElementById("hr2").style.display = "none";
    plusCloth[2].style.display = "none";
    plusCloth[3].style.display = "none";
  }
  if (
    counts.top > 2 &&
    !(
      counts.outerwear > 1 ||
      counts.bottom > 2 ||
      counts.shoes > 1 ||
      counts.accessory > 1
    )
  ) {
    plusCloth[3].style.display = "none";
  }
  if (
    counts.top > 2 &&
    !(
      counts.outerwear > 0 ||
      counts.bottom > 2 ||
      counts.shoes > 0 ||
      counts.accessory > 0
    )
  ) {
    plusCloth[2].style.display = "none";
  }
}

function ShowError() {
  document.getElementsByClassName("recommendations")[1].style.display = "none";
  document.getElementsByClassName("recommendations-error")[0].style.display =
    "";
}

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

// Function to get clothes based on user ID.
function getClothes(id) {
  fetch("http://127.0.0.1/recommendation.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      temperature: gtemperature.toString(), // Send the current temperature, gotten by the API
      id: id,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed getting clothes"); // Print error on console if it gets errors.
      // console.log(response);
      return response.json(); // Parse response to Json
    })
    .then((data) => {
      if (!data.success === 1) throw new Error("No clothes");
      clothes = data.content;
      document.querySelectorAll(".event-type")[0].click();
      // Simulate click on "any" to trigger callback function
      // The function activarequest visually filters clothes to display to the user.
    })
    .catch((error) => console.error(error));
}

//#endregion

// Function to filter the array of clothes based on their "Event"
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

function resetDisplayClothes() {
  document.getElementById("1stopt").style.display = "";
  document.getElementById("2ndopt").style.display = "";
  document.getElementById("3rdopt").style.display = "";
  document.getElementById("hr1").style.display = "";
  document.getElementById("hr1").style.display = "";
  for (let v = 0; v < plusCloth.length; v++) plusCloth[v].style.display = "";
  for (let v = 0; v < roupa.length; v++) roupa[v].style.display = "";
  for (let v = 0; v < roupatitle.length; v++) roupatitle[v].style.display = "";
}
