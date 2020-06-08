const moment = require('moment')

class DomUpdates {
  constructor(travelersRepo, tripsRepo, destinationsRepo, todaysDate) {
    this.todaysDate = todaysDate;
    this.travelersRepo = travelersRepo;
    this.tripsRepo = tripsRepo;
    this.destinationsRepo = destinationsRepo;
    this.currentUser = null
    this.requestedTrips = []
  }

  displayAppropriateUser(userType, currentUser) {
    const loginForm = document.querySelector('.login-form')
    const userPage = document.querySelector(`.${userType}-page`)
    loginForm.classList.add('hide')
    userPage.classList.remove('hide')
    this.greetUser(userType, currentUser)
  }

  greetUser(userType, currentUser) {
    if (userType === 'traveler') {
    this.getAllUserTrips(currentUser)
    this.displayTotalSpent(currentUser)
  } else {
    this.createAgencyDisplays(currentUser)
  }
    const userGreeting = document.querySelector(`.${userType}-greeting`)
    const travelerFirstName = currentUser.name.split(' ')[0];
    userGreeting.innerText = `Welcome Back ${travelerFirstName}`
  }

  displayLoginError(errorType) {
    let loginInput = document.querySelector(`.${errorType}`)
    loginInput.style.border = '1px solid red'
  }

  getAllUserTrips(currentUser) {
    const userTrips = this.tripsRepo.getTripsByUserID(currentUser.id)
    const pastTrips = this.tripsRepo.getTripsByDate(userTrips, 'pastTrips', this.todaysDate)
    const futureTrips = this.tripsRepo.getTripsByDate(userTrips, 'futureTrips', this.todaysDate)
    const presentTrips = this.tripsRepo.getTripsByDate(userTrips, 'presentTrips', this.todaysDate)
    const pendingTrips = this.tripsRepo.getPendingTrips(userTrips)
    this.displayTripsToDOM(pastTrips, presentTrips, futureTrips, pendingTrips)
    return userTrips
  }

  displayTripsToDOM(pastTrips, presentTrips, futureTrips, pendingTrips) {
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend', `
    <section class="all-trips">
      <section class="past-trips">You have ${pastTrips.length} past trips.</section>
      <section class="present-trips">You have ${presentTrips.length} current trips.</section>
      <section class="upcoming-trips">You have ${futureTrips.length} future trips.</section>
      <section class="pending-trips">You have ${pendingTrips.length} pending trips.</section>
    </section>
    `)
  }

  displayTotalSpent(currentUser) {
    const totalSpent = currentUser.getTotalCostOfAllTrips()
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend',`
    <section class="total-spent">
      <p class="total">${totalSpent}</p>
    <section>
    `)
    this.currentUser = currentUser
    this.displayTripRequestForm()
  }

  displayTripRequestForm() {
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend', `
    <section class="trip-request-form">
      <form class="trip-form">
      <p>Your Name:</p>
      <input type="text" class="name" value="Sibby Dawidowitsch">
      <p>Number of Travelers:</p>
      <select id="num-travelers">
      </select>
      <label for="start-date">Trip Start Date</label>
      <input type="date" id="start-date">
      <label for="end-date">Trip End Date</label>
      <input type="date" id="end-date">
      <label for="destination-selector">
      <select id="destination-selector">
        <option>Please Select a Destintion</option>
      </select>
      <button type="button" class="request-trip-button">Request Trip</button>
      <button type="button" class="hide confirm-trip-button">Confirm Trip</button>
      </label>
      </form>
     </section>
    `)
    this.generateNumberOfTravelers()
    this.generateDestinations()
  }

  generateNumberOfTravelers() {
    const numTravelers = document.querySelector('#num-travelers')
    const numberOfTravelers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    numberOfTravelers.forEach(number => {
      numTravelers.insertAdjacentHTML('beforeend', `
      <option>${number}</option>
      `)
    })
  }

  generateDestinations() {
    const destinationSelector = document.querySelector('#destination-selector')
    this.destinationsRepo.availableDestinations.forEach(destination => {
      destinationSelector.insertAdjacentHTML('beforeend', `
      <option>${destination.destination}</option>
      `)
    })
  }

  createAgencyDisplays(agency) {
    const agencyPage = document.querySelector('.agency-page')
    agencyPage.insertAdjacentHTML('beforeend', `
    <section class="pending-trips-display"></section>
    <section class="total-revenue-display"></section>
    <section class="current-travelers-display"></section>
    `)
    this.displayPendingTrips(agency)
    this.displayRevenue(agency)
  }

  displayPendingTrips(agency) {
    const pendingTripsDisplay = document.querySelector('.pending-trips-display')
    const pendingTrips = agency.getPendingTrips()
    pendingTrips.forEach(trip => {
      pendingTripsDisplay.insertAdjacentHTML('beforeend', `
        <section class="pending-trip">
          <p class="pending-trips" id="${trip.id}">Date:${trip.date}</p>
          <p class="pending-trips" id="${trip.id}">Name:${trip.travelerName}</p>
          <p class="pending-trips" id="${trip.id}">Trip ID:${trip.id}</p>
          <button type="button" class="view-trip" id="${trip.id}">View Trip</button>
        </section>
      `)
    })
  }

  displayRevenue(agency) {
    const totalRevenueDisplay = document.querySelector('.total-revenue-display')
    const totalRevenue = agency.getYearlyIncome()
    totalRevenueDisplay.insertAdjacentHTML('beforeend', `
    <p>${totalRevenue}</p>
    `)
    this.displayCurrentTravelers(agency)
  }

  displayCurrentTravelers(agency) {
    const currentTravelers = document.querySelector('.current-travelers-display')
    const currentTravelersList = agency.getUsersTravelingList(this.todaysDate)
    currentTravelersList.forEach(currentTraveler => {
      currentTravelers.insertAdjacentHTML('beforeend', `
      <p class="currently-traveling">${currentTraveler.travelerName}</p>
      `)
    })
  }

  getFormData() {
    const nameInput = document.querySelector('.name')
    const numTravelers = document.querySelector('#num-travelers')
    const startDate = document.querySelector('#start-date')
    const endDate = document.querySelector('#end-date')
    const destination = document.querySelector('#destination-selector')
    return {
      name: nameInput.value,
      numTravelers: numTravelers.value,
      startDate: startDate.value,
      endDate: endDate.value,
      destination: destination.value
    }
  }

  displayRequestedTripCost(tripCost, trip) {
    const tripForm = document.querySelector('.trip-form')
    const confirmTripButton = document.querySelector('.confirm-trip-button')
    const requestTripButton = document.querySelector('.request-trip-button')
    confirmTripButton.classList.remove('hide')
    requestTripButton.classList.add('hide')
    tripForm.insertAdjacentHTML('beforeend', `
    <p class="trip-cost">${tripCost}</p>
    `)
  }

  getFullTripInfo(userName, numTravelers, startDate, endDate, destination) {
    const fullUserInfo = this.travelersRepo.getUserByName(userName)
    const fullDestinationInfo = this.destinationsRepo.getDestinationByName(destination)
    const costMetrics = this.generateCostMetrics(startDate, endDate, numTravelers, fullDestinationInfo)
    return
  }

  generateCostMetrics(startDate, endDate, numTravelers, fullDestination) {
    const tripStart = moment(startDate)
    const tripEnd = moment(endDate)
    const tripLength = tripEnd.diff(tripStart, 'days')
    const lodgingCost = this.destinationsRepo.getLodgingCost(fullDestination, tripLength)
    const flightCost = this.destinationsRepo.getFlightCost(fullDestination, numTravelers)
    return {tripLength: tripLength, lodging: lodgingCost, flight:flightCost}
  }

  displayRequestedTrip(agecny) {
    console.log('agency', agecny);
    const tripID = parseInt(event.target.id)
    const requestedTrip = this.tripsRepo.getTripByID(tripID)
    console.log(requestedTrip);
    const agencyPage = document.querySelector('.agency-page')
    agencyPage.insertAdjacentHTML('beforeend', `
    <section class="requested-trip" id="${event.target.id}">
      <section class=trip-info>
      <p>Trip ID:${requestedTrip.id}</p>
      <p>TripDate:${requestedTrip.date}</p>
      <p>Number of Travelers:${requestedTrip.travelers}</p>
      <button type="button" class="approve-request-button" id=${requestedTrip.id}>Approve Trip</button>
      <button type="button" class="deny-request-button" id="${requestedTrip.id}">Deny Trip</button>
      </section>
    </section>
     `)
  }

  closeRequestedTripPage(requestedTripID) {
    const requestedTrip = document.querySelector('.requested-trip')
    requestedTrip.classList.add('hide')
  }
}
module.exports = DomUpdates
