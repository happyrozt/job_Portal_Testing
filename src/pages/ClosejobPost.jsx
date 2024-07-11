import React, { useEffect, useState } from 'react';
import useGetDatafromLocalstr from '../components/CustomHook/useGetDatafromLocalstr';


function ClosejobPost() {
    const { getLoggedInUserData,toggleJobStatus } = useGetDatafromLocalstr();
    const [logedUserData, setLogedUserData] = useState([]);

   
    useEffect(() => {
        const fetchLoggedInUserData = async () => {
            const data = await getLoggedInUserData();
            if (data && data.data) {
                setLogedUserData(data.data);
                
            }
        };
        fetchLoggedInUserData();
    }, [getLoggedInUserData]);

    const handleModal = (id,email) => {
        toggleJobStatus(email,id)
        getLoggedInUserData
    }


    return (
        <div className='home-page-container'>
            <div className='job-list'>
                {logedUserData.length > 0 ? (
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
                            <button  onClick={(e) => handleModal(job.id,job.email)}>
                                Close Post
                            </button>
                        
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
