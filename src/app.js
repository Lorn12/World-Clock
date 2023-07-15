function updateTime(city, timezone) {
  let cityElement = document.getElementById(city);
  let cityDateElement = cityElement.querySelector(".date");
  let cityTimeElement = cityElement.querySelector(".time");
  let cityTime = moment().tz(timezone);

  cityDateElement.innerHTML = cityTime.format("MMMM Do, YYYY");
  cityTimeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
}

function updateWorldTimes() {
  updateTime("los-angeles", "America/Los_Angeles");
  updateTime("paris", "Europe/Paris");
  updateTime("seoul", "Asia/Seoul");
}

updateWorldTimes();
setInterval(updateWorldTimes, 1000);
