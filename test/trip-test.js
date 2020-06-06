import { expect } from 'chai'
import Trip from '../src/trip'
import TestData from '../src/test-data'
import TripRepo from '../src/trip-repo'
import DestinationsRepo from '../src/destinations-repo'

describe('Trip', () => {
  let trip
  let tripsData
  let destinationsRepo
  let destination
  let lodgingCost
  let flightCost
  let tripsRepo


  beforeEach(() => {
    tripsData = TestData.sampleTrips
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    tripsRepo = new TripRepo(TestData.sampleDestinations)
    destination = destinationsRepo.getDesiredDestination(tripsData[0].destinationID)
    lodgingCost = destinationsRepo.getLodgingCost(destination, tripsData[0].duration)
    flightCost = destinationsRepo.getFlightCost(destination, tripsData[0].travelers)
    trip = new Trip(tripsData[0], lodgingCost, flightCost)
  })

it('should be a function', () => {
  expect(Trip).to.be.a('function')
  })

  it('should be able to return the total cost of a trip', () => {
    expect(trip.getTripCost()).to.equal(1056)
  })
})
