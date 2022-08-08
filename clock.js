const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const city = document.getElementById('city');
const desc = document.getElementById('desc');
const temp = document.getElementById('temp');
const icon = document.getElementById('icon');
const APIkey = '735b1977e63ef5f3fbf0951c72ba9240';
var lat;
var lon;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(dispWeather);
  } else { 
    city.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function dispWeather(position){
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
  .then(response => response.json())
  .then(data => {
    city.innerHTML = data.name;
    let res = parseInt(data.main.temp)/10
    desc.innerHTML = data.weather[0].description;
    temp.innerHTML = res + " °C";
    icon.innerHTML = `<img src = http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png></img>`
  } );

}

function dispDate(){
  a = new Date();
  date = a.toLocaleDateString(undefined, { weekday: 'long' , day: 'numeric', month: 'long', year: 'numeric'});
  document.getElementById('time').innerHTML = date;
}

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}


function dispQuote()
{
  fetch('https://quotable.io/random?tags=time|life&maxLength=140')
       .then(response => response.json())
       .then(data =>{
        quoteText.textContent = data.content;
        quoteAuthor.textContent = `--${data.author}`;
       });
}

setDate();
setInterval(setDate, 1000);

dispDate();
setInterval(dispDate, 3600000);

dispQuote();
setInterval(dispQuote, 60000);

getLocation();
setInterval(getLocation, 360000);
