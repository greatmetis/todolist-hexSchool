import { CHECK_API, TODO_API, USERS_API } from './js/api.js'
import { Todos } from './js/todolist.js'
import UI from './js/UI.js'
import {
  getLocalStorage,
  redirect,
  swAlertInfo,
  color
} from './js/utilities.js'
const TodoInputAddBtn = document.querySelector('.todo-input__add-btn')
const TodoList = document.querySelector('.todo-list__list')
const TodoFilter = document.querySelector('.todo-list__filter')
const DeleteDoneTodoBtn = document.querySelector('.delete-done-btn')
const TodoInput = document.querySelector('.todo-input__input')
const LogoutBtn = document.querySelector('.log-out-btn')
let list = null
const currentUser = {}

// Events Listeners

// Display todos
document.addEventListener('DOMContentLoaded', function () {
  // check if it's signed in
  const authorization = getLocalStorage('Authorization')
  currentUser.name = getLocalStorage('currentUser')
  axios
    .get(`${CHECK_API}`, {
      headers: {
        Authorization: `${authorization}`
      }
    })
    .then(
      axios
        .get(`${TODO_API}`, {
          headers: {
            Authorization: `${authorization}`
          }
        })
        .then((response) => {
          const todos = response.data.todos
          UI.displayUser(currentUser.name),
          (list = new Todos(todos, authorization))
          return list
        })
        .then((list) => {
          UI.displayEmptyImg(list.todos)
          UI.displayTodos(list.filterTodos)
          UI.countTodos(list.todos)
        })
    )
    .catch((err) => {
      console.log(err.toJSON())
      redirect('./login.html')
    })
})
// Add todo
TodoInputAddBtn.addEventListener('click', function (e) {
  e.preventDefault()
  const inputVal = TodoInput.value.trim()

  list.addTodo(inputVal)

  UI.clearValue(TodoInput)
})
// Remove & Done todo
TodoList.addEventListener('click', function (e) {
  // Remove todo
  if (e.target.getAttribute('class') === 'del-todo-btn') {
    const currentId = e.target.parentElement.dataset.id
    list.deleteTodo(currentId)
    UI.displayEmptyImg(list.todos)
  }
  // Done todo
  if (e.target.getAttribute('type') === 'checkbox') {
    const el = e.target
    const id = el.id.split('-').pop()
    list.setDoneTodo(id, el.checked)
  }
})

// Filter todos
TodoFilter.addEventListener('click', function (e) {
  const selectedType = e.target.innerText.toLowerCase()
  UI.setFilter(selectedType)
  list.filterTodos = selectedType
  UI.displayTodos(list.filterTodos)
})

// Delete Done Todos
DeleteDoneTodoBtn.addEventListener('click', function (e) {
  // delete done todos in the list
  e.preventDefault()
  list.deleteDoneTodo()
})

// Logout
LogoutBtn.addEventListener('click', function (e) {
  e.preventDefault()
  swAlertInfo(
    {
      titleText: 'Signing out',
      text: 'Are you sure you want to sign out?',
      confirmButtonText: 'Yes',
      denyButtonText: 'Later',
      showDenyButton: true,
      denyButtonColor: color.gray
    },
    {
      confirmed () {
        axios
          .delete(`${USERS_API}/sign_out`, {
            headers: {
              authorization: getLocalStorage('Authorization')
            }
          })
          .then((res) => {
            console.log(res)
            redirect('index.html')
          })
          .catch((err) => console.error(err))
      },
      denied () {
        // TODO:close function
        console.log('close')
      }
    }
  )
})
