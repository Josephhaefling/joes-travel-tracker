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

  }

  getUsersTravelingList() {

  }

  getUserByName() {

  }

  deleteTrip() {

  }

  approveTrip() {

  }
}

module.exports = Agency
