"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getTimezones() {
    return __awaiter(this, void 0, void 0, function* () {
        const myapi = '/api/timezones';
        const response = yield fetch(myapi);
        const data = yield response.json();
        return data;
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
    function getMyTz(data) {
        let myTz = data;
        let datalist = document.getElementById('location-datalist');
        for (let i = 0; i < myTz.length; i++) {
            let option = document.createElement('option');
            option.value = myTz[i];
            datalist.appendChild(option);
        }
        let addBtn = document.getElementById('add');
        let locationInput = document.getElementById('add-location');
        addBtn.addEventListener('click', () => {
            let selectedOption = locationInput.value;
            console.log(selectedOption);
            if (selectedOption !== '') {
                let ul = document.getElementById('location-list');
                let li = document.createElement('li');
                li.className = 'list-group';
                let id = Date.now().toString();
                li.setAttribute('data-id', id);
                let p = document.createElement('p');
                p.className = 'li-time';
                let location = document.createElement('p');
                location.className = 'li-location';
                location.textContent = selectedOption;
                let delateBtn = document.createElement('button');
                delateBtn.className = 'btn';
                delateBtn.textContent = 'X';
                delateBtn.addEventListener('click', () => {
                    ul.removeChild(li);
                    let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                    let index = listItems.findIndex((item) => item.id === id);
                    if (index !== -1) {
                        listItems.splice(index, 1);
                        localStorage.setItem('listItems', JSON.stringify(listItems));
                    }
                });
                li.appendChild(p);
                li.appendChild(location);
                li.appendChild(delateBtn);
                ul.appendChild(li);
                let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                listItems.push({ id: id, html: li.outerHTML });
                localStorage.setItem('listItems', JSON.stringify(listItems));
                setInterval(() => {
                    p.textContent = createMiniClock({ value: selectedOption });
                }, 1000);
                locationInput.value = '';
            }
        });
        let ul = document.getElementById('location-list');
        let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
        for (let item of listItems) {
            let div = document.createElement('div');
            div.innerHTML = item.html;
            let li = div.firstChild;
            ul.appendChild(li);
        }
        let lis = ul.getElementsByClassName('list-group');
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            let p = li.getElementsByClassName('li-time')[0];
            let selectedOption = li.getElementsByClassName('li-location')[0].textContent;
            let intervalId = setInterval(() => {
                p.textContent = createMiniClock({ value: selectedOption });
            }, 1000);
            let delateBtn = li.getElementsByClassName('btn')[0];
            delateBtn.addEventListener('click', () => {
                ul.removeChild(li);
                let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                let id = li.getAttribute('data-id');
                let index = listItems.findIndex((item) => item.id === id);
                if (index !== -1) {
                    listItems.splice(index, 1);
                    localStorage.setItem('listItems', JSON.stringify(listItems));
                }
            });
        }
    }
    getTimezones().then(getMyTz);
});
function createMiniClock(locationInput) {
    let timeZone = locationInput.value;
    if (timeZone) {
        let times = new Date();
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timeZone
        };
        let formatter = new Intl.DateTimeFormat('en-US', options);
        let formattedTime = formatter.format(times);
        return formattedTime;
    }
    return '';
}
//# sourceMappingURL=miniclock.js.map