import { expect } from 'chai'
import User from '../src/user'
import DestinationsRepo from '../src/destinations-repo'
import TestData from '../src/test-data'

describe('User', () => {

  let user
  let destinationsRepo
  let sampleUsers = TestData.sampleUsers
  let destinations = TestData.sampleDestinations

  beforeEach(() => {
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
    user = new User(sampleUsers[2], destinationsRepo)
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })

  it('should be able to get the cost of a trip', () => {
    const destination = user.destinationsRepo.getDesiredDestination(2)
    expect(user.getTotalCostOfTrip(destination, 10, 2)).to.equal(2816)
  })

})
