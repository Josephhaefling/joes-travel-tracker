class TravelersRepo {
  constructor(travelersData) {
    this.allTravelers = travelersData;
  }

  getUserById(userID) {
    return this.allTravelers.find(traveler => traveler.id === userID)
  }
}

module.exports = TravelersRepo
