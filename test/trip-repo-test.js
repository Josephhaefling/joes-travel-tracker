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

  it('should return an empty array if no user ID us passed', () => {
    expect(tripRepo.getTripsByUserID()).to.deep.equal([])
  })

  it('should be able to get all past trips', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate(tripList, 'pastTrips', '2020/6/28')).to.deep.equal([tripsData[2], tripsData[6]])
  })

  it('should be able to get all future trips', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate(tripList, 'futureTrips', '2020/6/28')).to.deep.equal([tripList[2]])
  })

  it('should be able to get all currentTrips', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate(tripList, 'presentTrips', '2021/02/07')).to.deep.equal([tripsData[7]])
  })

  it('should return an empty array if no date is passed', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate(tripList, 'presentTrips')).to.deep.equal([])
  })

  it('should return undefined if no search type is passed', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate(tripList, '', '2021/02/07')).to.equal(undefined)
  })

  it('should return undefined if no trip list is passed', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getTripsByDate('', 'presentTrips', '2021/02/07')).to.equal(undefined)
  })

  it('should be able to get pending trips', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getPendingTrips(tripList)).to.deep.equal([tripList[0]])
  })

  it('should be able to get pending trips', () => {
    let tripList = tripRepo.getTripsByUserID(3)
    expect(tripRepo.getPendingTrips()).to.equal(undefined)
  })

  it('should be able to get a trip by its ID', () => {
    expect(tripRepo.getTripByID(3)).to.deep.equal(tripRepo.trips[2])
  })
})
