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
  // let user
  let tripRepo
  let travelersRepo
  let destinationsRepo

  beforeEach(() => {
    global.domUpdates
    global.tripRepo
    travelersRepo = new TravelersRepo(TestData.sampleUsers)
    tripRepo = new TripRepo(TestData.sampleTrips)
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    // user = new User(travelersRepo[2], destinationsRepo)
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
    chai.spy.on(tripRepo, 'getTripsByUserID', () => {})
    tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByUserID).to.have.been.called(1)
    expect(tripRepo.getTripsByUserID).to.have.been.called.with(3)
  })

  it.only('should return all users trips', () => {
    expect(domUpdates.getAllUserTrips(3)).to.equal([])
  })
})
