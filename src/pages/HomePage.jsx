import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkFreeLancerJobApplication, userSelectJob } from '../store/Slice';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hirerJobs, setHirerJobs] = useState([]);
  const userData = useSelector((state) => state.Auth.jobsData);
  const checkUserRole = useSelector((state) => state.Auth.isUserRole);
  const searchedData = useSelector((state) => state.Auth.userSearchedData)
  const isApplied = useSelector((state)=>state.Auth.isApplied)
  const logUserEmail = useSelector((state) => state.Auth.logedUserData);

  useEffect(() => {
    if (userData && userData.length > 0) {

      const jobs = userData.reduce((acc, user) => {
        if (user.role === 'Hirer' && user.data) {
          const activeJobs = user.data.filter(job => job.status === 'active');

          return [...acc, ...activeJobs];
        }
        return acc;
      }, []);

      setHirerJobs(jobs.reverse());
    }
  }, [userData]);

  const handleClick = async (clickedData) => {
    if (checkUserRole === 'Freelancer') {
      const result = await dispatch(checkFreeLancerJobApplication({ email: logUserEmail.data.email, id: clickedData.id }));
      if (isApplied === false) {
        dispatch(userSelectJob(clickedData));
        navigate(`/jobdetail/${clickedData.id}`);
      } else {
        alert('You have already applied for this job.');
      }
    } else if (checkUserRole === null) {
      navigate('/login');
    }
  };


  return (
    <>


      {searchedData.length === 0 ? (<div className='home-page-container'>
        <div className='job-list'>
          {hirerJobs.length > 0 ? (
            hirerJobs.map((job, index) => (
              <div key={index} className='job-item' onClick={() => handleClick(job)}>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <p>Industry: {job.industry}</p>
                <p>Location: {job.location}</p>
                <p>Work Mode: {job.workMode}</p>
                <p>Skill: {job.skill}</p>
                <p>Salary: {job.selry}</p>
              </div>
            ))
          ) : (
            <p>No jobs available .</p>
          )}
        </div>
      </div>) : (
        <div className='home-page-container'>
          <div className='job-list'>
            {searchedData.length > 0 ? (
              searchedData.map((job, index) => (
                <div key={index} className='job-item' onClick={() => handleClick(job)}>
                  <h2>{job.title}</h2>
                  <p>{job.description}</p>
                  <p>Industry: {job.industry}</p>
                  <p>Location: {job.location}</p>
                  <p>Work Mode: {job.workMode}</p>
                  <p>Skill: {job.skill}</p>
                  <p>Salary: {job.selry}</p>
                </div>
              ))
            ) : (
              <p>No jobs available .</p>
            )}
          </div>
        </div>
      )}



    </>

  );
}

export default HomePage;
