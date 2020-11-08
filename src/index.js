import css from './css/style.css';
import fetchCountries from './js/fetchCountries.js';
import refs from './js/countryRefs.js';
import debounce from 'lodash.debounce';
import countryItem from './templates/countryItem.hbs';
import countryList from './templates/countryList.hbs';
import {error} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import {attention} from './js/errors.js'

refs.input.addEventListener("input", debounce((event)=>{
  refs.ul.innerHTML = "";
  let query = event.target.value;
  fetchCountries(query).then(data => {
    if (data.length>=2 && data.length<=10) {
      insertElement(countryList, data, refs.ul);
    } else if (data.length === 1) {
      insertElement(countryItem, data, refs.ul);
    } else {
      error(attention);
    }
    refs.input.value = ""
  });
}, 1000));

function insertElement(template, data, place) {
  const elem = template(data);
  place.insertAdjacentHTML("beforeend", elem);
}