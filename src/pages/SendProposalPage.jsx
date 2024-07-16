import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetDatafromLocalstr from '../components/CustomHook/useGetDatafromLocalstr';
import { addUsersData, fetchUserSelectedjob, saveAppliedJobData, sendProposal } from '../store/Slice';

function SendProposalPage() {
  const { id } = useParams();
  const selectJob = useSelector((state) => state.Auth.selectJob);
  const logUserEmail = useSelector((state) => state.Auth.logedUserData).data.email;
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
    setResumeFile(file);
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

    const hirerEmail = selectJob.email;
    const proposalData = {
      name,
      education,
      experience,
      resume: resumeFile.name,
      personalInfo: proposal.personalInfo,
      appledFor: selectJob.title,
      status: "Panding",
      id: selectJob.id,
      email: logUserEmail
    };
    let payload = { hirerEmail, proposalData }

    dispatch(sendProposal(payload))
    let appliedPayload = { logUserEmail, selectJob }
    dispatch(saveAppliedJobData(appliedPayload))
    setFormData({
      name: "",
      education: "",
      experience: "",
      error: ""
    });
    setProposal({ resume: '', personalInfo: '' });
    setResumeFile(null);
    navigate('/applyedjobs');
    console.log('Proposal submitted:', formData);
  };
  useEffect(() => {
    if (!selectJob && id) {
        dispatch(fetchUserSelectedjob(id));
    }
}, [dispatch, id, selectJob]);

if (!selectJob) {
    return <div>No job details available. Please go back to the job listings.</div>;
}

  const { name, education, experience, error } = formData;

  return (
    <div className='send-proposal-page'>
      <p className='proposal-title'>Apply for {selectJob.title}</p>
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
