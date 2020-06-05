import { expect } from 'chai'
import DomUpdates from '../src/dom-updates'
import User from '../src/user'
import TestData from '../src/test-data'

const chai = require('chai')
let spies = require('chai-spies')
chai.use(spies)

describe('DomUpdates', () => {
  let domUpdates
  let user
  let sampleUsers = TestData.sampleUsers

  beforeEach(() => {
    global.domUpdates
    user = new User(sampleUsers[2])
    domUpdates = new DomUpdates(sampleUsers)
  })


  it('should be a function', () => {
    expect(DomUpdates).to.be.a('function')
  })

  it('should spy on displayUserPage', () => {
    chai.spy.on(domUpdates, 'displayUserPage', () => {})
    domUpdates.displayUserPage(user)
    expect(domUpdates.displayUserPage).to.have.been.called(1)
    expect(domUpdates.displayUserPage).to.have.been.called.with(user)
  })

  it('should greet the current user', () => {
    chai.spy.on(domUpdates, 'greetUser', () => {})
    domUpdates.greetUser(user)
    expect(domUpdates.greetUser).to.have.been.called(1)
    expect(domUpdates.greetUser).to.have.been.called.with(user)
  })

  it('should display an error message if there is no user name', () => {
    chai.spy.on(domUpdates, 'displayLoginError', () => {})
    domUpdates.displayLoginError()
    expect(domUpdates.displayLoginError).to.have.been.called(1)
  })
})
