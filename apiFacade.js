import { API_URL } from "./settings.js"
const MOVIE_ENDPOINT = `${API_URL}/movie`
const SHOW_ENDPOINT = `${API_URL}/movieshow`
const RESERVATION_ENDPOINT = `${API_URL}/reservations`
import { handleHttpErrors, makeOptions } from "./fetchUtils.js"

const USE_SECURITY = true

export async function getMovieFromTitle(title) {
  const options = makeOptions("GET", null, USE_SECURITY)
  return fetch(`${MOVIE_ENDPOINT}/imdbfromtitle/${title}`, options).then(res => handleHttpErrors(res))
}

export function addMovieFromImdbID(id) {
  return fetch(`${MOVIE_ENDPOINT}/${id}`, makeOptions("POST", null, USE_SECURITY)).then(res => handleHttpErrors(res))
}

export function getMovieFromDatabaseId(id) {
  return fetch(`${MOVIE_ENDPOINT}/${id}`).then(handleHttpErrors)
}

export function editDanishPlot(plotDk, id) {
  const options = makeOptions("PATCH", plotDk, USE_SECURITY)
  return fetch(`${MOVIE_ENDPOINT}/plotdk/${id}`, options).then(handleHttpErrors)
}

export function getAllMovies() {
  const options = makeOptions("GET", null, false)
  return fetch(MOVIE_ENDPOINT, options).then(handleHttpErrors)
}

export function addShowing(data) {
  return fetch(SHOW_ENDPOINT, makeOptions("POST", data, USE_SECURITY)).then(handleHttpErrors)
}

export function getShowWithSeats(showId) {
  return fetch(`${SHOW_ENDPOINT}/movie-with-seats/${showId}`, makeOptions("GET",null ,USE_SECURITY)).then(handleHttpErrors)
}

export function reserveTickets(data) {
  return fetch(RESERVATION_ENDPOINT, makeOptions("POST", data, USE_SECURITY)).then(handleHttpErrors)
}