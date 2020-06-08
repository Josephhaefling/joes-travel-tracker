// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss'
import TravelersRepo from '../src/travelers-repo'
import DestinationsRepo from '../src/destinations-repo'
import TripsRepo from '../src/trip-repo'
import Trip from '../src/trip'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import Agency from '../src/agency'
import './images/turing-logo.png'
import './images/planet-earth.jpg'

const moment = require('moment')
const todaysDate = moment().format("YYYY/MM/DD")

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
  const userTrips = createUsersTrips(travelerInfo)
    const currentUser = new User(travelerInfo, destinationsRepo, userTrips)
  domUpdates.displayAppropriateUser('traveler', currentUser, userTrips)
  createRequestTripListener()
}

const createUsersTrips = (travelerInfo) => {
  const destinationsRepo = domUpdates.destinationsRepo
  const trips = domUpdates.getAllUserTrips(travelerInfo)
  return trips.map(trip => {
    const destination = destinationsRepo.getDesiredDestination(trip.destinationID)
    const lodgingCost = destinationsRepo.getLodgingCost(destination, trip.duration)
    const flightCost = destinationsRepo.getFlightCost(destination, trip.travelers)
    const userTrip = new Trip(trip, lodgingCost, flightCost, travelerInfo.name)
    return userTrip
  })
}

const createAgency = () => {
  const usersList = createUsersForAgency();
  if (verifyPassword() === true) {
    const agency = new Agency(usersList)
    domUpdates.displayAppropriateUser('agency', agency)
    createViewTripListener(agency)
  } else {
    domUpdates.displayLoginError('password')
  }
}

const createUsersForAgency = () => {
  const destinationsRepo = domUpdates.destinationsRepo
  const tripsRepo = domUpdates.tripsRepo
  const travelersRepo = domUpdates.travelersRepo
  return travelersRepo.allTravelers.map(traveler => {
    let usersTrips = createUsersTrips(traveler)
    let user = new User(traveler, destinationsRepo, usersTrips)
    return user
  })
}

const verifyPassword = () => {
  const password = document.querySelector('.password')
  if(password) {
  return password.value === 'travel2020' ? true : false;
  }
}

const createRequestTripListener = () => {
  const requestTripButtton = document.querySelector('.request-trip-button')
  requestTripButtton.addEventListener('click', () => {
    getTripInfo()
  })
}

const getTripInfo = () => {
  const tripID = Date.now()
  const formData = domUpdates.getFormData()
  const name = formData.name
  const numTravelers = formData.numTravelers
  const startDate = formData.startDate
  const endDate = formData.endDate
  const destination = formData.destination
  const fullUser = domUpdates.travelersRepo.getUserByName(name)
  const fullDestination = domUpdates.destinationsRepo.getDestinationByName(destination)
  const costMetrics = domUpdates.generateCostMetrics(startDate, endDate, numTravelers, fullDestination)
  const requestedTrip = {
    id: tripID,
    userID: fullUser.id,
    destinationID: fullDestination.id,
    travelers: numTravelers,
    date: startDate,
    duration: costMetrics.tripLength,
    status: "pending",
    suggestedActivities: [],
  }
    getEstimatedCost(requestedTrip, costMetrics, fullUser.name)
}

const getEstimatedCost = (tripInfo, costMetrics, fullUser) => {
  const requestedTrip = new Trip(tripInfo, costMetrics.lodging, costMetrics.flight, fullUser)
  const tripCost = requestedTrip.getTripCost()
  domUpdates.displayRequestedTripCost(tripCost)
  createConfirmTripListener(requestedTrip)
}

const createConfirmTripListener = (requestedTrip) => {
  const confirmTripButton = document.querySelector('.confirm-trip-button')
  confirmTripButton.addEventListener('click', () => {
    postTrip(requestedTrip)
  })
}

const postTrip = (requestedTrip) => {
  const date = moment(requestedTrip.date).format("YYYY/MM/DD").toString();
  const travelers = parseInt(requestedTrip.travelers)
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": requestedTrip.id,
        "userID": requestedTrip.userID,
        "destinationID": requestedTrip.destinationID,
        "travelers": travelers,
        "date": date,
        "duration": requestedTrip.duration,
        "status": requestedTrip.status,
        "suggestedActivities": requestedTrip.suggestedActivities
      })
    }).then(response => console.log(response.json()))
    .catch(err => console.error(err.message))
    // domUpdates.greetUser('traveler', domUpdates.currentUser);
    const updatedUser = domUpdates.travelersRepo.getUserById(requestedTrip.userID)
    createUser(updatedUser)
}

const createViewTripListener = (agency) => {
  const viewTripButtton = document.querySelector('.view-trip')
  viewTripButtton.addEventListener('click', () => {
    domUpdates.displayRequestedTrip(agency)
    createRequestedTripListeners()
  })
}

const createRequestedTripListeners = () => {
  const approveTripButtton = document.querySelector('.approve-request-button')
  const denyTripButtton = document.querySelector('.deny-request-button')
  approveTripButtton.addEventListener('click', () => {
    upDateTripStatus('approved', event.target.id)
  })
  denyTripButtton.addEventListener('click', () => {
    upDateTripStatus('denied', event.target.id)
    deleteTrip(event.target.id)
  })
}

const upDateTripStatus = (newStatus, tripID) => {
  const tripIDNum = parseInt(tripID);
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id":tripIDNum,
        "status": newStatus,
        "suggestedActivities": []
      })
    }).then(response => console.log(response.json()))
    .catch(err => console.error(err.message))
    domUpdates.closeRequestedTripPage(tripID)
}

const deleteTrip = (tripID) => {
  const tripIDNum = parseInt(tripID);
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id":tripIDNum,
      })
    }).then(response => console.log(response.json()))
    .catch(err => console.error(err.message))
}
