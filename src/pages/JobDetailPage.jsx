import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSelectedjob } from '../store/Slice';
function JobDetailPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const selectJob = useSelector((state)=>state.Auth.selectJob)
    const isApplied = useSelector((state)=>state.Auth.isApplied)
    const handleApply = () => {
        if(isApplied=== false){
            navigate(`/proposal/${id}`);
        }else{
            alert('You have already applied for this job.');
        }
       
    };

    useEffect(() => {
        if (!selectJob && id) {
            dispatch(fetchUserSelectedjob(id));
        }
    }, [dispatch, id, selectJob]);

    if (!selectJob) {
        return <div>No job details available. Please go back to the job listings.</div>;
    }

    return (
        <div className='job-detail-page'>
            <div className='job-deatil-conatiner'>

                <p className='job-description'>{selectJob.description}</p>
                <p className='apply-company-name'>{selectJob.companyName}</p>
                <p className='job-title'>{selectJob.title}</p>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <RiMoneyRupeeCircleFill className='ruppe-icon' />
                    <p> {selectJob.selry}</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <MdWorkOutline className='ruppe-icon' />
                    <p> {selectJob.workMode}</p>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <IoLocationOutline className='ruppe-icon' />
                    <p> {selectJob.location}</p>
                </div>
                <p>Skill: {selectJob.skill}</p>
                <div className='job-apply-button'>
                    <button onClick={handleApply}>Apply</button>
                </div>

            </div>

        </div>
    );
}

export default JobDetailPage;
