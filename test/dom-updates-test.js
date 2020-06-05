import { expect } from 'chai'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import TripRepo from '../src/trip-repo'
import TestData from '../src/test-data'

const chai = require('chai')
let spies = require('chai-spies')
chai.use(spies)

describe('DomUpdates', () => {
  let domUpdates
  let user
  let tripRepo
  let travelersRepo = TestData.sampleUsers

  beforeEach(() => {
    global.domUpdates
    global.tripRepo
    tripRepo = new TripRepo(TestData.sampleTrips)
    user = new User(travelersRepo[2])
    domUpdates = new DomUpdates(travelersRepo)
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
})
