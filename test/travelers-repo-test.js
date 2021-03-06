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

  it('should return undefined if no user ID is passed', () => {
    expect(travelersRepo.getUserById()).to.deep.equal(undefined)
  })

  it('should be able to get a user by their name', () => {
    expect(travelersRepo.getUserByName("Sibby Dawidowitsch")).to.equal(travelersRepo.allTravelers[2])
  })

  it('should return undefined of no user name is passed', () => {
    expect(travelersRepo.getUserByName()).to.equal(undefined)
  })
})
