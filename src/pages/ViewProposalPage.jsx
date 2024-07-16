import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReceivedProposal, updateFreelancerProposalStatus, updateHirerProposalStatus } from '../store/Slice';
import "../App.css";

function ViewProposalPage() {
  const userEmail = useSelector((state) => state.Auth.logedUserData);
  const receivedProposal = useSelector((state) => state.Auth.receivedProposal);
  const [logedUserData, setLogedUserData] = useState([]);
  const dispatch = useDispatch();
  const hirerEmail = userEmail.data.email;

  useEffect(() => {
    dispatch(getReceivedProposal(userEmail.data.email));
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (receivedProposal) {
      const activeProposals = receivedProposal.filter(proposal => proposal.status !== 'rejected');
      setLogedUserData(activeProposals);
    }
  }, [receivedProposal]);

  const handleUpdateStatus = (id, email, hirerEmail, newStatus) => {
    dispatch(updateFreelancerProposalStatus({ email, id, status: newStatus }));
    dispatch(updateHirerProposalStatus({ hirerEmail, id, status: newStatus }));
    dispatch(getReceivedProposal(userEmail.data.email));
    alert(`Proposal ${newStatus}`);
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {logedUserData && logedUserData.length > 0 ? (
          logedUserData.map((proposal, index) => (
            <div key={index} className='job-item'>
              <h2>Applied for {proposal.appledFor}</h2>
              <p>Name: {proposal.name}</p>
              <p>Education: {proposal.education}</p>
              <p>Experience: {proposal.experience}</p>
              <p>Email: {proposal.email}</p>
              <p>Status: {proposal.status}</p>
              <div className='praposal-buttons'>
                <button className='accept-button' onClick={() => handleUpdateStatus(proposal.id, proposal.email, hirerEmail, 'accepted')}>
                  Accept
                </button>
                <button className='reject-button'  onClick={() => handleUpdateStatus(proposal.id, proposal.email, hirerEmail, 'rejected')}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No job proposals for Hirers.</p>
        )}
      </div>
    </div>
  );
}

export default ViewProposalPage;
