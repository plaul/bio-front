import {addShowing} from "../../../apiFacade.js"
import {reportStatus} from "../../../utils.js"

export function initAddShowing(){
  document .getElementById("btn-submit").onclick = saveShowings
}

async function saveShowings(){
  const startDate = document.getElementById('startDate').value;
        const numberOfDays = parseInt(document.getElementById('numberOfDays').value);
        const price = parseFloat(document.getElementById('price').value);
        const firstShow = document.getElementById('firstShow').value;
        const movieID = parseInt(document.getElementById('movieID').value);
        const cinemaHallId = parseInt(document.getElementById('cinemaHallId').value);
        const showsPrDay = parseInt(document.getElementById('showsPrDay').value);

        // Create JSON data object
        const data = {
            startDate,
            numberOfDays,
            price,
            firstShow,
            movieID,
            cinemaHallId,
            showsPrDay
        };

        try{
          document.getElementById("spinner").style.display="block"
          const response = await addShowing(data)
          reportStatus(response.status,false)
        }catch(err){
          reportStatus(err.message,true)
        }
        finally {
          document.getElementById("spinner").style.display="none"
        }

}