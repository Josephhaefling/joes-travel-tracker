class User {
  constructor(userInfo, destinationsRepository) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelType = userInfo.travelerType
    this.isOnTrip = false
    this.userTrips = []
    this.destinationsRepo = destinationsRepository
  }

  getTotalCostOfTrip(destination, numberOfDays, numberOfTravelers) {
    const lodgingCost = this.destinationsRepo.getLodgingCost(destination, numberOfDays)
    const flightCost = this.destinationsRepo.getFlightCost(destination, numberOfTravelers)
    const lodgingPlusFee = lodgingCost * .10 + lodgingCost
    const flightPlusFee = flightCost * .10 + flightCost
    return lodgingPlusFee + flightPlusFee
  }

  filterTrips(searchType, searchValue) {

  }

  requestTrip(date, duration, numberOfTravelers) {

  }
}


module.exports = User
