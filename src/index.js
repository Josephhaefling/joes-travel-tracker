// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss'
import TravelersRepo from '../src/travelers-repo'
import DestinationsRepo from '../src/travelers-repo'
import TripsRepo from '../src/trip-repo'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import Agency from '../src/agency'
import './images/turing-logo.png'
import './images/planet-earth.jpg'

const todaysDate = '2021/01/01'

const loginButton = document.querySelector('.login-button')
let domUpdates

loginButton.addEventListener('click', () => {
  determineUserType()
})

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations').then(response => response.json())
])
.then(data => createDataSets(data[0], data[1], data[2]))
.catch(err => console.error(err.message))


const createDataSets = (travelersData, tripsData, destinationsData) => {
  const travelersRepo = createTravelersRepo(travelersData.travelers);
  const tripsRepo = createTripsRepo(tripsData.trips);
  const destinationsRepo =  new DestinationsRepo(destinationsData.destinations)
  createDomUpdates(travelersRepo, tripsRepo, destinationsRepo, todaysDate)
}

const createTravelersRepo = (travelersData) => {
  const travelersRepo = new TravelersRepo(travelersData)
  return travelersRepo
}

const createTripsRepo = (tripsData) => {
  const tripsRepo = new TripsRepo(tripsData)
  return tripsRepo
}

const createDomUpdates = (travelersRepo, tripsRepo, destinationsRepo, todaysDate) => {
  domUpdates = new DomUpdates(travelersRepo, tripsRepo, destinationsRepo, todaysDate)
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
  const destinationsRepo = domUpdates.destinationsRepo
  console.log(destinationsRepo);
  const currentUser = new User(travelerInfo, destinationsRepo)
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
