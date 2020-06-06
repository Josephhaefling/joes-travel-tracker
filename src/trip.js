class Trip {
  constructor(tripInfo, lodgingCost, flightCost) {
    this.id = tripInfo.id
    this.userID = tripInfo.userID
    this.destinationID = tripInfo.destinationID,
    this.travelers = tripInfo.travlers,
    this.date = tripInfo.date,
    this.duration = tripInfo.duration,
    this.lodgingCost = lodgingCost
    this.flightCost = flightCost
    this.status = tripInfo.status,
    this.suggestedActivities = tripInfo.suggestedActivities
  }

  getTripCost() {

  }
}


module.exports = Trip
