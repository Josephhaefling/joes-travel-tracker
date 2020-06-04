// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss'
import TravelersRepo from '../src/travelers-repo'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import './images/turing-logo.png'
import './images/planet-earth.jpg'

const loginButton = document.querySelector('.login-button')
let domUpdates

loginButton.addEventListener('click', () => {
  verifyUserInfo()
})

fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
.then(response => response.json())
.then(data => createTravelersRepo(data.travelers))
.catch(err => console.error(err.message))

const createTravelersRepo = (travelersData) => {
  const travelersRepo = new TravelersRepo(travelersData)
  createDomUpdates(travelersRepo)
}

const createDomUpdates = (travelersRepo) => {
  domUpdates = new DomUpdates(travelersRepo)
}

const verifyUserInfo = () => {
  const travelersRepo = domUpdates.travelersRepo
  const userName = document.querySelector('.user-name')
  const lengthOfUserName = userName.value.length
  const userIDToVerify = parseInt(userName.value.slice(8, lengthOfUserName))
  const verifiedTraveler = travelersRepo.getUserById(userIDToVerify)
  createUser(verifiedTraveler)
}

const createUser = (travelerInfo) => {
  const currentUser = new User(travelerInfo)
  console.log(currentUser);
}
