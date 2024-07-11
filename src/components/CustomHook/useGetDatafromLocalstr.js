import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

function useGetDatafromLocalstr() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState([]);
  const userLogged = useSelector((state) => state.Auth.isUserLoggedIn);

  useEffect(() => {
    const checkLoggedUser = () => {
      const loggedUsers = localStorage.getItem('loggedUsers');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      setUserData(users);

      if (loggedUsers) {
        const user = JSON.parse(loggedUsers);
        const { role, email } = user.data;
        setUserRole(role);
        setUserEmail(email);
        setIsLoggedIn(true);

        const loggedInUser = users.find(user => user.email === email);
        setLoggedInUserData(loggedInUser);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserEmail(null);
        setLoggedInUserData(null);
      }
    };

    checkLoggedUser();
  }, [userLogged]);

  const removeLoggedUser = useCallback(() => {
    localStorage.removeItem('loggedUsers');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);
    setLoggedInUserData(null);
  }, []);

  const addUser = useCallback((newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === userEmail) {
        return { ...user, data: [...user.data, newUser] };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUserData(updatedUsers);
    setLoggedInUserData(updatedUsers.find(user => user.email === userEmail));
  }, [userEmail]);

  const removeUser = useCallback((email, id) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, data: user.data.filter(item => item.id !== id) };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUserData(updatedUsers);
    setLoggedInUserData(updatedUsers.find(user => user.email === userEmail));
  }, [userEmail]);

  const toggleJobStatus = useCallback((email, id) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        const updatedData = user.data.map(item => {
          if (item.id === id) {
            return { ...item, status: item.status === 'active' ? 'inactive' : 'active' };
          }
          return item;
        });
        return { ...user, data: updatedData };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUserData(updatedUsers);
    setLoggedInUserData(updatedUsers.find(user => user.email === userEmail));
  }, [userEmail]);

  const getLoggedInUserData = useCallback(() => {
    return loggedInUserData;
  }, [loggedInUserData]);

  return { isLoggedIn, userRole, userEmail, userData, removeLoggedUser, addUser, removeUser, toggleJobStatus, getLoggedInUserData };
}

export default useGetDatafromLocalstr;
