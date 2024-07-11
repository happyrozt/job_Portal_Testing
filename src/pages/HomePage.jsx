import React, { useEffect, useState } from 'react';
import '../App.css';
import useGetDataFromLocalStr from '../components/CustomHook/useGetDatafromLocalstr';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const { userData } = useGetDataFromLocalStr();
  const [hirerJobs, setHirerJobs] = useState([]);

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

  const handleClick = (clickedData) => {
    navigate(`/jobdetail`, { state: { job: clickedData } });
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {hirerJobs.length > 0 ? (
          hirerJobs.map((job, index) => (
            <div key={index} className='job-item' onClick={() => handleClick(job)}>
              <p className='job-title'>{job.title}</p>
              <p>{job.description}</p>
              <p>Industry: {job.industry}</p>
              <p>Location: {job.location}</p>
              <p>Work Mode: {job.workMode}</p>
              <p>Skill: {job.skill}</p>
              <p>Salary: {job.salary}</p>
            </div>
          ))
        ) : (
          <p>No jobs available for Hirers.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
