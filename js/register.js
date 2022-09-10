import UI from './UI.js'
import { USERS_API } from './api.js'
import {
  checkValue,
  swAlertSuccess,
  swAlertFailed,
  color
} from './utilities.js'
const RegisterPasswordHint = document.querySelector('.register-password-hint')
const LoginSwitch = document.getElementById('login-switch')
export default class Register {
  constructor (email, password, nickname = 'User') {
    this.email = email
    this.nickname = nickname
    this.password = password
  }

  registerAccount () {
    const newUser = {
      user: {
        email: this.email,
        nickname: this.nickname,
        password: this.password
      }
    }
    const fetchData = () => {
      axios
        .post(`${USERS_API}`, newUser)
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            swAlertSuccess(
              {
                titleText: `Hi, ${res.data.nickname}`,
                text: 'You have successfully registered',
                confirmButtonText: 'Login Now'
              },
              {
                confirmed () {
                  LoginSwitch.click()
                }
              }
            )
          }
        })
        .catch((err) => {
          swAlertFailed({
            title: 'Register Failed',
            text: `${err.response.data.error}`,
            confirmButtonText: 'OK'
          })
        })
    }

    Swal.fire({
      title: 'Loading',
      iconColor: color.primary,
      didOpen: () => {
        Swal.showLoading()
        fetchData()
      }
    })
  }

  // check if the inputs are filled and the password are repeated correctly
  static checkValidation (...elements) {
    if (!checkValue(...elements)) {
      swAlertFailed({
        title: 'Empty Field Found',
        text: 'Please ensure you fill every field of the form'
      })
      return
    }
    const firstPwd = elements.map((el) => el.value)[elements.length - 2]
    const repeatedPwd = elements.map((el) => el.value)[elements.length - 1]
    return !!Register.checkExactPassword(firstPwd, repeatedPwd)
  }

  static checkExactPassword (firstEntry, repeatedEntry) {
    if (firstEntry === repeatedEntry) {
      UI.deleteError(RegisterPasswordHint)
      return true
    } else {
      UI.showError(RegisterPasswordHint)
      return false
    }
  }
}
