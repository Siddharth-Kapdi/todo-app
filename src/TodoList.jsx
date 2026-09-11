import { FaPlus } from 'react-icons/fa'
import TodoItem from './TodoItem'
import { useReducer } from 'react'

// const mockTodos = [
//   {
//     id: 1,
//     description: 'Complete React project',
//     category: 'Work',
//     completed: true,
//   },
// ]

const initialState = {
  todoItem: {
    id: Date.now(),
    description: '',
    category: '',
    completed: false,
  },
  todoList: [],
  error: '',
}

const TodoList = () => {
  const reducer = (state, action) => {
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
        const { description, category } = state.todoItem

        if (!description.trim()) {
          return {
            ...state,
            error: 'Description is required!',
          }
        }

        if (category === '') {
          return {
            ...state,
            error: 'Category is required!',
          }
        }

        const isDuplicate = state.todoList.some(
          (todo) =>
            todo.description.toLowerCase().trim() === description.toLowerCase().trim() &&
            todo.category === category
        )

        if (isDuplicate) {
          return {
            ...state,
            error: 'Duplicate entry is not allowed!',
          }
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

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

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
              focus:ring-2 focus:ring-violet-500/20
              cursor-pointer"
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
              required
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
              required
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
        {state.todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    </div>
  )
}

export default TodoList
