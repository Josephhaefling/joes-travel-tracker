class TripRepo {
  constructor(tripsData) {
    this.trips = tripsData
  }

  getTripsByUserID(userID) {
    return this.trips.filter(trip => trip.userID === userID)
  }
}

module.exports = TripRepo
