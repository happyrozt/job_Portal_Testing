import React from 'react'

export default function JobListingCard({jobsAData,handleClick }) {
  return (
    <div className='home-page-container'>
        <div className='job-list'>
          {jobsAData.length > 0 ? (
            jobsAData.map((job, index) => (
              <div key={index} className='job-item' onClick={() => handleClick(job)}>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <p>Industry: {job.industry}</p>
                <p>Location: {job.location}</p>
                <p>Work Mode: {job.workMode}</p>
                <p>Skill: {job.skill}</p>
                <p>Salary: {job.selry}</p>   
              </div>
            ))
          ) : (
            <p>No jobs available .</p>
          )}
        </div>
      </div>
  )
}
