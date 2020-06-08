class TripRepo {
  constructor(tripsData) {
    this.trips = tripsData
  }

  getTripsByUserID(userID) {
    return this.trips.filter(trip => trip.userID === userID)
  }

  getTripsByDate(tripList, searchType, date) {
    const pastTrips = tripList.filter(trip => Date.parse(trip.date) < Date.parse(date))
    const futureTrips = tripList.filter(trip => Date.parse(trip.date) > Date.parse(date))
    const presentTrips = tripList.filter(trip => Date.parse(trip.date) === Date.parse(date))
    return eval(searchType)
  }

  getPendingTrips(tripList) {
    return tripList.filter(trip => trip.status === 'pending')
  }

  getTripByID(tripID) {
    console.log(typeof tripID);
    return this.trips.find(trip => trip.id === tripID)
  }
}

module.exports = TripRepo
