export const redirect = (url='index.html') => {
  let currentPath = window.location.pathname.split('/')[1]
  window.location.pathname = `/${currentPath}/${url}`
}

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key)
}

export const checkValue = (...elements) => {
  return elements.every((el) => el.value.trim().length !== 0)
}
export const checkEmailFormat = (email) => {
  const mailFormat = /\S+@\S+\.\S+/
  email = email.value.trim().toLowerCase()
  return mailFormat.test(email)
}

// SweetAlert
export const color = {
  primary: '#FFD370',
  white: '#fff',
  black: '#333333',
  gray: '#9F9A91',
  grayLight: '#EFEFEF',
  warning: '#D87355'
}

export const swAlertFailed = (options, methods) => {
  Swal.fire({
    title: 'Error!',
    icon: 'error',
    color: color.black,
    confirmButtonColor: color.gray,
    denyButtonColor: color.primary,
    ...options
  }).then((result) => {
    if (!methods) {
      return
    }
    if (result.isConfirmed) {
      methods.confirmed()
    }
    if (result.isDenied) {
      methods.denied()
    }
  })
}

export const swAlertSuccess = (options, methods) => {
  Swal.fire({
    title: 'Success',
    icon: 'success',
    iconColor: color.primary,
    confirmButtonColor: color.primary,
    ...options
  }).then((result) => {
    if (!methods) return
    if (result.isConfirmed) {
      methods.confirmed()
    }
  })
}

export const swAlertInfo = (options, methods) => {
  Swal.fire({
    title: 'Info',
    icon: 'info',
    iconColor: color.gray,
    confirmButtonColor: color.primary,
    ...options
  }).then((result) => {
    if (!methods) return
    if (result.isConfirmed) {
      methods.confirmed()
    }
    if (result.isDenied) {
      methods.denied()
    }
  })
}

export const swAlertToast = (msg) => {
  Swal.fire({
    title: msg,
    timer: 1500,
    position: 'top-end',
    toast: true,
    showConfirmButton: false
  })
}