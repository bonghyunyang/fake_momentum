const API_KEY = "";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=matric`)
}
    .then(function(response){
      return response.json()
})
    .then(function(json)) {
      console.log(json)
    }

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude)
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
      askForCoords();
  } else {
     const parseCoords = JSON.parse(loadedCoords);
     getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {

}
init();