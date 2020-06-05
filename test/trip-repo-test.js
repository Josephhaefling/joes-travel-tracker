import { expect } from 'chai'
import TripRepo from '../src/trip-repo'
import TestData from '../src/test-data'

describe('Trip', () => {
  let tripRepo
  let tripsData = TestData.sampleTrips

  beforeEach(() => {
    tripRepo = new TripRepo(tripsData)
  })

  it('should be a function', () => {
    expect(TripRepo).to.be.a('function')
  })

  it('should be able to get a users trip by their id', () => {
    expect(tripRepo.getTripsByUserID(3)).to.deep.equal([tripsData[2], tripsData[6], tripsData[7]])
  })
})
