//<!-- Current Time/Location ____________________________________________________________________________________________________________ -->
function updateCurrentTime() {
  let cityElement = document.querySelector(".curr-city");
  let dateElement = document.querySelector(".curr-date");
  let timeElement = document.querySelector(".curr-time");
  let timezone = moment.tz.guess();

  let cityName = timezone.replace("_", "").split("/")[1];

  cityElement.innerHTML = cityName;
  dateElement.innerHTML = moment().tz(timezone).format("MMMM Do, YYYY");
  timeElement.innerHTML = moment()
    .tz(timezone)
    .format("h:mm:ss [<small>]A[</small>]");
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);
//<!-- Select Dropdown____________________________________________________________________________________________________________ -->

let selectCities = document.getElementById("select-city");
let cityIntervals = [];

selectCities.addEventListener("change", changeCities);

function changeCities(e) {
  let cityTimeZone = e.target.value;
  if (cityTimeZone === "reset") {
    location.reload();
  }
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", "").split("/")[1];
  let cityTime = moment.tz(cityTimeZone);
  let citiesElement = document.getElementById("cities");

  let newCity = document.createElement("div");
  newCity.className = "city";
  newCity.innerHTML = `
      <div>
          <h2>${cityName}</h2>
          <div class="date" id="">${cityTime.format("MMMM Do, YYYY")}</div>
      </div>
      <div class="time">${cityTime.format("h:mm:ss [<small>]A[</small>]")}</div>
      <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>
  `;

  newCity.querySelector(".delete-btn").addEventListener("click", function () {
    clearInterval(cityIntervals[newCity.id]);
    newCity.remove();
  });

  citiesElement.appendChild(newCity);
  newCity.style.opacity = "0"; // Ensure it starts as invisible

  // Fade-in animation
  let op = 0; // The initial opacity
  let timer = setInterval(function () {
    if (op > 1) {
      clearInterval(timer);
    }
    newCity.style.opacity = op;
    newCity.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1 || 0.1;
  }, 10);

  // Interval to update the appended city's time every second
  cityIntervals[newCity.id] = setInterval(function () {
    let cityTime = moment().tz(cityTimeZone);
    newCity.querySelector(".date").innerHTML = cityTime.format("MMMM Do, YYYY");
    newCity.querySelector(".time").innerHTML = cityTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }, 1000);
}

//<!-- Cities/Date/Time____________________________________________________________________________________________________________ -->
function updateTime(city, timezone) {
  let cityElement = document.getElementById(city);

  if (cityElement) {
    let cityDateElement = cityElement.querySelector(".date");
    let cityTimeElement = cityElement.querySelector(".time");
    let cityTime = moment().tz(timezone);
    let deleteButton = cityElement.querySelector(".delete-btn");

    // create delete button if it doesn't exist
    if (!deleteButton) {
      deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      deleteButton.addEventListener("click", function () {
        clearInterval(cityIntervals[cityElement.id]);
        cityElement.remove();
      });
      cityElement.appendChild(deleteButton);
    }

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
