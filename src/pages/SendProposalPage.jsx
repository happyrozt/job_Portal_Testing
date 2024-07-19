import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSelectedjob, setAppliedJobData, sendProposal, userSelectedJob } from '../store/Slice';
import "../App.css";
import { addProposalDataToUser, getDataById, setuserAppliedJobData } from '../utils/localStorageHelpers';

function SendProposalPage() {
  const { id } = useParams();
  const {selectedJob,logedUserData} = useSelector((state)=> state.Auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState({ resume: '', personalInfo: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    experience: "",
    error: ""
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type !== 'application/pdf') {
      setFormData(prevFormData => ({
        ...prevFormData,
        error: 'Only PDF files are allowed.'
      }));
      setResumeFile(null);
    } else {
      setResumeFile(file);
      setFormData(prevFormData => ({
        ...prevFormData,
        error: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, education, experience } = formData;

    if (!name || !education || !experience || !resumeFile) {
      setFormData(prevFormData => ({
        ...prevFormData,
        error: 'All fields are required.'
      }));
      return;
    }

    const hirerEmail = selectedJob.email;
    const proposalData = {
      name,
      education,
      experience,
      resume: resumeFile.name,
      personalInfo: proposal.personalInfo,
      appledFor: selectedJob.title,
      status: "Pending",
      id: selectedJob.id,
      email: logedUserData.data.email
    };
    let payload = { hirerEmail, proposalData };
    
    
    let addProposalDataToUserResult = addProposalDataToUser(hirerEmail, proposalData )
    dispatch(sendProposal(addProposalDataToUserResult))
    let appliedJobDataResult =setuserAppliedJobData(logedUserData.data.email, selectedJob);
    dispatch(setAppliedJobData(appliedJobDataResult))
    setFormData({
      name: "",
      education: "",
      experience: "",
      error: ""
    });
    setProposal({ resume: '', personalInfo: '' });
    setResumeFile(null);
     navigate('/job_Portal_Testing/appliedjobs');
    console.log('Proposal submitted:', formData);
  };

  useEffect(() => {
    if (!selectedJob && id) {
       let selctedJobresult =  getDataById(id)
        dispatch(userSelectedJob(selctedJobresult));
    }
}, [dispatch, id, selectedJob]);

  if (!selectedJob) {
    return <div>No job details available. Please go back to the job listings.</div>;
  }

  const { name, education, experience, error } = formData;

  return (
    <div className='send-proposal-page'>
      <p className='proposal-title'>Apply for {selectedJob.title}</p>
      <form onSubmit={handleSubmit} className='proposal-form'>
        <div className='proposal-input-group'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder='Name'
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='proposal-input-group'>
          <label htmlFor="education">Education</label>
          <input
            type="text"
            placeholder='Education'
            name="education"
            value={education}
            onChange={handleChange}
          />
        </div>
        <div className='proposal-input-group'>
          <label htmlFor="experience">Experience</label>
          <input
            type="text"
            placeholder='Experience'
            name="experience"
            value={experience}
            onChange={handleChange}
          />
        </div>
        <div className='resume-div'>
          <label>Upload Resume</label>
          <input type='file' onChange={handleFileChange} />
        </div>

        <div className='proposal-send-button'>
          <button type='submit'>Submit</button>
        </div>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SendProposalPage;
