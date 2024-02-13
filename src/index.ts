
 async function getTimezone(lat: number, long: number) {
    const getTz = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=526b7736fbb74741bfc2d510995b2ef2`;
    const response = await fetch(getTz);
    const data = await response.json();

    let timezone = data.results[0].timeZone;
    let city = data.results[0].city;
    let country = data.results[0].country;
    let timezoneDiv: HTMLElement | null = document.getElementById('location');


    if (timezoneDiv) {
        timezoneDiv.innerText = `${city}/${country}`;
    }
   
    return data;
}


 async function getGeo(): Promise<{timezone: any; lat: number; long: number}> {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position: GeolocationPosition) => {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude; 
                    let timezone1 = await getTimezone(lat, long);

                    return resolve({ timezone: timezone1, lat, long });
                },
                (err) => {
                    reject(err);
                }
            );
        } else {
            reject("Geolocation is not supported by this browser."); 
        }
    });
}

getGeo().then((geoData) => {
    console.log(geoData); // Logs the returned data
}).catch((error) => {
    console.error(error); // Logs any error that occurred
});
