const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');


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
