class DomUpdates {
  constructor(travelersRepo, tripsRepo, destinationsRepo, todaysDate) {
    this.todaysDate = todaysDate;
    this.travelersRepo = travelersRepo;
    this.tripsRepo = tripsRepo;
    this.destinationsRepo = destinationsRepo;
    // this.currentUser = null;
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
  }

  createAgencyDisplays(agency) {
    const agencyPage = document.querySelector('.agency-page')
    agencyPage.insertAdjacentHTML('beforeend', `
    <section class="pending-trips-display"></section>
    <section class="total-revenue-display"></section>
    <section class="current-travelers-display"></section>
    `)
    this.displayPendingTrips(agency)
  }

  displayPendingTrips(agency) {
    const pendingTripsDisplay = document.querySelector('.pending-trips-display')
    const pendingTrips = agency.getPendingTrips()
    pendingTrips.forEach(trip => {
      console.log(trip);
      pendingTripsDisplay.insertAdjacentHTML('beforeend', `
        <section class="pending-trip">
          <p class="pending-trips">Date:${trip.date}</p>
          <p class="pending-trips">Name:${trip.travelerName}</p>
          <p class="pending-trips">Trip ID:${trip.id}</p>
        </section>
      `)
    })
  }
}
module.exports = DomUpdates
