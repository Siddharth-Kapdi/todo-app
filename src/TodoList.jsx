import { FaPlus } from 'react-icons/fa'
import TodoItem from './TodoItem'

const mockTodos = [
  {
    id: 1,
    description: 'Complete React project',
    category: 'Work',
    completed: true,
  },
]

const TodoList = () => {
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
          <form className="flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Enter todo..."
              className="w-60 bg-slate-950 text-white border border-slate-700
              rounded-lg
              p-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20"
            />
            <select
              className="bg-slate-950 text-white border border-slate-700
              rounded-lg
              p-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              cursor-pointer"
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
      <div className="space-y-4">
        {mockTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default TodoList
