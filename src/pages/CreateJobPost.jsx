import React, { useState } from 'react';
import "../App.css";
import Input from '../components/input/Input';
import useGetDataFromLocalStr from '../components/CustomHook/useGetDatafromLocalstr';

function CreateJobPost() {
  const { addUser,userEmail } = useGetDataFromLocalStr();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    industry: '',
    skill: '',
    location: '',
    workMode: '',
    description: '',
    selry: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    companyName: '',
    industry: '',
    skill: '',
    location: '',
    workMode: '',
    description: '',
    selry: '',
  });

  const clearState = ()=>{
    setFormData({
      title: '',
      companyName: '',
      industry: '',
      skill: '',
      location: '',
      workMode: '',
      description: '',
      selry: '',
    })
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setErrors({
      ...errors,
      [fieldName]: value ? '' : `${fieldName} is required.`,
    });
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `${key} is required.`;
        formIsValid = false;
      }
    }

    setErrors(newErrors);
    if (formIsValid) {
      const newData = {
        ...formData,
        id: generateRandomId(), 
        email:userEmail,
        status:"active"
      };
      console.log("Form submitted:", newData);
      addUser(newData);
      clearState()
    }
  };

  const inputFields = [
    { label: 'Title', type: 'text', placeholder: 'Title', name: 'title' },
    { label: 'Company Name', type: 'text', placeholder: 'Company Name', name: 'companyName' },
    { label: 'Industry', type: 'text', placeholder: 'Industry', name: 'industry' },
    { label: 'Skill', type: 'text', placeholder: 'Skill', name: 'skill' },
    { label: 'Location', type: 'text', placeholder: 'Location', name: 'location' },
    { label: 'Work Mode', type: 'text', placeholder: 'Work Mode', name: 'workMode' },
    { label: 'Description', type: 'text', placeholder: 'Description', name: 'description' },
    { label: 'Selry', type: 'text', placeholder: 'Requirements', name: 'selry' },
  ];

  return (
    <div className='create-post-container'>
      <form onSubmit={handleSubmit}>
        <div className='create-post-form'>
          {inputFields.map((field, index) => (
            <div key={index} className="form-field">
              <Input
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(e, field.name)}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>

        <div className='create-post-button'>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreateJobPost;
