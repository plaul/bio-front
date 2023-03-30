import {getMovieFromDatabaseId,editDanishPlot} from "../../../apiFacade.js"
import {reportStatus} from "../../../utils.js"

let movieIdInput
export async function initFindEditMovie(match){
  document.querySelector("#btn-getmovie").onclick = getMovie
  document.querySelector("#btn-submit").onclick = saveChanges
  if(match?.params?.id){
    const id = match?.params?.id
    getMovieFromId(id)
  }
  movieIdInput = document.querySelector("#input-movieid")
  document.getElementById("btn-submit").onclick = saveChanges
}

async function getMovie(){
  const id = movieIdInput.value
  getMovieFromId(id)
}

async function getMovieFromId(id){
  try{
    reportStatus("",false)
    const movie = await getMovieFromDatabaseId(id)
    document.getElementById("plotdk-id").value = ""
    document.getElementById("plotdk-id").value = movie.plotDK.trimStart()
    console.log(movie.plotDK.trimStart())
    reportStatus(JSON.stringify(movie,null,2),false)
    //document.getElementById("remaing-properties").innerText = JSON.stringify(movie,null,2)

  } catch(err){
     reportStatus(err.message,true)
  }
}
async function saveChanges(){
  const id = movieIdInput.value
  try{
     let plotDk= document.getElementById("plotdk-id").value   
     plotDk = plotDk.replace(/"/g, "");  //REPLACE ALL DOUBLE QUOTES WITH NOTHING ?????????
     await editDanishPlot(plotDk,id)
     reportStatus("Plot updated",false)
  } catch(err){
    reportStatus(err.message,true)
  }
}