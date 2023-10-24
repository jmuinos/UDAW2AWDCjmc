import createListHtml from './util-functions'
export function showCountriesDefault(list){
    return createListHtml(list);
}
export function showCountriesReverse(lista){
    let listaReverse = lista.reverse();
    return createListHtml(listaReverse);
}
export function showCountriesAlphabetic(lista){
    let listaSorted = lista.sort();
    return createListHtml(listaSorted);
}

