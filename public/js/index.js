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
function getTimezone(lat, long) {
    return __awaiter(this, void 0, void 0, function* () {
        const getTz = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=526b7736fbb74741bfc2d510995b2ef2`;
        const response = yield fetch(getTz);
        const data = yield response.json();
        let timezone = data.results[0].timeZone;
        let city = data.results[0].city;
        let country = data.results[0].country;
        let timezoneDiv = document.getElementById('location');
        if (timezoneDiv) {
            timezoneDiv.innerText = `${city}/${country}`;
        }
        console.log(`${timezone}/${country}`);
        console.log(data);
        return data;
    });
}
function getGeo() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => __awaiter(this, void 0, void 0, function* () {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    let timezone1 = yield getTimezone(lat, long);
                    return resolve({ timezone: timezone1, lat, long });
                }), (err) => {
                    reject(err);
                });
            }
            else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    });
}
getGeo().then((geoData) => {
    console.log(geoData); // Logs the returned data
}).catch((error) => {
    console.error(error); // Logs any error that occurred
});
//# sourceMappingURL=index.js.map