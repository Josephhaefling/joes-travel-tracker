import { expect } from 'chai'
import Agency from '../src/agency'

describe('Agency', () => {
  let agency

  beforeEach(() => {
    agency = new Agency()
  })
  
  it('should be a function', () => {
    expect(Agency).to.be.a('function')
  })
})