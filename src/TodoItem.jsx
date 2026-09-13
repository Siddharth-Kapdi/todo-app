import { FaArrowAltCircleUp } from 'react-icons/fa'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { MdDone } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'

const TodoItem = ({ todo, dispatch, editingId, setEditingId }) => {
  const [draft, setDraft] = useState(todo)
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-x-8 bg-slate-950 p-4 rounded-lg">
      {editingId === todo.id ? (
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              className="w-full bg-slate-950 text-white border border-slate-700
            rounded-lg
            p-2
            outline-none
           focus:border-violet-500
            focus:ring-2 focus:ring-violet-500/20"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
            <select
              className="w-full bg-slate-950 text-white border border-slate-700
            rounded-lg
            p-2
            outline-none
          focus:border-violet-500
            focus:ring-2 focus:ring-violet-500/20
            cursor-pointer"
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-rose-600 text-white border border-slate-700
            rounded-lg text-xl
            px-4 py-2 hover:bg-rose-800 cursor-pointer"
              title="Cancel edit"
              onClick={() => {
                setEditingId(null)
              }}
            >
              <MdCancel />
            </button>
            <button
              className="bg-emerald-600 text-white border border-slate-700
            rounded-lg text-xl
            px-4 py-2 hover:bg-emerald-800 cursor-pointer"
              title="Done edit"
              onClick={() => {
                dispatch({ type: 'EDIT_TODO', payload: draft })
                setEditingId(null)
              }}
            >
              <MdDone size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="flex items-center space-x-4 border border-slate-700 rounded-lg p-2">
              <input
                type="checkbox"
                className="size-5 cursor-pointer accent-violet-500"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              />
              <button onClick={() => dispatch({ type: 'MOVE_UP', payload: todo.id })}>
                <FaArrowAltCircleUp className="text-2xl text-emerald-400 cursor-pointer" />
              </button>
              <button onClick={() => dispatch({ type: 'MOVE_DOWN', payload: todo.id })}>
                <FaArrowAltCircleDown className="text-2xl text-rose-400 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-4 border border-slate-700 rounded-lg p-2">
            <div className="w-full flex items-center justify-between gap-2">
              <p className="text-lg">{todo.description}</p>
              <p className="text-slate-400 pr-4">{todo.category}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setDraft(todo)
                  setEditingId(todo.id)
                }}
              >
                <FaEdit className="text-2xl cursor-pointer" />
              </button>
              <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
                <IoMdRemoveCircleOutline className="text-2xl text-rose-400 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoItem
