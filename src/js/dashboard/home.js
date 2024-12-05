/* Code to fetch temperature */

const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal
getWeather(api_url).then(temperature => {
    const el = document.querySelector("body > div.page > main > section > div > div.weather-info > div > div.weather-status_text > h1");
    el.innerHTML = temperature.toString() + "ºC";
});


function getWeather(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching data.");
            }
            return response.json();
        })
        .then(data => {
            const _temperature = data["current"]["temperature_2m"];
            const temperature = formatTemperature(_temperature.toString());
            return temperature;
        })
        .catch(error => {
            console.error(error);
        });
}

function formatTemperature(temperature) {
    if (!temperature.includes(".")) return temperature;
    return temperature.split(".")[0];
}



