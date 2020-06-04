import { expect } from 'chai'
import Trip from '../src/trip'

describe('Trip', () => {
  let trip

  beforeEach(() => {
    trip = new Trip
  })

it('should be a function', () => {
  expect(Trip).to.be.a('function')
  })
})
