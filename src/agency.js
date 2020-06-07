class Agency {
  constructor(travelersRepo) {
  this.id = 0
  this.name = 'NightHawk'
  this.requestedTrips = []
  this.travelersRepo = travelersRepo
  }

  getPendingTrips() {
    return this.travelersRepo.reduce((pendingTrips, traveler) => {
      traveler.userTrips.forEach(userTrip => {
        if(userTrip.status === 'pending') {
          pendingTrips.push(userTrip)
        }
      })
      return pendingTrips
    }, [])
  }


  getYearlyIncome() {
    return this.travelersRepo.reduce((totalIncome, traveler) => {
      traveler.userTrips.forEach(trip => {
        const lodgingFee = trip.lodgingCost * .10
        const flightFee = trip.flightCost * .10
        const totalFee = lodgingFee + flightFee
        totalIncome += totalFee
      })
      return totalIncome
    }, 0)
  }

  getUsersTravelingList(todaysDate) {
    return this.travelersRepo.reduce((currentTravelers, traveler) => {
      traveler.userTrips.forEach(trip => {
        if(Date.parse(trip.date) === Date.parse(todaysDate)) {
          currentTravelers.push(trip)
        }
      })
      return currentTravelers
    }, [])
  }

  getUserByName() {

  }

  deleteTrip() {

  }

  approveTrip() {

  }
}

module.exports = Agency
