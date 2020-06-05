class DomUpdates {
  constructor(travelersRepo) {
    this.travelersRepo = travelersRepo;
  }

  displayAppropriateUser(userType, currentUser) {
    const loginForm = document.querySelector('.login-form')
    const userPage = document.querySelector(`.${userType}-page`)
    loginForm.classList.add('hide')
    userPage.classList.remove('hide')
    this.greetUser(userType, currentUser)
  }

  greetUser(userType, currentUser) {
    const userGreeting = document.querySelector(`.${userType}-greeting`)
    const travelerFirstName = currentUser.name.split(' ')[0];
    userGreeting.innerText = `Welcome Back ${travelerFirstName}`
  }

  displayLoginError(errorType) {
    let loginInput = document.querySelector(`.${errorType}`)
    loginInput.style.border = '1px solid red'
    console.log(loginInput);
  }
}
module.exports = DomUpdates
