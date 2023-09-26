'use strict';

const apiKey = 'd367d2b32c6effdcff8407f35c63c1d7';
// const apiKey = '7aa887c381f3021f19462c39c14c98ee';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=' + apiKey + '&q=';
const iconUrl = 'https://openweathermap.org/img/w/';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

function computeDayFromDatetime(datetime) {
    // Transformation en millisecondes
    datetime *= 1000;
    const day = new Date(datetime);
    return days[day.getDay()];
}

function render(cityName, weatherToShow) {

    // Affichage de la ville
    document.getElementById('city-title').innerHTML = cityName;

    let parentDiv = document.getElementById('render');
    // Reset du contenu
    parentDiv.innerHTML = '';

    // Création des blocs pour chaque jour
    for (let i = 0; i < weatherToShow.length; i++) {
        let currentWeatherData = weatherToShow[i];
        let div = document.createElement('div')
        div.className = 'col-sm';

        let text = document.createElement('h2');
        text.innerHTML = currentWeatherData.date;
        div.appendChild(text);

        let img = document.createElement('img');
        img.src = currentWeatherData.icon;
        div.appendChild(img);

        let temp = document.createElement('p');
        temp.innerHTML = currentWeatherData.temp + '°C';
        div.appendChild(temp);

        let clouds = document.createElement('p');
        clouds.innerHTML = currentWeatherData.clouds + '% (nuages)';
        div.appendChild(clouds);

        parentDiv.appendChild(div);
    }
}

function handleData(data) {
    // Récupération du nom de la ville
    let cityName = data.city.name;

    // Parcours des données reçues
    let weatherData = data.list;
    let weatherToShow = [];
    // for (let i = 0; i < weatherData.length; i++) {
    //     let currentWeatherData = weatherData[i];
    //     // On garde qu'un élément par jour
    //     if (i % 8 === 0) {
    //         weatherToShow.push(
    //             {
    //                 'date': computeDayFromDatetime(currentWeatherData.dt),
    //                 'icon': iconUrl + currentWeatherData.weather[0].icon + '.png',
    //                 'temp': Math.floor(currentWeatherData.main.temp),
    //                 'clouds': currentWeatherData.clouds.all
    //             }
    //         );
    //     }
    // }

    weatherData.forEach((currentWeatherData, index) => {
        if (index % 8 === 0) {
            weatherToShow.push(
                {
                    'date': computeDayFromDatetime(currentWeatherData.dt),
                    'icon': iconUrl + currentWeatherData.weather[0].icon + '.png',
                    'temp': Math.floor(currentWeatherData.main.temp),
                    'clouds': currentWeatherData.clouds.all
                }
            );
        }
    });

    render(cityName, weatherToShow);
}

async function searchWeather(event) {
    // Prévention de la soumission du formulaire
    event.preventDefault();

    // Récupération du champ city renseigné par l'utilisateur
    const city = document.getElementById('city').value;

    let urlToCall = apiUrl + city;

    // Appel avec Ajax (XMLHttpRequest)
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", urlToCall);
    // xhr.onreadystatechange = (e) => {
    //     if (xhr.readyState === 4) {
    //         let data = JSON.parse(xhr.responseText);
    //         handleData(data);
    //     }
    // }
    // xhr.send();

    // Appel avec fetch ES6
    // fetch(urlToCall)
    //     .then((resp) => resp.json())
    //     .then((data) => handleData(data))
    //     .catch((error) => console.error(error));

    // Appel avec Async/Await
    try {
        const response = await fetch(urlToCall);
        const json = await response.json();
        handleData(json);
    } catch (error) {
        console.error(error);
    }
}
