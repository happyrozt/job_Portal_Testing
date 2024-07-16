export const doesUserEmailExist = (email) => {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  return existingUsers.some(user => user.email === email);
};

export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const setInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  export const getUsersWithRoleHirer = () => {
    const users =  getFromLocalStorage('users')
    return users;
  };


export const addUser = (newUser) => { 
  const userEmail = newUser.email;

  const users = getFromLocalStorage('users')
  const updatedUsers = users.map(user => {
    if (user.email === userEmail) {
      console.log({...user, data: [...user.data, newUser]})
      return { ...user, data: [...user.data, newUser] };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  
  return updatedUsers;
};

export const getUserDataByEmail = (email) => {
  const existingUsers =  getFromLocalStorage('users')
  let findData =  existingUsers.find(user => user.email === email);
  console.log(findData)
  return findData.data
};

export const getUserProposalByEmail = (email) => {
  const existingUsers =  getFromLocalStorage('users')
  let findData =  existingUsers.find(user => user.email === email);
  return findData.proposals

}


export const toggleJobStatus = (payload) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  let newStatus = null;

  const updatedUsers = users.map(user => {
    if (user.email === payload.email) {
      const updatedData = user.data.map(item => {
        if (item.id === payload.id) {
          newStatus = item.status === 'active' ? 'inactive' : 'active';
          return { ...item, status: newStatus };
        }
        return item;
      });
      return { ...user, data: updatedData };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return newStatus;
};

export const addProposalToUser = (payload) => {
  const { hirerEmail, proposalData } = payload;
  const users = getFromLocalStorage('users');
  const userIndex = users.findIndex(user => user.email === hirerEmail);

  if (userIndex !== -1) {
    if (!users[userIndex].proposals) {
      users[userIndex].proposals = [];
    }
    

    users[userIndex].proposals.push(proposalData);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  console.log("User not found for email:", hirerEmail);
  return false;
};

export const setuserAppliedJobData = (payload) => {
  const userEmail = payload.logUserEmail;
  let userAppliedJobData = payload.selectJob
  const users = getFromLocalStorage('users')
  const updatedUsers = users.map(user => {
    if (user.email === userEmail) {
     
      return { ...user, data: [...user.data, userAppliedJobData] };
    }
    return user;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  
  return updatedUsers;
}


export const filterHirersByTitle = (title) => {
  if (!title) {
    return [];
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const lowercasedTitle = title.toLowerCase();

  const filteredData = users
    .filter(user => user.role === 'Hirer')
    .flatMap(hirer => hirer.data.filter(item => 
      item.status === 'active' && item.title.toLowerCase().includes(lowercasedTitle)
    ));

  return filteredData;
};




  export const updateAppliedJobStatus = (email,id,newStatus) => {
   
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("helo",email)
    const updatedUsers = users.map(user => {
      if (user.email === email ) {
        const updatedData = user.data.map(item => {
           console.log(item,"id",id)
          if (item.id === id) {
            console.log(item,"items")
            return { ...item, status: newStatus };
          }
          return item;
        });
        return { ...user, data: updatedData };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true
  };



  export const updateProposalStatus = (hirerEmail, id, newStatus) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
   
    
    const updatedUsers = users.map(user => {
      if (user.email === hirerEmail && user.role === 'Hirer') {
        const updatedProposals = user.proposals.map(proposal => {
          if (proposal.id === id) {
            return { ...proposal, status: newStatus };
          }
          return proposal;
        });
        return { ...user, proposals: updatedProposals };
      }
      return user;
    });
  
 
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return true;
  };


 export  const getDataById = (id) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    for (const user of users) {
      if (user.data) {
        const dataItem = user.data.find(item => item.id === id);
        if (dataItem) {
          console.log(dataItem,"items")
          return dataItem;
        }
      }
    }
  
    return null; 
  };
  
 export const checkFreelancerApplicationStatus = (freelancerEmail, jobId) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const freelancer = users.find(user => user.email === freelancerEmail && user.role === 'Freelancer');
  if (freelancer) {
      const hasApplied = freelancer.data.some(item => item.id === jobId);
      if (hasApplied) {
        console.log("true")
          return true;
      } else {
        console.log("flase")
          return false;
      }
  } else {
      return 'Freelancer not found.';
  }
};

  
  
  
 

























