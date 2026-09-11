import { FaArrowAltCircleUp } from 'react-icons/fa'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { MdDone } from 'react-icons/md'

const TodoItem = ({ todo, dispatch, editingId, setEditingId }) => {
  return (
    <div className="flex items-center justify-between space-x-8 bg-slate-950 p-4 rounded-lg">
      {editingId === todo.id ? (
        <div className="w-full flex justify-between">
          <input
            type="text"
            className="w-80 bg-slate-950 text-white border border-slate-700
            rounded-lg
            p-2
            outline-none
           focus:border-violet-500
            focus:ring-2 focus:ring-violet-500/20"
            value={todo.description}
            onChange={(e) =>
              dispatch({
                type: 'EDIT_TODO',
                payload: { id: todo.id, description: e.target.value },
              })
            }
          />
          <select
            className="w-44 bg-slate-950 text-white border border-slate-700
              rounded-lg
              p-2
              outline-none
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              cursor-pointer"
            value={todo.category}
            onChange={(e) =>
              dispatch({
                type: 'EDIT_TODO',
                payload: { id: todo.id, category: e.target.value },
              })
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
            className="bg-emerald-600 text-white border border-slate-700
              rounded-lg
              px-4 py-2 hover:bg-emerald-800 cursor-pointer"
            onClick={() => {
              setEditingId(null)
            }}
          >
            <MdDone size={20} />
          </button>
        </div>
      ) : (
        <>
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
            <button onClick={() => setEditingId(todo.id)}>
              <FaEdit className="text-2xl cursor-pointer" />
            </button>
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })}>
              <IoMdRemoveCircleOutline className="text-2xl text-rose-400 cursor-pointer" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem
