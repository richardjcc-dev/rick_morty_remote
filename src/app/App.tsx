// import { Routes, Route } from 'react-router-dom'
// import Home from '../pages/Home'
// import HomePage from '../pages/HomePage'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import Input from '../components/Input'
import List from '../components/List'

function App() {
  interface Todo {
    text: string
  }

  const [newTodo, setNewTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const onSubmit = () => {
    setTodos((prev) => [...prev, { text: newTodo }])
    setNewTodo('')
  }
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes> */}
      <Input value={newTodo} onChange={setNewTodo} onSubmit={onSubmit} />
      <List items={todos} />
    </>
  )
}

export default App
