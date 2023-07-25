import TodoContainer from './pages/Todo/components/TodoContainer/TodoContainer'
import './App.css'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import StickyFooter from './components/StickyFooter';

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <PrimarySearchAppBar />
        <Routes>
          <Route index element={<TodoContainer />} />
          <Route path="/" element={auth.token ? <TodoContainer /> : <Navigate to="/login" />} />
          {/* If the user has a token, redirect to Dashboard; otherwise, show SignIn */}
          <Route path="login" element={auth.token ? <Navigate to="/" /> : <SignIn />} />
          {/* If the user has a token, redirect to Dashboard; otherwise, show SignUp */}
          <Route path="register" element={auth.token ? <Navigate to="/" /> : <SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* <StickyFooter /> */}
    </div>
  )
}

export default App