class DestinationsRepo {
  constructor(destinationsData) {
    this.availableDestinations = destinationsData
  }

  getDesiredDestination(destinationID) {
    return this.availableDestinations.find(destination => destination.id === destinationID)
  }

  getDestinationByName(destinationName) {
    return this.availableDestinations.find(destination => destination.destination === destinationName)
  }

  getLodgingCost(destination, numDays) {
    const numberOfDays = numDays || 0
    return destination.estimatedLodgingCostPerDay * numberOfDays
  }

  getFlightCost(destination, numTravelers) {
    const numberOfTravelers = numTravelers || 0
    return destination.estimatedFlightCostPerPerson * numberOfTravelers
  }
}

module.exports = DestinationsRepo
