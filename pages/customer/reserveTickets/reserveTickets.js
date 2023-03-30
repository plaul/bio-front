import {getShowWithSeats,reserveTickets} from "../../../apiFacade.js"
import {isLoggedInAsUserOnly,isLoggedInAsAdmin} from "../../../pages/loginLogout/login.js"

let show
export async function initReserveTickets(match) {
  if(isLoggedInAsAdmin()){
    alert("Admins cannot reserve tickets")
    window.router.navigate("/")
    return
  }
  if(!isLoggedInAsUserOnly()){
    window.router.navigate("/login?info=You must be logged in to reserve tickets")
    return
  }
  const showId = match?.params?.showingId
  show = await getShowWithSeats(showId)
  const date = show.date

  document.getElementById("movie-title").innerText = show.movieTitle
  document.getElementById("date").innerText =show.date
  document.getElementById("hall").innerText = show.theaterHall
  const seats = show.seats
  let currentRow = seats[0].rowNum
  //let s = '<div style="width:300px; height:20px;background-color:darkblue></div>'
 let s = '<div class="row">'
  s = s + "<div class='row-number'>1</div>"

  for (let i = 0; i < seats.length; i++) {
    if (seats[i].rowNum > currentRow) {
      currentRow = seats[i].rowNum
      s = s + "</div></div><div class='row'>"
      s = s + "<div class='row-number'>" + currentRow + "</div>"
    }
    const className = seats[i].isFree ? 'seat free' : 'seat taken'
    s = s + `<div id=${seats[i].seatId} class="${className}"> ${seats[i].seatNum} </div>`
  }
  s += '</div>'
  document.getElementById("seats").innerHTML = s;
  document.getElementById("seats").onclick = checkRequestedSeat
  document.getElementById("reservation-btn").onclick = makeReservation
}

function checkRequestedSeat(evt) {
  if (evt.target.className === "seat free") {
    const selected = show.seats.find(s => s.seatId == evt.target.id)
    evt.target.className = "seat requested"
    return
  }
  if (evt.target.className === "seat requested") {
    const selected = show.seats.find(s => s.seatId == evt.target.id)
    evt.target.className = "seat free"
    return
  }
}

async function makeReservation() {
  try {
    const seatsToReserve = document.querySelectorAll("div[class*='seat requested']")
    if (seatsToReserve.length === 0) {
      return
    }
    let ids = []
    seatsToReserve.forEach(s => ids.push(Number(s.id)))
    
    const requestBody = {
      showId: show.id,
      seats : ids
    }
   
    const status = await reserveTickets(requestBody)

    const modal = new bootstrap.Modal(document.getElementById("reservation-status"))
    document.getElementById("reserved-title").innerText = show.movieTitle
    document.getElementById("reserved-date").innerText = show.date
    document.getElementById("reserved-time").innerText = show.startTime
    document.getElementById("reserved-hall").innerText = show.theaterHall

    let price = 0;
    const tickets = status.seats.map(s => {
      price += s.price
      return `(row-${s.rowNum},seat-${s.seatNum})`
    }).join(",")
    document.getElementById("price").innerText = price
    document.getElementById("reserved-tickets").innerText = tickets
    modal.show()
    window.router.navigate("/")

  } catch (e) {
    alert(e)
  }
}