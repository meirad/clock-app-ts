"use strict";
function clock() {
    setInterval(() => {
        const date = new Date();
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        const secondHand = document.querySelector('.second-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const hourHand = document.querySelector('.hour-hand');
        const secondDegree = ((seconds / 60) * 360) + 90;
        const minuteDegree = ((minutes / 60) * 360) + 90;
        const hourDegree = ((hours / 12) * 360) + 90;
        secondHand.style.transform = `rotate(${secondDegree}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${hourDegree}deg)`;
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        let time = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        let timeDiv = document.getElementById('time');
        localStorage.setItem('time', time);
        if (timeDiv) {
            timeDiv.innerText = time;
        }
    }, 1000);
}
clock();
//# sourceMappingURL=clock.js.map