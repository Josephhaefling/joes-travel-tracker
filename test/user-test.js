import { expect } from 'chai'
import User from '../src/user'
import Trip from '../src/trip'
import DestinationsRepo from '../src/destinations-repo'
import TestData from '../src/test-data'

describe('User', () => {

  let user
  let tripsData
  let destination1
  let destination2
  let destination3
  let lodgingCost1
  let lodgingCost2
  let lodgingCost3
  let flightCost1
  let flightCost2
  let flightCost3
  let trip1
  let trip2
  let trip3
  let destinationsRepo
  let sampleUsers = TestData.sampleUsers
  let destinations = TestData.sampleDestinations
  let userTrips

  beforeEach(() => {
  tripsData = TestData.sampleTrips
  destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
  destination1 = destinationsRepo.getDesiredDestination(tripsData[2].destinationID)
  destination2 = destinationsRepo.getDesiredDestination(tripsData[6].destinationID)
  destination3 = destinationsRepo.getDesiredDestination(tripsData[7].destinationID)
  lodgingCost1 = destinationsRepo.getLodgingCost(destination1, tripsData[2].duration)
  lodgingCost2 = destinationsRepo.getLodgingCost(destination1, tripsData[6].duration)
  lodgingCost3 = destinationsRepo.getLodgingCost(destination1, tripsData[7].duration)
  flightCost1 = destinationsRepo.getFlightCost(destination1, tripsData[2].travelers)
  flightCost2 = destinationsRepo.getFlightCost(destination1, tripsData[6].travelers)
  flightCost3 = destinationsRepo.getFlightCost(destination1, tripsData[7].travelers)
    trip1 = new Trip(TestData.sampleTrips[2], lodgingCost1, flightCost1)
    trip2 = new Trip(TestData.sampleTrips[6], lodgingCost2, flightCost2)
    trip3 = new Trip(TestData.sampleTrips[7], lodgingCost3, flightCost3)
    userTrips = [trip1, trip2, trip3]
    user = new User(sampleUsers[2], destinationsRepo, userTrips)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be able to get the cost of a trip', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(destination, 10, 2)).to.equal(2816)
  })

  it('should get the total cost of all of the users trips', () => {
    expect(user.getTotalCostOfAllTrips()).to.equal(21538)
  })

})
