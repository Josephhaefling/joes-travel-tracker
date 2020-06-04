import { expect } from 'chai'
import User from '../src/user'
import TestData from '../src/test-data'

describe('User', () => {

  let user
  let sampleUsers = TestData.sampleUsers

  beforeEach(() => {
    user = new User(sampleUsers[2])
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })
  it('should log', () => {
  })
})
