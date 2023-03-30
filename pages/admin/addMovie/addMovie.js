import {getMovieFromTitle,addMovieFromImdbID} from "../../../apiFacade.js"
import {reportStatus} from "../../../utils.js"

export function initAddMovie() {
  document.getElementById("create-btn").onclick = addMovie
  document.getElementById("findId-btn").onclick = findId
  document.getElementById("clr-btn").onclick = clear
}

function clear(){
  document.getElementById("imdbid").value = ""
  document.getElementById("found-title").innerText = ""
  reportStatus("")
}

async function findId() {
  try {
    reportStatus("")
    document.getElementById("imdbid").value = ""
    document.getElementById("found-title").innerText = ""
    document.getElementById("spinner").style.display = "block"
    const title = document.getElementById("title").value
    const result = await getMovieFromTitle(title)
    document.getElementById("imdbid").value = result.imdbId
    document.getElementById("found-title").innerText = result.title
  } catch (e) {
    reportStatus(e.message,true)
  }
  finally {
    document.getElementById("spinner").style.display = "none"
  }
}



async function addMovie() {
  try {
    reportStatus("")
    document.getElementById("spinner").style.display = "block"
    const id = document.getElementById("imdbid").value
    if(!id){
      reportStatus("ID is missing",true)
      return 
    }
    //
    const movie = await addMovieFromImdbID(id)
    reportStatus(JSON.stringify(movie, null, 2))
    
  } catch (e) {
    reportStatus(e.message,true)
  }
  finally {
    document.getElementById("spinner").style.display = "none"
  }
}