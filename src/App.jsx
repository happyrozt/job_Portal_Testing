
import './App.css'
import Header from './components/header/Header'
import ClosejobPost from './pages/ClosejobPost';
import CreateJobPost from './pages/CreateJobPost';
import HomePage from './pages/HomePage'
import JobDetailPage from './pages/JobDetailPage';
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {  

  return (
    <Router>
      <Header  />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createjobpost" element={<CreateJobPost />} />
        <Route path="/closejobpost" element={<ClosejobPost />} />
        <Route path="/jobdetail" element={<JobDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
