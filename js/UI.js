import { swAlertToast } from './utilities.js'
const TodoQty = document.querySelector('.todo-list__info span')
const FilterEl = document.querySelectorAll('[data-filter-value]')
const CurrentUserName = document.querySelector('#current-user-name')
const LoginForm = document.querySelector('.login-form')
const RegisterForm = document.querySelector('.register-form')
const TodoList = document.querySelector('.todo-list__list')

export default class UI {
  static displayTodos (todos) {
    TodoList.innerHTML = ''
    // display updated list
    todos.forEach((todo) => UI.addTodoToList(TodoList, todo))
  }

  static displayUser (user) {
    CurrentUserName.textContent = user
  }

  static addTodoToList (el, todo) {
    const tempList = document.createElement('li')
    tempList.className = 'list__item'
    tempList.setAttribute('data-id', todo.id)
    if (todo.completed_at) {
      tempList.innerHTML = ` <label for="item-${todo.id}">
        <input type="checkbox" name="" id="item-${todo.id}" value="${todo.content}" checked>
        <span>${todo.content}</span>
      </label> 
      <button class="del-todo-btn"></button>
    `
    } else {
      tempList.innerHTML = ` <label for="item-${todo.id}">
      <input type="checkbox" name="" id="item-${todo.id}" value="${todo.content}">
      <span>${todo.content}</span>
    </label> 
    <button class="del-todo-btn"></button>
  `
    }
    el.appendChild(tempList)
  }

  static countTodos (todos) {
    TodoQty.textContent = todos.length || 0
  }

  static clearValue (el) {
    el.value = ''
  }

  static showAlert (msg) {
    swAlertToast(msg)
  }

  static displayEmptyImg (todos) {
    if (todos.length === 0) {
      document.querySelector('.todo-list').style.display = 'none'
      document.querySelector('.empty-list').style.display = 'block'
    } else {
      document.querySelector('.todo-list').style.display = 'block'
      document.querySelector('.empty-list').style.display = 'none'
    }
  }

  static setFilter (type) {
    if (type.includes('all')) {
      type = 'all'
    }
    FilterEl.forEach((el) => {
      if (el.dataset.filterValue === type) {
        el.classList.add('selected')
        return
      }
      el.classList.remove('selected')
    })
  }

  static displayLoginForm () {
    RegisterForm.style.display = 'none'
    LoginForm.style.display = 'block'
  }

  static displayRegisterForm () {
    RegisterForm.style.display = 'block'
    LoginForm.style.display = 'none'
  }

  static showError (el) {
    el.classList.add('error')
  }

  static deleteError (el) {
    el.classList.remove('error')
  }

  static emptyInputValue (...elements) {
    elements.forEach((el) => (el.value = ''))
  }
}
