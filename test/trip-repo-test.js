import { expect } from 'chai'
import TripRepo from '../src/trip-repo'

describe('Trip', () => {
  let tripRepo

  beforeEach(() => {
    tripRepo = new TripRepo()
  })

  it('should be a function', () => {
    expect(TripRepo).to.be.a('function')
  })
})
