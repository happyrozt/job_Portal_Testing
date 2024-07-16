import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedUserDataByEmail, updateJobPoststatus } from '../store/Slice';

function ClosejobPost() {
  const userEmail = useSelector((state) => state.Auth.logedUserData);
  const closeJobPageData = useSelector((state) => state.Auth.closeJobData);
  const [logedUserData, setLogedUserData] = useState([]);
  const dispatch = useDispatch();
 
  useEffect(() => {
    // if (userEmail.data && userEmail.length > 0) {
       
      dispatch(getUserLogedUserDataByEmail(userEmail.data.email));
      setLogedUserData(closeJobPageData);
      if (closeJobPageData) {
        setLogedUserData(closeJobPageData);
      }
    // }
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (closeJobPageData) {
      setLogedUserData(closeJobPageData);
      
    }
  }, [closeJobPageData]);

  const handleStatus = (id, email) => {
    const payLoad = { email, id };
    dispatch(updateJobPoststatus(payLoad));
    dispatch(getUserLogedUserDataByEmail(userEmail.data.email));
    alert("Status Updated")
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {logedUserData && logedUserData.length > 0 ? (
          logedUserData.map((job, index) => (
            <div key={index} className='job-item'>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>Industry: {job.industry}</p>
              <p>Location: {job.location}</p>
              <p>Work Mode: {job.workMode}</p>
              <p>Skill: {job.skill}</p>
              <p>Salary: {job.salary}</p>
              <p>Status: {job.status}</p> 
              {job.status === "active" ? (  <button className='close-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                Close Post
              </button>):(
                  <button className='close-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                  Active Post
                </button>
              )}
            
            </div>
          ))
        ) : (
          <p>No jobs available for Hirers.</p>
        )}
      </div>
    </div>
  );
}

export default ClosejobPost;
