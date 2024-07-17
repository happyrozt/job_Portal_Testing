import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedUserDataByEmail, updateJobPoststatus } from '../store/Slice';
import { getUserDataByEmail, toggleJobStatus } from '../utils/localStorageHelpers';

function ClosejobPost() {
  const {logedUserData,closeJobPageData} = useSelector((state)=>state.Auth)
  const [logedUserJObData, setLogedUserJObData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let closeJobPageData = getUserDataByEmail(logedUserData.data.email)
    dispatch(getUserLogedUserDataByEmail(closeJobPageData))
    setLogedUserJObData(closeJobPageData);
    if (closeJobPageData) {
      setLogedUserJObData(closeJobPageData);
    }
  }, [dispatch, logedUserJObData]);

  useEffect(() => {
    if (closeJobPageData) {
      setLogedUserJObData(closeJobPageData);

    }
  }, [closeJobPageData]);

  const handleStatus = (id, email) => {
    const payLoad = { email, id };
    let JobPostStatus = toggleJobStatus(payLoad)
    dispatch(updateJobPoststatus(JobPostStatus));
    let closeJobPageData = getUserDataByEmail(logedUserData.data.email)
    dispatch(getUserLogedUserDataByEmail(closeJobPageData))
    alert("Status Updated")
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {logedUserJObData && logedUserJObData.length > 0 ? (
          logedUserJObData.map((job, index) => (
            <div key={index} className='job-item'>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p>Industry: {job.industry}</p>
              <p>Location: {job.location}</p>
              <p>Work Mode: {job.workMode}</p>
              <p>Skill: {job.skill}</p>
              <p>Salary: {job.salary}</p>
              <p>Status: {job.status}</p>
              <div className='job-status-buttondiv'>
              {job.status === "active" ? (
                <button className='close-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                Close Post
              </button>) : (
                <button className='active-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                  Active Post
                </button>
              )}
              </div>
             

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
