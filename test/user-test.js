import { expect } from 'chai'
import User from '../src/user'
import Trip from '../src/trip'
import DestinationsRepo from '../src/destinations-repo'
import TestData from '../src/test-data'

describe('User', () => {

  let user
  let user1
  let tripsData
  let destination1
  // let destination2
  // let destination3
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
  // let destinations = TestData.sampleDestinations
  let userTrips

  beforeEach(() => {
    tripsData = TestData.sampleTrips
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    destination1 = destinationsRepo.getDesiredDestination(tripsData[2].destinationID)
    // destination2 = destinationsRepo.getDesiredDestination(tripsData[6].destinationID)
    // destination3 = destinationsRepo.getDesiredDestination(tripsData[7].destinationID)
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
    user1 = new User(sampleUsers[2], destinationsRepo, '')
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be able to get the cost of a trip', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(destination, 10, 2)).to.equal(2816)
  })

  it('should return NaN if a destination is not passed', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(10, 2)).to.deep.equal(NaN)
  })

  it('should return the cost of a one day trip if a num of days is not selected', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(destination, '', 2)).to.deep.equal(1826)
  })

  it('should return  if a ', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(destination, 10)).to.deep.equal(1958)
  })

  it('should get the total cost of all of the users trips', () => {
    expect(user.getTotalCostOfAllTrips()).to.equal(21538)
  })

  it('should get the total cost of all of the users trips', () => {
    expect(user1.getTotalCostOfAllTrips()).to.equal(0)
  })

  it('should be able to get pendingTrips', () => {
    expect(user.getPendingTrips()).to.deep.equal([userTrips[0]])
  })

  it('should be able to get pendingTrips', () => {
    expect(user1.getPendingTrips()).to.deep.equal(undefined)
  it('should be able to get a users trip by id', () => {
    expect(user.getTripByID(7)).to.deep.equal(trip2)
  })
})
