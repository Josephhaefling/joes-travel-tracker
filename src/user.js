class User {
  constructor(userInfo) {
    this.id = userInfo.id
    this.name = userInfo.name
    this.travelType = userInfo.travelerType
    this.isOnTrip = false
    this.userTrips = []
  }

  getTotalSpent() {

  }

  filterTrips(searchType, searchValue) {

  }

  requestTrip(date, duration, numberOfTravelers) {

  }
}


module.exports = User
