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
      this.currentUser = currentUser
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
    this.getCompleteTrip(currentUser, userTrips)
    return userTrips
  }

  getCompleteTrip(currentUser, trips) {
    if (currentUser.userTrips) {
      trips.forEach(trip => {
        const formattedTripDate = trip.date.split("/").join("-")
        const formattedTodaysDate = this.todaysDate.split("/").join("-")
        const tripDate = moment(formattedTripDate)
        const todaysDate = moment(formattedTodaysDate)
        const completeTrip = currentUser.getTripByID(trip.id)
        const comparedDate = todaysDate.diff(tripDate)
        this.determineWhenIsTrip(completeTrip, comparedDate)
      })
    }
  }

  determineWhenIsTrip(completeTrip, comparedDate) {
    if (completeTrip.status === 'pending') {
      this.displayCompleteTripInfo(completeTrip, 'pending')
    } else if (comparedDate < 0) {
      this.displayCompleteTripInfo(completeTrip, 'future')
    } else if (comparedDate > 0) {
      this.displayCompleteTripInfo(completeTrip, 'past')
    } else {
      this.displayCompleteTripInfo(completeTrip, 'current')
    }
  }

  displayCompleteTripInfo(trip, pastOrFuture) {
    const typeOfTrip = document.querySelector(`.${pastOrFuture}-trips`)
    typeOfTrip.insertAdjacentHTML('beforeend', `
    <section class="users-trips js-${trip.id}">
    <image class="destination-image" src="${trip.image}" alt="${trip.alt}">
      <p class="user-info">${trip.destinationName}</p>
      <p class="user-info">${trip.date}</p>
    </section>
    `)
  }

  displayTripsToDOM(pastTrips, presentTrips, futureTrips, pendingTrips) {
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend', `
    <section class="all-trips">
      <section class="past-trips">
        <p>You have ${pastTrips.length} past trips.</p>
      </section>
      <section class="present-trips">
        <p>You have ${presentTrips.length} current trips.</p>
      </section>
      <section class="future-trips">
        <p>You have ${futureTrips.length} future trips.</p>
      </section>
      <section class="pending-trips">
        <p class="pending-trips-text "id="${pendingTrips.length}">
          You have ${pendingTrips.length} pending trips.
        </p>
      </section>
    </section>
    `)
  }

  displayTotalSpent(currentUser) {
    const totalSpent = currentUser.getTotalCostOfAllTrips()
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend', `
    <section class="total-spent">
      <p class="total">Tou have spent $${totalSpent} with us.</p>
    <section>
    `)
    this.currentUser = currentUser
    this.displayTripRequestForm()
  }

  displayTripRequestForm() {
    const travelerPage = document.querySelector('.traveler-page')
    travelerPage.insertAdjacentHTML('beforeend', `
    <section class="trip-request-form">
    <h2>Request a New Trip</h2>
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

  createAgencyDisplays() {
    const agencyPage = document.querySelector('.agency-page')
    agencyPage.insertAdjacentHTML('beforeend', `
    <section class="user-search">
    <input type="text" class="user-name-input" value="Sibby Dawidowitsch">
    <button type="button" class="search-user-button">Search User</button>
    </section>
    <section class="pending-trips-display"></section>
    <section class="total-revenue-display"></section>
    <section class="current-travelers-display"></section>
    `)
    this.displayPendingTrips()
    this.displayRevenue()
  }

  displayPendingTrips() {
    const pendingTripsDisplay = document.querySelector('.pending-trips-display')
    const pendingTrips = this.currentUser.getPendingTrips()
    pendingTrips.forEach(trip => {
      pendingTripsDisplay.insertAdjacentHTML('beforeend', `
        <section class="pending-trip" id="js-${trip.id}">
          <p class="pending-trips" id="${trip.id}" >Name:${trip.travelerName}</p>
          <p class="user-info" >${trip.destinationName}</p>
          <p class="pending-trips" >Date:${trip.date}</p>
          <p class="user-info" >${trip.duration}</p>
          <p class="user-info" >${trip.status}</p>
          <p class="user-info" >${trip.travelers}</p>
          <button type="button" class="view-trip" id="${trip.id}">View Trip</button>
        </section>
      `)
    })
  }

  displayRevenue() {
    const totalRevenueDisplay = document.querySelector('.total-revenue-display')
    const totalRevenue = this.currentUser.getYearlyIncome()
    totalRevenueDisplay.insertAdjacentHTML('beforeend', `
    <p>Total Revenue: ${totalRevenue}</p>
    `)
    this.displayCurrentTravelers()
  }

  displayCurrentTravelers() {
    const currentTravelers = document.querySelector('.current-travelers-display')
    const currentTravelersList = this.currentUser.getUsersTravelingList(this.todaysDate)
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

  clearFormData() {
    const requestTrip = document.querySelector('.request-trip-button')
    const confirmTrip = document.querySelector('.confirm-trip-button')
    let nameInput = document.querySelector('.name')
    let numTravelers = document.querySelector('#num-travelers')
    let startDate = document.querySelector('#start-date')
    let endDate = document.querySelector('#end-date')
    let destination = document.querySelector('#destination-selector')
    this.addNewPendingTrip()
    nameInput.value = 'Sibby Dawidowitsch'
    numTravelers.value = '1'
    startDate.value = 'mm/dd/yyyy'
    endDate.value = 'mm/dd/yyyy'
    destination.value = '1'
    requestTrip.classList.remove('hide')
    confirmTrip.classList.add('hide')
  }

  addNewPendingTrip() {
    const pendingTripsText = document.querySelector('.pending-trips-text')
    const newText = parseInt(pendingTripsText.id) + 1
    pendingTripsText.innerText = `You have ${newText} pending trips.`
  }

  displayRequestedTripCost(tripCost) {
    const tripForm = document.querySelector('.trip-form')
    const confirmTripButton = document.querySelector('.confirm-trip-button')
    const requestTripButton = document.querySelector('.request-trip-button')
    confirmTripButton.classList.remove('hide')
    requestTripButton.classList.add('hide')
    tripForm.insertAdjacentHTML('beforeend', `
    <p class="trip-cost">${tripCost}</p>
    `)
  }

  generateCostMetrics(startDate, endDate, numTravelers, fullDestination) {
    const tripStart = moment(startDate)
    const tripEnd = moment(endDate)
    const tripLength = tripEnd.diff(tripStart, 'days')
    const lodgingCost = this.destinationsRepo.getLodgingCost(fullDestination, tripLength)
    const flightCost = this.destinationsRepo.getFlightCost(fullDestination, numTravelers)
    return {tripLength, lodging: lodgingCost, flight: flightCost}
  }

  displayRequestedTrip() {
    const tripID = parseInt(event.target.id)
    const tripClass = `#${event.target.parentElement.id}`
    const requestedTrip = this.tripsRepo.getTripByID(tripID)
    const userName = this.travelersRepo.getUserById(requestedTrip.userID)
    const userRequestingTrip = this.currentUser.getUserByName(userName.name)
    const fullRequestedTrip = userRequestingTrip.getTripByID(tripID)
    const requestedTripInfo = document.querySelector('.requested-trip')
    const agencyPage = document.querySelector('.agency-page')
    const tripToHide = document.querySelector(tripClass)
    tripToHide.classList.add('hide')
    requestedTripInfo.classList.remove('hide')
    agencyPage.classList.add('hide')
    requestedTripInfo.insertAdjacentHTML('beforeend', `
      <section class=trip-info>
      <p>User Name:${fullRequestedTrip.travelerName}</p>
      <p>Trip ID:${fullRequestedTrip.id}</p>
      <p>TripDate:${fullRequestedTrip.date}</p>
      <p>Number of Travelers:${fullRequestedTrip.travelers}</p>
      <button type="button" class="approve-request-button" id=${requestedTrip.id}>Approve Trip</button>
      <button type="button" class="deny-request-button" id="${requestedTrip.id}">Deny Trip</button>
      </section>
     `)
  }

  closeRequestedTripPage() {
    const requestedTrip = document.querySelector('.requested-trip')
    const agencyPage = document.querySelector('.agency-page')
    requestedTrip.classList.add('hide')
    agencyPage.classList.remove('hide')
  }

  displaySearchedUser(requestedUser) {
    const totalSpent = requestedUser.getTotalCostOfAllTrips()
    const agencyPage = document.querySelector('.agency-page')
    const requestedUserPage = document.querySelector('.requested-user-page')
    agencyPage.classList.add('hide')
    requestedUserPage.classList.remove('hide')
    requestedUserPage.insertAdjacentHTML('beforeend', `
      <section class="requested-user-info">
        <button type="button" class="close-button">Close Search</button>
        <p class="user-name">Name: ${requestedUser.name}</p>
        <p class="user-spent">Total Spent: ${totalSpent}</p>
        <section class="users-trips"></section>
      </section>
    `)
  }

  generateUsersTrips(requestedUsersTrips) {
    const usersTrips = document.querySelector('.users-trips')
    requestedUsersTrips.forEach(trip => {
      usersTrips.insertAdjacentHTML('beforeend', `
      <section class="trip js-${trip.id}">
        <img class="destination-image" src="${trip.image}" alt="${trip.alt}>
        <p class="user-info" id="${trip.id}">${trip.destinationName}</p>
        <p class="user-info" id="${trip.id}">${trip.date}</p>
        <p class="user-info" id="${trip.id}">${trip.duration}</p>
        <p class="user-info" id="${trip.id}">${trip.status}</p>
        <p class="user-info" id="${trip.id}">${trip.travelers}</p>
        <button type="button" class="delete-trip" id=${trip.id}>Cancel Trip</button>
      </section>
      `)
    })
  }

  removeRequestedTrip() {
    const tripID = event.target.parentElement
    const tripInfoCard = `.${tripID.classList.value}`
    const tripToHide = document.querySelector(tripInfoCard)
    tripToHide.classList.add('hide')
  }

  hideSearchedUserInfo() {
    const agencyPage = document.querySelector('.agency-page')
    const requestedUserPage = document.querySelector('.requested-user-page')
    agencyPage.classList.remove('hide')
    requestedUserPage.classList.add('hide')
  }

  cancelTrip() {
    const tripID = event.target.id
    const tripToCancel = `.js-${tripID}`
    const tripToRemove = document.querySelector(tripToCancel)
    tripToRemove.style.display = 'none'
  }

  addNewRequestedTrip(requestedTrip) {
    const trip = requestedTrip
    const pendingTrips = document.querySelector('.pending-trips')
    pendingTrips.insertAdjacentHTML('beforeend', `
    <section class="users-trips js-${trip.id}">
    <image class="destination-image" src="${trip.image}" alt="${trip.alt}">
      <p class="user-info">${trip.destinationName}</p>
      <p class="user-info">${trip.date}</p>
    </section>
    `)
  }
}
module.exports = DomUpdates
