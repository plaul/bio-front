//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_editedby_lars.js"  //Will create the global Navigo, with a few changes, object used below

import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import {initAddMovie} from "./pages/admin/addMovie/addMovie.js"
import {initAllMovies} from "./pages/admin/allMovies/allMovies.js"
import {initAddShowing} from "./pages/admin/addShowing/addShowing.js"
import {initHome} from "./pages/home/home.js"
import {initFindEditMovie} from "./pages/admin/findEditMovie/findEditMovie.js"
import {initLogin,logout} from "./pages/loginLogout/login.js"
import {initReserveTickets} from "./pages/customer/reserveTickets/reserveTickets.js"

window.addEventListener("load", async () => {

  const homeTemplate = await loadTemplate("./pages/home/home.html")
  const templateAllMovies = await loadTemplate("./pages/admin/allMovies/allMovies.html")
  const templateFindEditMovie = await loadTemplate("./pages/admin/findEditMovie/findEditMovie.html")
  const templateAddMovie = await loadTemplate("./pages/admin/addMovie/addMovie.html")
  const templateAddShowing = await loadTemplate("./pages/admin/addShowing/addShowing.html")
  const templateNotFound = await loadTemplate("./pages/notfound.html")
  const templateLogin = await loadTemplate("./pages/loginLogout/login.html")
  const templateSignup = await loadTemplate("./pages/signup/signup.html")
  const templateReserve = await loadTemplate("./pages/customer/reserveTickets/reserveTickets.html")
  
  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/": () => {
        renderTemplate(homeTemplate,"content")
        initHome()
      },
      "/all-movies": () => {
        renderTemplate(templateAllMovies, "content")
        initAllMovies()
        
      },
      "/find-edit-movie": (match) => {
        renderTemplate(templateFindEditMovie, "content")
        initFindEditMovie(match)
      },
      "/add-movie": () => {
        renderTemplate(templateAddMovie, "content")
        initAddMovie()
      },
      "/add-showing": () => {
        renderTemplate(templateAddShowing, "content")
        initAddShowing()
      },
      "/reserve-tickets": (match) => {
        renderTemplate(templateReserve, "content")
        initReserveTickets(match)
      },
    //   "/reservations": () => {
    //     renderTemplate(templateReservations, "content")
    //     initListReservationsAll()
    //   },
      "/signup": () => {
        renderTemplate(templateSignup, "content")
        
      },
      "/login": (match) => {
        renderTemplate(templateLogin, "content")
        initLogin(match)
        
      },
      "/logout": (match) => {
        renderTemplate(templateLogin, "content")
        logout()
        
      }
     })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}