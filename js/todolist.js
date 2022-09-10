import { TODO_API } from './api.js'
import UI from './UI.js'

class Todo {
  constructor (content, id) {
    this.content = content
    this.id = id
    this.done = false
  }
}
export class Todos {
  constructor (todos, key) {
    this.key = key
    this.todos = todos
    this.currentFilter = 'all'
  }

  addTodo (val) {
    if (val) {
      axios
        .post(
          `${TODO_API}`,
          { todo: { content: `${val}` } },
          {
            headers: {
              authorization: this.key
            }
          }
        )
        .then((res) => {
          const id = res.data.id
          const content = res.data.content
          this.todos.push(new Todo(content, id))
          return this.todos
        })
        .catch((res) => console.error(res.response))
        .then(() => {
          UI.displayEmptyImg(this.todos) // replace emptyImg if there was no todos
          UI.displayTodos(this.filterTodos)
          UI.countTodos(this.todos)
        })

      return
    }
    UI.showAlert('Insert something...')
  }

  deleteTodo (id) {
    axios
      .delete(`${TODO_API}/${id}`, {
        headers: { authorization: this.key }
      })
      .then((res) => {
        if (res.status == 200) {
          this.todos = this.todos.filter((todo) => todo.id !== id)
        }
      })
      .catch((err) => console.error(err))
      .then(() => {
        UI.displayEmptyImg(this.todos)
        UI.displayTodos(this.filterTodos)
        UI.countTodos(this.todos)
      })
  }

  setDoneTodo (id, status) {
    axios
      .patch(
        `${TODO_API}/${id}/toggle`,
        {},
        {
          headers: { authorization: this.key }
        }
      )
      .then((res) => {
        this.todos.forEach((todo) => {
          todo.id === id ? (todo.completed_at = res.data.completed_at) : ''
        })
        UI.displayTodos(this.filterTodos)
      })
      .catch((err) => console.error(err))

    this.todos.forEach((todo) => {
      todo.id === id ? (todo.done = status) : todo
    })
    return this.filterTodos
  }

  get filterTodos () {
    const filter = this.currentFilter
    let filteredTodos = []
    if (filter === 'done') {
      filteredTodos = this.todos.filter((todo) => todo.completed_at)
    } else if (filter === 'todo') {
      filteredTodos = this.todos.filter((todo) => !todo.completed_at)
    } else {
      filteredTodos = this.todos
    }
    return filteredTodos
  }

  set filterTodos (status) {
    this.currentFilter = status
    return this.filterTodos
  }

  deleteDoneTodo () {
    this.todos.forEach((todo) => {
      if (todo.completed_at) {
        this.deleteTodo(todo.id)
      }
    })
  }
}

export default { Todos }
