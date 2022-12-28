// Key: 21458dcfb4bc4b14b6793403222812

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
//
// const response = fetch(
//   `http://api.weatherapi.com/v1/forecast.json?key=21458dcfb4bc4b14b6793403222812&q=lviv&days=10&aqi=yes&alerts=yes`
// );

// response.then(res => res.json()).then(data => console.log(data));

const form = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();
  const { query, days } = evt.currentTarget.elements;
  // console.log(query.value, days.value);
  if (query.value) {
    weatherApi(query.value, days.value)
      .then(data => createMarkup(data))
      .catch(err => createErrorMassager(err));
  } else {
    createErrorMassager(err);
  }
}

function weatherApi(city, days) {
  const BASE__KEY = 'http://api.weatherapi.com/v1';
  const key = '21458dcfb4bc4b14b6793403222812';
  return fetch(
    `${BASE__KEY}/forecast.json?key=${key}&q=${city}&days=${days}&aqi=yes&alerts=yes`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}
function createMarkup({ location: { name }, forecast: { forecastday: arr } }) {
  const markup = arr.map(
    ({
      date,
      day: {
        maxtemp_c,
        mintemp_c,
        condition: { text, icon },
      },
    }) =>
      ` <div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${name}
           
            </div>
             <div class = 'weather__date'>${date}</div>
          
          </div>
          <div class="weather__icon">
            <img src="${icon}" alt="${text}" />
          </div>
        </div>
        <div class="weather__temp">Temperature: ${mintemp_c} - ${maxtemp_c}</div>
      
          <div class="weather__status">${text}</div>`
  );
  // <div class="weather__feels-like">feels-like: </div>;

  list.innerHTML = markup;
}

function createErrorMassager(err) {
  const markup = `<div>Type error:${err}
  <img src='https://www.webempresa.com/wp-content/uploads/2021/02/error-400-que-es-como-solucionar.png' alt="" width='400px'>
</div>`;

  list.innerHTML = markup;
}
