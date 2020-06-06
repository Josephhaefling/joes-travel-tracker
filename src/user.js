class User {
  constructor(userInfo, destinationsRepository, userTrips) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelType = userInfo.travelerType
    this.isOnTrip = false
    this.userTrips = userTrips
    this.destinationsRepo = destinationsRepository
  }

  getTotalCostOfTrip(destination, numberOfDays, numberOfTravelers) {
    const lodgingCost = this.destinationsRepo.getLodgingCost(destination, numberOfDays)
    const flightCost = this.destinationsRepo.getFlightCost(destination, numberOfTravelers)
    const lodgingPlusFee = lodgingCost * .10 + lodgingCost
    const flightPlusFee = flightCost * .10 + flightCost
    return lodgingPlusFee + flightPlusFee
  }

  getTotalCostOfAllTrips() {
    return this.userTrips.reduce((totalSpent, trip) => {
      const tripCost = trip.getTripCost()
      totalSpent += tripCost
      return totalSpent
    }, 0)
  }

  getPendingTrips() {
  return this.userTrips.filter(userTrip => userTrip.status === 'pending')
  }

  requestTrip(date, duration, numberOfTravelers) {

  }
}


module.exports = User
