function updateCurrentTime() {
  let date = document.querySelector(".curr-date");
  let time = document.querySelector(".curr-time");
  let city = document.querySelector(".curr-city");
  let timezone = moment.tz.guess();

  date.innerHTML = moment().tz(timezone).format("MMMM Do, YYYY");
  time.innerHTML = moment().tz(timezone).format("h:mm:ss [<small>]A[</small>]");

  // if (timezone === city) {
  //   let cityName = timezone.replace("_", "").split("/")[1];
  //   city.innerHTML = ` <h1 class="curr-city">${cityName}</h1>`;
  // }
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
//<!-- Select Dropdown____________________________________________________________________________________________________________ -->

let selectCities = document.getElementById("select-city");

selectCities.addEventListener("change", changeCities);

function changeCities(e) {
  let cityTimeZone = e.target.value;
  //Conditionals
  if (cityTimeZone === "reset") {
    location.reload();
  }
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", "").split("/")[1];
  let cityTime = moment.tz(cityTimeZone);
  //Selector
  let citiesElement = document.getElementById("cities");

  citiesElement.innerHTML = `<div class="city">
  <div>
  <h2>${cityName}</h2>
  <div class="date" id="">${cityTime.format("MMMM Do, YYYY")}</div>
</div>
  <div class="time">${cityTime.format("h:mm:ss [<small>]A[</small>]")}</div>
</div>
`;
}

//<!-- Cities/Date/Time____________________________________________________________________________________________________________ -->
function updateTime(city, timezone) {
  let cityElement = document.getElementById(city);

  if (cityElement) {
    let cityDateElement = cityElement.querySelector(".date");
    let cityTimeElement = cityElement.querySelector(".time");
    let cityTime = moment().tz(timezone);

    cityDateElement.innerHTML = cityTime.format("MMMM Do, YYYY");
    cityTimeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
  }
}

function updateWorldTimes() {
  updateTime("los-angeles", "America/Los_Angeles");
  updateTime("paris", "Europe/Paris");
  updateTime("seoul", "Asia/Seoul");
}

// updateCurrentTime();
updateWorldTimes();
setInterval(updateWorldTimes, 1000);
