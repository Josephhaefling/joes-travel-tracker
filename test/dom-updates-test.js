import { expect } from 'chai'
import DomUpdates from '../src/dom-updates'
const chai = require('chai')
let spies = require('chai-spies')
chai.use(spies)

describe('DomUpdates', () => {
  let domUpdates

  beforeEach(() => {
    domUpdates = new DomUpdates()
  })

  it('should be a function', () => {
    expect(DomUpdates).to.be.a('function')
  })
})
