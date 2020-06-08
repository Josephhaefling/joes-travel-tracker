import { expect } from 'chai'
import Agency from '../src/agency'
import User from '../src/user'
import TestData from '../src/test-data'
import Trip from '../src/trip'
import TripRepo from '../src/trip-repo'
import DestinationsRepo from '../src/destinations-repo'

//instantiate users
describe('Agency', () => {
  let sampleUsers
  let destinationsRepo
  let tripRepo
  let destination1
  let destination2
  let destination3
  let destination4
  let destination5
  let destination6
  let lodgingCost1
  let lodgingCost2
  let lodgingCost3
  let lodgingCost4
  let lodgingCost5
  let lodgingCost6
  let flightCost1
  let flightCost2
  let flightCost3
  let flightCost4
  let flightCost5
  let flightCost6
  let trip1
  let trip2
  let trip3
  let trip4
  let trip5
  let trip6
  let user1
  let user2
  let user3
  let agency

  beforeEach(() => {
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    tripRepo = new TripRepo(TestData.sampleDestinations)
    destination1 = destinationsRepo.getDesiredDestination(1)
    destination2 = destinationsRepo.getDesiredDestination(2)
    destination3 = destinationsRepo.getDesiredDestination(3)
    destination4 = destinationsRepo.getDesiredDestination(5)
    destination5 = destinationsRepo.getDesiredDestination(5)
    destination6 = destinationsRepo.getDesiredDestination(3)
    lodgingCost1 = destinationsRepo.getLodgingCost(destination1, TestData.sampleTrips[0].duration)
    lodgingCost2 = destinationsRepo.getLodgingCost(destination2, TestData.sampleTrips[1].duration)
    lodgingCost3 = destinationsRepo.getLodgingCost(destination3, TestData.sampleTrips[2].duration)
    lodgingCost4 = destinationsRepo.getLodgingCost(destination4, TestData.sampleTrips[5].duration)
    lodgingCost5 = destinationsRepo.getLodgingCost(destination5, TestData.sampleTrips[6].duration)
    lodgingCost6 = destinationsRepo.getLodgingCost(destination6, TestData.sampleTrips[7].duration)
    flightCost1 = destinationsRepo.getFlightCost(destination1, TestData.sampleTrips[0].travelers)
    flightCost2 = destinationsRepo.getFlightCost(destination2, TestData.sampleTrips[1].travelers)
    flightCost3 = destinationsRepo.getFlightCost(destination3, TestData.sampleTrips[2].travelers)
    flightCost4 = destinationsRepo.getFlightCost(destination4, TestData.sampleTrips[5].travelers)
    flightCost5 = destinationsRepo.getFlightCost(destination5, TestData.sampleTrips[6].travelers)
    flightCost6 = destinationsRepo.getFlightCost(destination6, TestData.sampleTrips[7].travelers)
    trip1 = new Trip(TestData.sampleTrips[0], lodgingCost1, flightCost1)
    trip2 = new Trip(TestData.sampleTrips[1], lodgingCost2, flightCost2)
    trip3 = new Trip(TestData.sampleTrips[2], lodgingCost3, flightCost3)
    trip4 = new Trip(TestData.sampleTrips[5], lodgingCost4, flightCost4)
    trip5 = new Trip(TestData.sampleTrips[6], lodgingCost5, flightCost5)
    trip6 = new Trip(TestData.sampleTrips[7], lodgingCost6, flightCost6)
    user1 = new User(TestData.sampleUsers[0], destinationsRepo, [trip1, trip4])
    user2 = new User(TestData.sampleUsers[1], destinationsRepo, [trip2])
    user3 = new User(TestData.sampleUsers[2], destinationsRepo, [trip3, trip5, trip6])
    agency = new Agency([user1, user2, user3])
  })

  it('should be a function', () => {
    expect(Agency).to.be.a('function')
  })

  it('should be able to get all requested trips', ()=> {
    expect(agency.getPendingTrips()).to.deep.equal([trip2, trip3])
  })

  it('should be able to get the agencys totoal income for the year', ()=> {
    expect(agency.getYearlyIncome()).to.equal(2844)
  })

  it('should be able to get all of the users currently traveling', () => {
    expect(agency.getUsersTravelingList('2020/05/28')).to.deep.equal([trip5])
  })

  it('should be able to get a user by name', () => {
    expect(agency.getUserByName('Sibby Dawidowitsch')).to.deep.equal(user3)
  })
})
