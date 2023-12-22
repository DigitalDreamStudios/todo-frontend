import Todo from './pages/Todo/Todo'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Todo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App