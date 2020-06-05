// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss'
import TravelersRepo from '../src/travelers-repo'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import Agency from '../src/agency'
import './images/turing-logo.png'
import './images/planet-earth.jpg'

const loginButton = document.querySelector('.login-button')
let domUpdates

loginButton.addEventListener('click', () => {
  determineUserType()
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

const determineUserType = () => {
  const userName = document.querySelector('.user-name')
  if (userName) {
    userName.value === 'agency' ? createAgency() : parseUserId(userName)
  } else {
    domUpdates.displayLoginError('user-name')
  }
}

const parseUserId = (userName) => {
  const travelersRepo = domUpdates.travelersRepo
  const lengthOfUserName = userName.value.length
  const userIDToVerify = parseInt(userName.value.slice(8, lengthOfUserName))
  getUserInfo(userIDToVerify, travelersRepo)
}

const getUserInfo = (userIDToVerify, travelersRepo) => {
  const userName = document.querySelector('.user-name')
  const verifiedTraveler = travelersRepo.getUserById(userIDToVerify)
  verifyUserName(verifiedTraveler)
}


const verifyUserName = (verifiedTraveler) => {
  if (verifiedTraveler) {
    verifyPassword() === true ? createUser(verifiedTraveler) : domUpdates.displayLoginError('password')
  } else {
    domUpdates.displayLoginError('user-name')
  }
}

const createUser = (travelerInfo) => {
  const currentUser = new User(travelerInfo)
  domUpdates.displayAppropriateUser('traveler', currentUser)
}

const createAgency = () => {
  if (verifyPassword() === true) {
    const agency = new Agency()
    domUpdates.displayAppropriateUser('agency', agency)
  } else {
    domUpdates.displayLoginError('password')
  }
}

const verifyPassword = () => {
  const password = document.querySelector('.password')
  if(password) {
  return password.value === 'travel2020' ? true : false;
  }
}
