import { expect } from 'chai'
import TravelersRepo from '../src/travelers-repo'
import testData from '../src/test-data'

describe('TravelersRepo', () => {
  let travelersRepo

  beforeEach(() => {
    travelersRepo = new TravelersRepo(testData.sampleUsers)
  })

  it('should be a function', () => {
    expect(TravelersRepo).to.be.a('function')
  })
  it('should be able to get a users info by id', () => {
    expect(travelersRepo.getUserById(3)).to.deep.equal(travelersRepo.allTravelers[2])
  })
})
