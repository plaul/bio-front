import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { isLoggedInAsAdmin } from "../loginLogout/login.js";
const URL = API_URL + "/movieshow";

export function initHome() {
  if (isLoggedInAsAdmin()) {
     return
  }
  document.getElementById("card-container").onclick = handleDayClick
  const days = makeDays();
  const cards = days.map(day => `
  <div class="card" style="width:12%; background-color:black;border-color:orange;border-width: 3px;">
  <div class="card-body text-center">
    <h4 class="card-title">${day.day}</h4>
    <p class="card-subtitle" style="margin-bottom:8px;">${day.dateString}</p>
    <Button id="${day.date}" class="btn btn-primary">Program</Button>
  </div>
</div>
  `).join('');
  document.getElementById('card-container').innerHTML = cards;
}


function handleDayClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const button = event.target;
    const date = event.target.id;
    showShowingsForDay(date)
  }
}

async function showShowingsForDay(date) {

  const showingsForDay = await fetch(`${URL}/${date}`).then(handleHttpErrors)
  const cards = showingsForDay.map(showing => `
  
  <div class="col-md-6" style="margin-bottom:1em;">
  <div class="card" style="background-color: rgb(23, 20, 20);">
  <div class="row no-gutters" style="height:300px;">
    <div class="col-md-4">
      <img src="${showing.posterURL}" class="card-img img-scale" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <div class="row no-gutters">
          <div class="col-md-8">
            <h5 class="card-title">${showing.movieTitle}</h5>
            <h5 class="card-text">${showing.theaterHall} (${showing.date}, ${showing.startTime})</h5>
          </div>
          <div class="col-md-4">
            <a href="#/reserve-tickets?showingId=${showing.id}" class="btn btn-primary btn-sm">Book Tickets</a>
          </div>
        </div>
        <p class="card-text">${showing.plotDK}</p>
      </div>
    </div>
  </div></div>
</div>`).join('')
  document.getElementById('movie-cards-for-day').innerHTML = cards
}



function makeDays() {
  const dateArray = [];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const today = new Date();  // Get today's date

  // Loop through seven days, starting with today
  for (let i = 0; i < 7; i++) {
    // Create a new date object for the current day
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);

    // Get the day, dateString, and date values from the date object
    const dayIndex = date.getDay();
    const day = weekdays[dayIndex];
    const dateString = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date);
    const isoDateString = date.toISOString().substring(0, 10);

    const dateObject = { day, dateString, date: isoDateString };
    dateArray.push(dateObject);
  }
  return dateArray;

}