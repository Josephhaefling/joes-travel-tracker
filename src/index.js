// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss'
import TravelersRepo from '../src/travelers-repo'
import './images/turing-logo.png'
import './images/planet-earth.jpg'

fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
.then(response => response.json())
.then(data => createTravelersRepo(data.travelers))
.catch(err => console.error(err.message))

const createTravelersRepo = (travelersData) => {
  let travelersRepo = new TravelersRepo(travelersData)
}

console.log('This is the JavaScript entry file - your code begins here.');
