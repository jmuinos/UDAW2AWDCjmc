import createListHtml from './util-functions'
function showCountriesDefault(list){
    return createListHtml(list);
}
function showCountriesReverse(lista){
    let listaReverse = lista.reverse();
    return createListHtml(listaReverse);
}
function showCountriesAlphabetic(lista){
    let listaSorted = lista.sort();
    return createListHtml(listaSorted);
}

