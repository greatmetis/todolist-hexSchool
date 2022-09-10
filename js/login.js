import UI from './UI.js'
import Register from './register.js'
import { USERS_API } from './api.js'
import {
  redirect,
  setLocalStorage,
  checkValue,
  swAlertFailed,
  swAlertSuccess,
  swAlertInfo
} from './utilities.js'
const LoginEmailHint = document.querySelector('.login-email-hint')
const LoginPasswordHint = document.querySelector('.login-password-hint')
const RegisterSwitch = document.getElementById('register-switch')
const LoginSwitch = document.getElementById('login-switch')

const LoginEmail = document.querySelector('#login-email')
const LoginPassword = document.querySelector('#login-password')
const LoginButton = document.querySelector('#login-btn')

export let user = {}
class Login {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  loginAccount () {
    const user = {
      user: {
        email: this.email,
        password: this.password
      }
    }
    axios
      .post(`${USERS_API}/sign_in`, user)
      .then((res) => {
        const Authorization = res.headers.authorization
        console.log(Authorization)
        setLocalStorage('Authorization', Authorization)
        setLocalStorage('currentUser', res.data.nickname)

        swAlertSuccess({
          titleText: 'Login Successfully',
          toast: true,
          timerProgressBar: true,
          position: 'top-end',
          timer: 1000
        })
        LoginEmail.value = LoginPassword.value = ''
        redirect('/index.html')
        return res.toJSON()
      })
      .catch((err) => {
        console.log(err)
        const message = err.toJSON().message
        swAlertFailed(
          {
            titleText: message,
            text: 'Have you register yet ?',
            confirmButtonText: 'Yes, try again',
            denyButtonText: 'Register Now',
            showDenyButton: true
          },
          {
            confirmed () {
              swAlertInfo({
                title: 'Data are reset daily',
                text: '所有資料於每日 23:59 清空'
              })
            },
            denied () {
              UI.displayRegisterForm()
            }
          }
        )
        console.log(err.toJSON())
      })
  }
}
LoginSwitch.addEventListener('click', (e) => {
  e.preventDefault()
  UI.displayLoginForm()
})
RegisterSwitch.addEventListener('click', function () {
  UI.displayRegisterForm()
})

// Login
LoginButton.addEventListener('click', function (e) {
  e.preventDefault()
  if (!checkValue(LoginEmail, LoginPassword)) {
    redirect()
    UI.showError(LoginEmailHint)
    UI.showError(LoginPasswordHint)
    return
  }
  user = new Login(LoginEmail.value, LoginPassword.value)
  user.loginAccount()
})

// Register
const RegisterButton = document.querySelector('#register-btn')
let newUser = null
RegisterButton.addEventListener('click', function (e) {
  const RegisterEmail = document.querySelector('#register-email')
  const RegisterName = document.querySelector('#register-name')
  const RegisterPassword = document.querySelector('#register-password')
  const RegisterPasswordRepeat = document.querySelector(
    '#register-password-repeat'
  )
  e.preventDefault()
  if (
    Register.checkValidation(
      RegisterEmail,
      RegisterName,
      RegisterPassword,
      RegisterPasswordRepeat
    )
  ) {
    newUser = new Register(
      RegisterEmail.value,
      RegisterPassword.value,
      RegisterName.value
    )
    newUser.registerAccount()
  }
})
