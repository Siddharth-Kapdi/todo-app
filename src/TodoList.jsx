import { FaPlus } from 'react-icons/fa'
import TodoItem from './TodoItem'
import { useReducer, useState } from 'react'

const initialState = {
  todoItem: {
    id: Date.now(),
    description: '',
    category: '',
    completed: false,
  },
  todoList: [],
  categoryFilter: 'all',
  statusFilter: 'all',
  error: '',
}

const TodoList = () => {
  const [editingId, setEditingId] = useState(null)

  const validateTodo = (todoItem, state) => {
    const { id, description, category } = todoItem

    if (!description.trim()) {
      return 'Description is required!'
    }

    if (category === '') {
      return 'Category is required!'
    }

    console.log(
      'editing id:',
      id,
      'todoList ids:',
      state.todoList.map((t) => t.id)
    )

    const isDuplicate = state.todoList.some(
      (todo) =>
        todo.id !== id &&
        todo.description.toLowerCase().trim() === description.toLowerCase().trim() &&
        todo.category === category
    )

    console.log('description', description, 'category', category)

    if (isDuplicate) {
      return 'Duplicate entry is not allowed!'
    }
    return ''
  }

  const reducer = (state, action) => {
    console.log('ACTION:', action.type, action.payload)
    switch (action.type) {
      case 'SET_TODO':
        return {
          ...state,
          todoItem: {
            ...state.todoItem,
            ...action.payload,
          },
        }

      case 'ADD_TODO': {
        const validationError = validateTodo(state.todoItem, state)
        console.log(validationError)

        if (validationError) {
          return { ...state, error: validationError }
        }

        return {
          ...state,
          todoList: [...state.todoList, state.todoItem],
          todoItem: {
            id: Date.now(),
            description: '',
            category: '',
            completed: false,
          },
          categoryFilter: 'all',
          statusFilter: 'all',
          error: '',
        }
      }

      case 'REMOVE_TODO': {
        console.log('hello')

        return {
          ...state,
          todoList: state.todoList.filter((todo) => todo.id !== action.payload.id),
        }
      }

      case 'EDIT_TODO': {
        const validationError = validateTodo(action.payload, state)
        console.log(validationError)

        if (validationError) {
          return { ...state, error: validationError }
        }

        return {
          ...state,
          todoList: state.todoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
          ),
          error: '',
        }
      }

      case 'TOGGLE_TODO': {
        return {
          ...state,
          todoList: state.todoList.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        }
      }

      case 'MOVE_UP': {
        const index = state.todoList.findIndex((todo) => todo.id === action.payload)

        if (index <= 0) return state

        const newTodoList = [...state.todoList]

        const temp = newTodoList[index - 1]
        newTodoList[index - 1] = newTodoList[index]
        newTodoList[index] = temp

        return {
          ...state,
          todoList: newTodoList,
        }
      }

      case 'MOVE_DOWN': {
        const index = state.todoList.findIndex((todo) => todo.id === action.payload)

        if (index >= state.todoList.length - 1) return state

        const newTodoList = [...state.todoList]

        const temp = newTodoList[index + 1]
        newTodoList[index + 1] = newTodoList[index]
        newTodoList[index] = temp

        return {
          ...state,
          todoList: newTodoList,
        }
      }

      case 'FILTER_BY_CATEGORY':
        return {
          ...state,
          categoryFilter: action.payload.category,
        }

      case 'FILTER_BY_STATUS':
        return {
          ...state,
          statusFilter: action.payload.status,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const filteredTodoList = state.todoList
    .filter((todo) => {
      if (state.categoryFilter === 'all') {
        return true
      }

      return todo.category === state.categoryFilter
    })
    .filter((todo) => {
      if (state.statusFilter === 'all') {
        return true
      }

      if (state.statusFilter === 'completed') {
        return todo.completed === true
      }

      if (state.statusFilter === 'pending') {
        return todo.completed === false
      }

      return true
    })

  return (
    <div className="max-w-3xl w-full mx-auto bg-slate-900 p-8 rounded-lg shadow-white space-y-5">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <select
              className="bg-slate-950 text-white border border-slate-700
              rounded-lg
              px-1
              py-2
              outline-none
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/20
              cursor-pointer"
              onChange={(e) =>
                dispatch({ type: 'FILTER_BY_CATEGORY', payload: { category: e.target.value } })
              }
            >
              <option value="all">All</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div>
            <select
              className="bg-slate-950 text-white border border-slate-700
              rounded-lg
              px-1
              py-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              cursor-pointer"
              onChange={(e) =>
                dispatch({ type: 'FILTER_BY_STATUS', payload: { status: e.target.value } })
              }
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div>
          <form
            className="flex items-center justify-between gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              dispatch({ type: 'ADD_TODO' })
            }}
          >
            <input
              type="text"
              placeholder="Enter todo..."
              className="w-60 bg-slate-950 text-white border border-slate-700
              rounded-lg
              p-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20"
              // required
              value={state.todoItem.description}
              onChange={(e) =>
                dispatch({ type: 'SET_TODO', payload: { description: e.target.value } })
              }
            />
            <select
              className="bg-slate-950 text-white border border-slate-700
              rounded-lg
              p-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              cursor-pointer"
              // required
              value={state.todoItem.category}
              onChange={(e) =>
                dispatch({ type: 'SET_TODO', payload: { category: e.target.value } })
              }
            >
              <option value="">Select Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
            <button
              className="bg-violet-600 text-white border border-slate-700
              rounded-lg
              px-4 py-2 hover:bg-violet-800 cursor-pointer"
            >
              <FaPlus />
            </button>
          </form>
        </div>
      </div>
      {state.error && <p className="text-center text-rose-400">{state.error}</p>}
      <div className="space-y-4">
        {filteredTodoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            dispatch={dispatch}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoList
