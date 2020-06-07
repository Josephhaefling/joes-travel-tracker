class TravelersRepo {
  constructor(travelersData) {
    this.allTravelers = travelersData;
  }

  getUserById(userIDNum) {
    const userID = userIDNum || 0
    return this.allTravelers.find(traveler => traveler.id === userID)
  }

  getUserByName(userName) {
    return this.allTravelers.find(traveler => traveler.name === userName)
  }

}

module.exports = TravelersRepo
