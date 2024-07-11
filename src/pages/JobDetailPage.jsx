import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function JobDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe access to location.state
  const { job } = location.state || {};

  // If job is undefined, handle it gracefully
  if (!job) {
    return <div>No job details available. Please go back to the job listings.</div>;
  }

  const handleApply = () => {
    navigate(`/send-proposal/${job.id}`, { state: { job } });
  };

  return (
    <div className='job-detail-page'>
        <div className='job-deatil-conatiner'>
        
      <p className='job-description'>{job.description}</p>
      <h1>{job.title}</h1>
      <p>Industry: {job.industry}</p>
      <p>Location: {job.location}</p>
      <p>Work Mode: {job.workMode}</p>
      <p>Skill: {job.skill}</p>
      <p>Salary: {job.salary}</p>
      <button onClick={handleApply}>Apply</button>
        </div>
      
    </div>
  );
}

export default JobDetailPage;
