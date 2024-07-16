import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedJobData, getUserLogedUserDataByEmail } from '../store/Slice';
import '../App.css'

function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const getLogUser = useSelector((state) => state.Auth.logedUserData);
  const applyedJobsPageData = useSelector((state) => state.Auth.appliedJobData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getLogUser && getLogUser.data && getLogUser.data.email) {
      dispatch(getAppliedJobData(getLogUser.data.email));
    }
  }, [dispatch, getLogUser]);

  useEffect(() => {
    if (applyedJobsPageData) {
      setAppliedJobs(applyedJobsPageData);
    }
  }, [applyedJobsPageData]);

  return (
    <div className='appliedJobContainer'>
      <h2 className='appled-job-title'>Applied Jobs</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job, index) => (
          <div key={index} className='applied-job-item'>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Industry: {job.industry}</p>
            <p>Location: {job.location}</p>
            <p>Work Mode: {job.workMode}</p>
            <p>Skill: {job.skill}</p>
            <p>Salary: {job.selry}</p>
            <p>Status : {job.status}</p>
          </div>
        ))
      ) : (
        <p>No applied jobs found.</p>
      )}
    </div>
  );
}

export default AppliedJob;
