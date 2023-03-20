"use strict";
function selectTag(tag) {
    let arr = Array.from(document.body.querySelectorAll('div > input')).map(item => item.parentElement).filter(item => item != null);
    arr.forEach((element) => {
        element.hidden = true;
    });
    switch (tag) {
        case 'div':
            arr.filter(item => item.querySelector('input').name == "inner")[0].hidden = false;
            break;
        case 'input':
            arr.filter(item => item.querySelector('input').name == "value")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "type")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "name")[0].hidden = false;
            break;
        case 'form':
            arr.filter(item => item.querySelector('input').name == "method")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "action")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "inner")[0].hidden = false;
            break;
        case 'a':
            arr.filter(item => item.querySelector('input').name == "href")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "target")[0].hidden = false;
            arr.filter(item => item.querySelector('input').name == "inner")[0].hidden = false;
            break;
        case 'h1':
            arr.filter(item => item.querySelector('input').name == "inner")[0].hidden = false;
    }
}
function createE() {
    let inner = document.getElementsByName('inner')[0];
    let arr = Array.from(document.getElementsByTagName('input'))
        .filter(item => { var _a; return !((_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.hidden) && item.name != 'inner'; }) //сначала фильтрация по атрибутам(иннер)
        .map(item => [item.name, item.value]); //мы превращаем к кортежи, название атрибута и значение
    document.body.append(createElementWithArgs(document.getElementById('tagSelect').value, arr, (!inner.hidden) ? inner.value : undefined)); //после сортировки происходит добавление
}
window.onload = () => selectTag('div');
