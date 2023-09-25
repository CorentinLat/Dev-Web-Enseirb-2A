'use strict';

const apiKey = 'd367d2b32c6effdcff8407f35c63c1d7';
// const apiKey = '7aa887c381f3021f19462c39c14c98ee';
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=' + apiKey + '&q=';
const iconUrl = 'http://openweathermap.org/img/w/';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

function computeDayFromDatetime(datetime) {
    // Transformation en millisecondes
}

function render(cityName, weatherToShow) {
    // Affichage de la ville

    // Création des blocs pour chaque jour
}

function handleData(data) {
    // Récupération du nom de la ville

    // Parcours des données reçues
}

function searchWeather(event) {
    // Prévention de la soumission du formulaire

    // Récupération du champ city renseigné par l'utilisateur

    // Appel avec Ajax (XMLHttpRequest)

    // Appel avec fetch ES6
}
