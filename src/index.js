import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {

  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  const name = input.value.trim();

  if (name) {
    fetchCountries(name)
      .then(data => {

        if (data.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.')}

        if (data.length === 1) {
          countryInfo.innerHTML = `<img src="${data[0].flags.svg}" width = '50'>
           <h1>${data[0].name}</h1> 
           <p><span>Capital:</span> ${data[0].capital}</p>
           <p><span>Population:</span> ${data[0].population}</p>
           <p><span>Languages:</span> ${data[0].languages.map(el => el.name).join(', ')}</p> `;} 
           
           else {
           for (let i = 0; i < data.length; i += 1) {
            countryList.innerHTML += `<li style = "display:flex;align-items:center"><img style = "margin-right:10px"src="${data[i].flags.svg}" width = '30'><h1>${data[i].name}</h1></li>`;
          }
        }
      })
      // .catch((e) => console.log(e))
      .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
  }
}
