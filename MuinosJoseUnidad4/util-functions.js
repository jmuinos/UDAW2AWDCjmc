function createListHtml(list){
    let listInnerHTML = "";
    for (let item of list){
        listInnerHTML += '<li class= "mb-1">${item}</li>';
    }
    return listInnerHTML;
}