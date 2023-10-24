import * as moduloA from './modulo1'
import {showCountriesDefault} from "./modulo1";

const countries = ['España', 'Francia', 'Alemania', 'Holanda', 'Bélgica'];

document.ready = function (){
    showCountriesDefault(countries);
}