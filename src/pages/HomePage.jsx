import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkFreeLancerJobApplication, userSelectedJob } from '../store/Slice';
import { checkFreelancerApplicationStatus } from '../utils/localStorageHelpers';
import JobListingCard from '../components/card/JobListingCard';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hirerJobs, setHirerJobs] = useState([]);
 const {jobsData,isUserRole,userSearchedData,logedUserData} = useSelector((state)=>state.Auth)
  

  useEffect(() => {
    if (jobsData && jobsData.length > 0) {

      const jobs = jobsData.reduce((acc, user) => {
        if (user.role === 'Hirer' && user.data) {
          const activeJobs = user.data.filter(job => job.status === 'active');

          return [...acc, ...activeJobs];
        }
        return acc;
      }, []);
      setHirerJobs(jobs.reverse());
    }
  }, [jobsData]);

  const handleClick = (clickedData) => {
    if (isUserRole === 'Freelancer') {
      const result =  checkFreelancerApplicationStatus({freelancerEmail:logedUserData.data.email, jobId:clickedData.id} );
       dispatch( checkFreeLancerJobApplication(result))
        dispatch(userSelectedJob(clickedData));
        navigate(`/job_Portal_Testing/jobdetail/${clickedData.id}`);
    } else if (isUserRole === null) {
      navigate('/job_Portal_Testing/login');
    }
  };


  return (
    <>
      {userSearchedData.length === 0 ? (
      <JobListingCard jobsAData={hirerJobs} handleClick={handleClick } />
      ) : (
        <JobListingCard jobsAData={userSearchedData}  handleClick={handleClick } />
      )}
    </>

  );
}

export default HomePage;
