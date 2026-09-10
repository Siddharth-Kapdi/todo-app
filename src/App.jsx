import TodoList from './TodoList'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold">Todo list</h1>
      <TodoList />
    </div>
  )
}

export default App
