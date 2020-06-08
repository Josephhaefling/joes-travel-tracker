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

  getLodgingCost(destination, numberOfDays) {
    console.log();
    return destination.estimatedLodgingCostPerDay * numberOfDays
  }

  getFlightCost(destination, numberOfTravelers) {
    return destination.estimatedFlightCostPerPerson * numberOfTravelers
  }

}

module.exports = DestinationsRepo
