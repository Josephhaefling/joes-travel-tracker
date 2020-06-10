import { expect } from 'chai'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import TripRepo from '../src/trip-repo'
import TravelersRepo from '../src/travelers-repo'
import DestinationsRepo from '../src/destinations-repo'
import TestData from '../src/test-data'

const chai = require('chai')
let spies = require('chai-spies')
chai.use(spies)

describe('DomUpdates', () => {
  const todaysDate = '2021/01/01'
  let domUpdates
  let user
  let tripRepo
  let travelersRepo
  let destinationsRepo
  let Document = {}

  beforeEach(() => {
    global.domUpdates
    global.tripRepo
    global.document = {}
    global.travelerPage
    travelersRepo = new TravelersRepo(TestData.sampleUsers)
    tripRepo = new TripRepo(TestData.sampleTrips)
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    user = new User(TestData.sampleUsers[2], destinationsRepo)
    domUpdates = new DomUpdates(travelersRepo, tripRepo, destinationsRepo, todaysDate)
  })


  it('should be a function', () => {
    expect(DomUpdates).to.be.a('function')
  })

  it('should spy on displayUserPage', () => {
    chai.spy.on(domUpdates, 'displayUserPage', () => {})
    domUpdates.displayUserPage(user)
    expect(domUpdates.displayUserPage).to.have.been.called(1)
    expect(domUpdates.displayUserPage).to.have.been.called.with(user)
  })

  it('should greet the current user', () => {
    chai.spy.on(domUpdates, 'greetUser', () => {})
    domUpdates.greetUser(user)
    expect(domUpdates.greetUser).to.have.been.called(1)
    expect(domUpdates.greetUser).to.have.been.called.with(user)
  })

  it('should display an error message if there is no user name', () => {
    chai.spy.on(domUpdates, 'displayLoginError', () => {})
    domUpdates.displayLoginError()
    expect(domUpdates.displayLoginError).to.have.been.called(1)
  })

  it('should be run getTripsByUserID once', () => {
    chai.spy.on(domUpdates, 'displayTripsToDOM', () => {})
    chai.spy.on(tripRepo, ['getTripsByUserID', 'getTripsByDate', 'getPendingTrips'], () => {})
    domUpdates.getAllUserTrips(user.id)
    expect(tripRepo.getTripsByUserID).to.have.been.called(1)
  })

  it('should be run getTripsByDate three times', () => {
    chai.spy.on(domUpdates, 'displayTripsToDOM', () => {})
    chai.spy.on(tripRepo, ['getTripsByUserID', 'getTripsByDate', 'getPendingTrips'], () => {})
    domUpdates.getAllUserTrips(user.id)
    expect(tripRepo.getTripsByDate).to.have.been.called(3)
  })

  it('should be run displayTripsToDOM once', () => {
    chai.spy.on(domUpdates, 'displayTripsToDOM', () => {})
    chai.spy.on(tripRepo, ['getTripsByUserID', 'getTripsByDate', 'getPendingTrips'], () => {})
    domUpdates.getAllUserTrips(user.id)
    expect(domUpdates.displayTripsToDOM).to.have.been.called(1)
  })

  it('should be run displayTripsToDOM once', () => {
    chai.spy.on(domUpdates, 'displayTripsToDOM', () => {})
    chai.spy.on(tripRepo, ['getTripsByUserID', 'getTripsByDate', 'getPendingTrips'], () => {})
    domUpdates.getAllUserTrips(user.id)
    expect(domUpdates.displayTripsToDOM).to.have.been.called(1)
  })
})
