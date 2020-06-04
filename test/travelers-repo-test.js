import { expect } from 'chai'
import TravelersRepo from '../src/travelers-repo'

describe('TravelersRepo', () => {
  let travelersRepo

  beforeEach(() => {
    travelersRepo = new TravelersRepo()
  })

  it('should be a function', () => {
    expect(TravelersRepo).to.be.a('function')
  })
})
