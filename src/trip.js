class Trip {
  constructor(tripInfo, lodgingCost, flightCost, travelerName, destination) {
    this.id = tripInfo.id
    this.userID = tripInfo.userID
    this.destinationID = tripInfo.destinationID,
    this.destinationName = destination.destination
    this.travelers = tripInfo.travelers,
    this.date = tripInfo.date,
    this.duration = tripInfo.duration,
    this.lodgingCost = lodgingCost
    this.flightCost = flightCost
    this.status = tripInfo.status,
    this.suggestedActivities = tripInfo.suggestedActivities
    this.travelerName = travelerName
    this.image = destination.image
    this.alt = destination.alt
  }

  getTripCost() {
    const flightPlusFee = this.flightCost * .10 +this.flightCost
    const lodgingPlusFee = this.lodgingCost * .10 +this.lodgingCost
    return lodgingPlusFee + flightPlusFee
  }
}


module.exports = Trip
