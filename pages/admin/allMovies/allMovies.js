import  {getAllMovies} from "../../../apiFacade.js"
import {sanitizeStringWithTableRows} from "../../../utils.js"

export async function initAllMovies() {
  document.getElementById("tbl-body").onclick = gotoFindEdit
  makeTable()
}

function gotoFindEdit(evt){
  if(!evt.target.id.startsWith("btn-edit-")) return
  const id = evt.target.id.split("-")[2]
  window.router.navigate("/find-edit-movie?id="+id)
}

async function makeTable(){
  try {
    const movies = await getAllMovies()
    const tableRows = movies.map(m=> `
    <tr>
      <td>${m.id}</td>
      <td>${m.Title}</td>
      <td>${m.Runtime}</td>
      <td>${m.Actors}</td>
      <td>${m.imdbRating}</td>
      <td><button id="btn-edit-${m.id}" class="btn btn-outline-secondary btn-sm">edit</button></td>
    </tr>
    `).join("\n")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRows)
  }
  catch (err) {
    console.error(err.message)
  }
}