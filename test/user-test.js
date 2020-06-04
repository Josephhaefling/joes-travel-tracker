import { expect } from 'chai'
import User from '../src/user'

describe('User', () => {

  let user

  beforeEach(() => {
    user = new User()
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  })
})
