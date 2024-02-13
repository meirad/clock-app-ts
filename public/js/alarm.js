"use strict";
const alarmBtn = document.getElementById('set-alarm');
let audio = new Audio('./Alarm-Fast-High-Pitch-A3-Ring-Tone-www.fesliyanstudios.com.mp3');
let alarmScreen = document.createElement('div');
//display the clock and check if the time is equal to the alarm time---------------------
function displayClock() {
    const clock = document.getElementById('alarm-clock');
    setInterval(() => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        clock.textContent = time;
        localStorage.setItem('time', time);
        let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        for (const alarm of alarms) {
            if (alarm.time === time) {
                playAlarm();
            }
        }
    }, 1000);
}
//function to play the alarm sound---------------------------------
function playAlarm() {
    if (audio) {
        audio.play();
    }
}
displayClock();
//function to remove the ringing alarm from the local storage and the page --------------------------
function removeRingingAlarm() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
    const index = alarms.findIndex((alarm) => alarm.time === time);
    const alarm = alarms.find((alarm) => alarm.time === time);
    if (index !== -1) {
        const alarm = alarms.splice(index, 1)[0];
        localStorage.setItem('alarms', JSON.stringify(alarms));
        const alarmList = document.getElementById('alarm-list');
        const alarmLi = document.getElementById(alarm.id);
        if (alarmLi) {
            alarmList.removeChild(alarmLi);
        }
    }
}
const snoozeAlarmBtn = document.getElementById('snooze-alarm');
const stopAlarmBtn = document.getElementById('stop-alarm');
//function to handle the snooze and stop buttons--------------------------------
document.addEventListener('DOMContentLoaded', () => {
    function handleSnooze() {
        if (audio) {
            audio.pause();
        }
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        const index = alarms.findIndex((alarm) => alarm.time === time);
        if (index !== -1) {
            let alarm = alarms.splice(index, 1)[0];
            let alarmTime = new Date(`1970-01-01T${alarm.time}`);
            alarmTime.setMinutes(alarmTime.getMinutes() + 5);
            alarm.time = alarmTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            alarms.push(alarm);
            localStorage.setItem('alarms', JSON.stringify(alarms));
            // Update the alarmLi element
            const alarmLi = document.querySelector('#alarmLi');
            if (alarmLi) {
                alarmLi.innerHTML = `Alarm set for ${alarm.time}`;
            }
        }
    }
    function handleStop() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        else {
            console.error('Audio not found');
        }
        removeRingingAlarm();
    }
    if (!snoozeAlarmBtn || !stopAlarmBtn) {
        console.error('Buttons not found');
        return;
    }
    snoozeAlarmBtn.addEventListener('click', handleSnooze);
    stopAlarmBtn.addEventListener('click', handleStop);
});
// Function to display the alarms on the screen--------------------------------
function displayAlarm() {
    const alarmTime = document.getElementById('alarm-time');
    const alarmList = document.getElementById('alarm-list');
    const alarmLi = document.createElement('li');
    alarmLi.className = 'list-group';
    const alarmTimeValue = alarmTime.value;
    const alarmId = 'alarm' + new Date().getTime();
    alarmLi.id = alarmId;
    alarmLi.innerHTML = `Alarm set for:  ${alarmTimeValue}`;
    alarmList.appendChild(alarmLi);
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn';
    deleteBtn.textContent = 'X';
    alarmLi.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        alarmList.removeChild(alarmLi);
        let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
        let index = alarms.findIndex((alarmItem) => alarmItem.id === alarmId);
        if (index !== -1) {
            alarms.splice(index, 1);
            localStorage.setItem('alarms', JSON.stringify(alarms));
        }
    });
    let alarms = JSON.parse(localStorage.getItem('alarms') || '[]');
    let alarmWithButtonState = {
        id: alarmId,
        time: alarmTimeValue,
        buttonState: deleteBtn.textContent
    };
    alarms.push(alarmWithButtonState);
    localStorage.setItem('alarms', JSON.stringify(alarms));
}
// Function to display the alarms after the page is loaded--------------------------------
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
function handleSnooze(ev) {
    throw new Error("Function not implemented.");
}
function handleStop(ev) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=alarm.js.map