/* Code to fetch temperature */
//#region Temperatures

const api_url = "https://api.open-meteo.com/v1/forecast?latitude=38.5244&longitude=-8.8882&current=temperature_2m,precipitation" // Setubal
getWeather(api_url).then(temperature => {
    const el = document.getElementById("myTemperature");
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

//#endregion

//#region Recomendations
myclothes((clothes) => {
    console.log(clothes);
});
activaRequest((event) => {
    console.log(event)

});

function activaRequest(callback){
    document.addEventListener('DOMContentLoaded', () => {
        const eventTypes = document.querySelectorAll('.event-type');
        eventTypes.forEach(eventType => {
          eventType.addEventListener('click', () => {
            eventTypes.forEach(et => et.classList.remove('active'));
            eventType.classList.add('active');
            const event = eventType.getElementsByTagName("p")[0].innerHTML;
            callback(event);
          });
        });
      });      
}

function myclothes(callback){
    fetch("http://127.0.0.1/recommendation.php", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: 1 // some user info to select on db :)
        }),
    }).then(response => {
        if(!response.ok) throw new Error("Failed getting clothes");
        // console.log(response);
        return response.json();        
    }).then(data => callback(data))
    .catch(error => console.error(error))
}

//#endregion
