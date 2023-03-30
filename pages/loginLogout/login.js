import { API_URL } from "../../settings.js"
import {handleHttpErrors} from "../../utils.js"

const URL = API_URL + "/auth/login"

updateUiAccordingToUserStatus()

export function initLogin(match) {
  document.getElementById("login-btn").onclick = login
  document.getElementById("info-txt").innerText = match?.params?.info || ""
}

export function isLoggedIn(){
  return localStorage.getItem("token")
}
export function isLoggedInAsUserOnly(){
  return isLoggedIn() && localStorage.getItem("roles")==="USER"
} 
export function isLoggedInAsAdmin(){
  return isLoggedIn() && localStorage.getItem("roles").includes("ADMIN")
} 

export function logout(){
  localStorage.clear()
  updateUiAccordingToUserStatus()
  window.router.navigate("/")
}

export function updateUiAccordingToUserStatus(){
  const loggedIn = localStorage.getItem("token")
  const isAdmin = loggedIn && localStorage.getItem("roles").includes("ADMIN")
  const isUser = loggedIn && localStorage.getItem("roles").includes("USER")
  document.getElementById("login-id").style.display= loggedIn ? "none" :"block"
  document.getElementById("logout-id").style.display=loggedIn ? "block" :"none"
  document.getElementById("admin-only").style.display=isAdmin ? "block" :"none" 
  document.getElementById("logged-in-user").innerText = loggedIn ? localStorage.getItem("user") : ""
  document.getElementById("logged-in-username").style.display = loggedIn ? "block" : "none"
}

async function login(evt) {
  document.getElementById("error").innerText = ""

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  const userDto = { username, password }
 
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(userDto)
  }

  try {
    const response = await fetch(URL, options).then(res=>handleHttpErrors(res))
    localStorage.setItem("user",response.username)
    localStorage.setItem("token",response.token)
    localStorage.setItem("roles",response.roles)

    updateUiAccordingToUserStatus()

    window.router.navigate("")
  } catch (err) {
    document.getElementById("error").innerText = err.message
  }

}