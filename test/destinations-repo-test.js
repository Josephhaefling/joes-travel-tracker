import { expect } from 'chai'
import DestinationsRepo from '../src/destinations-repo'
import TestData from '../src/test-data'

describe('DestinationsRepo', () => {
  let destinationsRepo
  let destinations = TestData.sampleDestinations

  beforeEach(() => {
    destinationsRepo = new DestinationsRepo(TestData.sampleDestinations)
  })

  it('should be a function', () => {
    expect(DestinationsRepo).to.be.a('function')
  })

  it('should be able to get the desired destination', () => {
    expect(destinationsRepo.getDesiredDestination(2)).to.deep.equal(destinations[1])
  })

  it('should return undefined if a destination ID is not passed', () => {
    expect(destinationsRepo.getDesiredDestination()).to.deep.equal(undefined)
  })

  it('should be able to get the lodging cost of a trip', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getLodgingCost(destination, 2)).to.equal(200)
  })

  it('should return NaN if a destination is not passed', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getLodgingCost('', 2)).to.deep.equal(NaN)
  })

  it('should return 0 if a destination is not passed', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getLodgingCost(destination)).to.deep.equal(0)
  })

  it('should be able to get the flight cost of a trip', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getFlightCost(destination, 2)).to.equal(1560)
  })

  it('should return NaN if no destination is passed', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getFlightCost('', 2)).to.deep.equal(NaN)
  })

  it('should return 0 if no number of travelers is passed', () => {
    const destination = destinationsRepo.getDesiredDestination(2)
    expect(destinationsRepo.getFlightCost(destination)).to.deep.equal(0)
  })

  it('should be able to get a destination by name', () => {
    expect(destinationsRepo.getDestinationByName("Lima, Peru")).to.deep.equal(destinations[0])
  })

  it('should be able to get a destination by name', () => {
    expect(destinationsRepo.getDestinationByName()).to.equal(undefined)
  })
})
