import './App.css';
import Header from './components/header/Header';
import ClosejobPost from './pages/ClosejobPost';
import CreateJobPost from './pages/CreateJobPost';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SendProposalPage from './pages/SendProposalPage';
import AppliedJob from './pages/AppliedJob';
import ViewProposalPage from './pages/ViewProposalPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { getLoggeduserDatafromlocStr, getUsersWithRoleHirer } from './utils/localStorageHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { setAllHirerData, setUserData } from './store/Slice';

function App() {
  const dispatch = useDispatch();
  const logedUserData = useSelector((state) => state.Auth.logedUserData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      let logedUserResult = getLoggeduserDatafromlocStr();
      dispatch(setUserData(logedUserResult));
      let JobsData = getUsersWithRoleHirer();
      dispatch(setAllHirerData(JobsData));
      setLoading(false);
    };

    loadUserData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/job_Portal_Testing/createjobpost"
          element={<ProtectedRoute element={<CreateJobPost />} />}
        />
        <Route
          path="/job_Portal_Testing/closejobpost"
          element={<ProtectedRoute element={<ClosejobPost />} />}
        />
        <Route path="/job_Portal_Testing/jobdetail/:id" element={<JobDetailPage />} />
        <Route
          path="/job_Portal_Testing/proposal/:id"
          element={<ProtectedRoute element={<SendProposalPage />} />}
        />
        <Route
          path="/job_Portal_Testing/applyedjobs"
          element={<ProtectedRoute element={<AppliedJob />} />}
        />
        <Route
          path="/job_Portal_Testing/proposals"
          element={<ProtectedRoute element={<ViewProposalPage />} allowedRoles={['Hirer']} />}
        />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
