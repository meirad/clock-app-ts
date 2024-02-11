"use strict";
/* import { log } from "console"; */
const alarmBtn = document.getElementById('set-alarm');
let audio = new Audio('./Alarm-Fast-High-Pitch-A3-Ring-Tone-www.fesliyanstudios.com.mp3');
let alarmScreen = document.createElement('div');
function displayClock() {
    let clock = document.getElementById('alarm-clock');
    setInterval(() => {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        clock.textContent = time;
        localStorage.setItem('time', time);
        let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        for (let alarm of alarms) {
            if (alarm.time === time) {
                audio.play();
                console.log('Alarm');
                snoozeAlarm(time);
            }
        }
    }, 1000);
}
displayClock();
function snoozeAlarm(time) {
    let alarmScreen = document.createElement('div');
    alarmScreen.className = 'alarm-screen';
    alarmScreen.innerHTML = `
        <h1>Alarm for ${time}</h1>
        <div class="alarm-btns">
            <button class="sb" id="stop-alarm">stop</button>
            <button class="sb" id="snooze-alarm">snooze</button>
        </div>
    `;
    document.body.appendChild(alarmScreen);
    const snoozeAlarmBtn = document.getElementById('snooze-alarm');
    const stopAlarmBtn = document.getElementById('stop-alarm');
    snoozeAlarmBtn.addEventListener('click', () => {
        if (audio) {
            audio.pause();
            setTimeout(() => {
                if (audio)
                    audio.play();
            }, 5 * 60 * 1000);
        }
        alarmScreen.style.display = 'none';
        console.log('Snooze');
    });
    stopAlarmBtn.addEventListener('click', () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        alarmScreen.style.display = 'none';
        console.log('Stop');
    });
}
/* function snozeAlarm() {
    let time = new Date();
    time.setMinutes(time.getMinutes() + 5);
    localStorage.setItem('time', time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}));
    console.log('Snoze');
} */
function displayAlarm() {
    const alarmTime = document.getElementById('alarm-time');
    const alarmList = document.getElementById('alarm-list');
    const alarmLi = document.createElement('li');
    alarmLi.className = 'list-group';
    const alarmTimeValue = alarmTime.value;
    alarmLi.innerHTML = `Alarm set for:  ${alarmTimeValue}`;
    alarmList.appendChild(alarmLi);
    let delateBtn = document.createElement('button');
    delateBtn.className = 'btn';
    delateBtn.textContent = 'X';
    alarmLi.appendChild(delateBtn);
    delateBtn.addEventListener('click', () => {
        alarmList.removeChild(alarmLi);
        let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        let index = alarms.indexOf(alarmTimeValue);
        if (index !== -1) {
            alarms.splice(index, 1);
            localStorage.setItem('alarms', JSON.stringify(alarms));
        }
    });
    let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
    let alarmWithButtonState = {
        time: alarmTimeValue,
        buttonState: delateBtn.textContent
    };
    alarms.push(alarmWithButtonState);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    console.log(alarmTimeValue);
}
document.addEventListener('DOMContentLoaded', (event) => {
    const alarmList = document.getElementById('alarm-list');
    let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
    for (let alarm of alarms) {
        const alarmLi = document.createElement('li');
        alarmLi.className = 'list-group';
        alarmLi.innerHTML = `Alarm set for ${alarm.time}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'btn';
        alarmLi.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            alarmList.removeChild(alarmLi);
            let index = alarms.findIndex((alarmItem) => alarmItem.time === alarm.time);
            if (index !== -1) {
                alarms.splice(index, 1);
                localStorage.setItem('alarms', JSON.stringify(alarms));
            }
        });
        alarmList.appendChild(alarmLi);
    }
});
alarmBtn.addEventListener('click', displayAlarm);
console.log('Function from alrem.ts');
//# sourceMappingURL=alarm.js.map