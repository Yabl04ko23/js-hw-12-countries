import {error} from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import {badReq} from './errors.js'
import refs from './countryRefs.js';

export default function fetchCountries(searchQuery){
  let url = `https://restcountries.eu/rest/v2/name/${searchQuery}`
  return fetch(url).then((response) => {
    if (response.status > 200) {
      error(badReq);
    } else {
      return response.json();
    }
    refs.input.value = ""
  });
}