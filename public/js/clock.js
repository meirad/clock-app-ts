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
        // Apply transformations
        secondHand.style.transform = `rotate(${secondDegree}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${hourDegree}deg)`;
        // Format time for display
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
    console.log('Function from clock.ts');
}
clock();
/* clock(); */
/*

function createMiniClock(): HTMLParagraphElement {
    const miniclock = document.createElement('p');
    miniclock.textContent = `}`;
    miniclock.className = 'li-time';
    return miniclock;
}

function createLocationElement(location: string): HTMLParagraphElement {
    const inputs = document.createElement('p');
    inputs.className = 'li-location';
    inputs.textContent = location;
    return inputs;
}

function createDeleteButton(location: string, li: HTMLLIElement, ul: HTMLUListElement): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.className = 'btn';

    btn.addEventListener('click', () => {
        const locations = JSON.parse(localStorage.getItem('locations') || '[]');
        const index = locations.indexOf(location);

        if (index !== -1) {
            locations.splice(index, 1);
            localStorage.setItem('locations', JSON.stringify(locations));
        }

        ul.removeChild(li);
    });

    return btn;
}


const locationInput = document.getElementById('add-location') as HTMLInputElement | null;
const addLocationButton = document.getElementById('add') as HTMLInputElement | null;

if (addLocationButton) {
    addLocationButton.addEventListener('click', async () => {

        const location = locationInput?.value?.trim();

        if (location) {
            try {
                const locations = JSON.parse(localStorage.getItem('locations') || '[]');
                locations.push(location);
                localStorage.setItem('locations', JSON.stringify(locations));

                const ul = document.querySelector('.other-location') as HTMLUListElement;

                if (ul) {
                    const li = document.createElement('li');
                    li.className = 'list-group';

                    const miniclock = createMiniClock();
                    const inputs = createLocationElement(location);
                    const btn = createDeleteButton(location, li, ul);

                    li.appendChild(miniclock);
                    li.appendChild(inputs);
                    li.appendChild(btn);
                    ul.appendChild(li);
                }
            } catch (error) {
                console.log('Invalid location');
            }
        }
    });
}
function moment() {
throw new Error("Function not implemented.");
}
*/
//# sourceMappingURL=clock.js.map