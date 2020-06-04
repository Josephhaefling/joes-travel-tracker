import { expect } from 'chai'
import DomUpdates from '../src/dom-updates'

describe('DomUpdates', () => {
  let domUpdates

  beforeEach(() => {
    domUpdates = new DomUpdates()
  })

  it('should be a function', () => {
    expect(DomUpdates).to.be.a('function')
  })
})
