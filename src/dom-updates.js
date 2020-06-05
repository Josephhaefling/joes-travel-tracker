class DomUpdates {
  constructor(travelersRepo, tripsRepo, todaysDate) {
    this.todaysDate = todaysDate;
    this.travelersRepo = travelersRepo;
    this.tripsRepo = tripsRepo;
  }

  displayAppropriateUser(userType, currentUser) {
    const loginForm = document.querySelector('.login-form')
    const userPage = document.querySelector(`.${userType}-page`)
    loginForm.classList.add('hide')
    userPage.classList.remove('hide')
    this.greetUser(userType, currentUser)
  }

  greetUser(userType, currentUser) {
    const userGreeting = document.querySelector(`.${userType}-greeting`)
    const travelerFirstName = currentUser.name.split(' ')[0];
    userGreeting.innerText = `Welcome Back ${travelerFirstName}`
    this.getAllUserTrips(currentUser.id)
  }

  displayLoginError(errorType) {
    let loginInput = document.querySelector(`.${errorType}`)
    loginInput.style.border = '1px solid red'
  }

  getAllUserTrips(userID) {
    const userTrips = this.tripsRepo.getTripsByUserID(userID)
    const pastTrips = this.tripsRepo.getTripsByDate(userTrips, 'pastTrips', this.todaysDate)
    const futureTrips = this.tripsRepo.getTripsByDate(userTrips, 'futureTrips', this.todaysDate)
    const presentTrips = this.tripsRepo.getTripsByDate(userTrips, 'presentTrips', this.todaysDate)
    const pendingTrips = this.tripsRepo.getPendingTrips(userTrips)
    this.displayTripsToDOM(pastTrips, presentTrips, futureTrips, pendingTrips)
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
}
module.exports = DomUpdates
