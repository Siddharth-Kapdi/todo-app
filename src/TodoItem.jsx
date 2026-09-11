import { FaArrowAltCircleUp } from 'react-icons/fa'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { IoMdRemoveCircleOutline } from 'react-icons/io'

const TodoItem = ({ todo, dispatch }) => {
  return (
    <div className="flex items-center justify-between space-x-8 bg-slate-950 p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          className="size-5 cursor-pointer accent-violet-500"
          checked={todo.completed}
        />
        <button>
          <FaArrowAltCircleUp className="text-2xl text-emerald-400 cursor-pointer" />
        </button>
        <button>
          <FaArrowAltCircleDown className="text-2xl text-rose-400 cursor-pointer" />
        </button>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-lg">{todo.description}</p>
        <p className="text-slate-400">{todo.category}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button>
          <FaEdit className="text-2xl cursor-pointer" />
        </button>
        <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })}>
          <IoMdRemoveCircleOutline className="text-2xl text-rose-400 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
