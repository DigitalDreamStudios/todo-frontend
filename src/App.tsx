import TodoContainer from './pages/Todo/components/TodoContainer/TodoContainer'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Footer from './components/Footer/Footer';

function App() {
  const auth = useAuth();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<TodoContainer />} />
        <Route path="/" element={auth.token ? <TodoContainer /> : <Navigate to="/login" />} />
        {/* If the user has a token, redirect to Dashboard; otherwise, show SignIn */}
        <Route path="login" element={auth.token ? <Navigate to="/" /> : <SignIn />} />
        {/* If the user has a token, redirect to Dashboard; otherwise, show SignUp */}
        <Route path="register" element={auth.token ? <Navigate to="/" /> : <SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App