class DestinationsRepo {
  constructor(destinationsData) {
    this.availableDestinations = destinationsData
  }

  getDesiredDestination(destinationID) {
    return this.availableDestinations.find(destination => destination.id === destinationID)
  }

  getLodgingCost(destination, numberOfDays) {
    return destination.estimatedLodgingCostPerDay * numberOfDays
  }

  getFlightCost(destination, numberOfTravelers) {
    return destination.estimatedFlightCostPerPerson * numberOfTravelers
  }

}

module.exports = DestinationsRepo
