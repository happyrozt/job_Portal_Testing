import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn, setUserRole, setUserData, setSearchedData, userLogout } from '../../store/Slice';
import { useNavigate } from 'react-router-dom';
import { filterHirersByTitle } from '../../utils/localStorageHelpers';


export default function Header() {
    const {isUserRole,logedUserData} = useSelector((state)=>state.Auth)
    const [searchQuery, setSearchQuery] = useState('');
 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
       let searchJobByUser = filterHirersByTitle(query)
        dispatch(setSearchedData(searchJobByUser))
       
      };

    const handleLogout = () => {
        dispatch(userLogout(null))
        dispatch(setUserRole(null));
        localStorage.removeItem("loggedUsers")
        navigate("/");
    };

    useEffect(() => {
        if (logedUserData  && isUserRole == null) {
            dispatch(setUserRole(logedUserData.data.role));
        }
    }, [logedUserData , dispatch]);

    return (
        <div className='header-component'>
            <div className='nav-bar'>
                <div className='nav-liiks'>
                    <div className='company-name'>Zasya</div>
                    <a href='/'>Home</a>
                    {isUserRole === "Freelancer" && (
                        <>
                            <a href='/job_Portal_Testing/applyedjobs'>Applied Jobs</a>
                        </>
                    )}

                    {isUserRole === "Hirer" && (
                        <>
                            <a href='/job_Portal_Testing/createjobpost'>Create Job Post</a>
                            <a href='/job_Portal_Testing/proposals'>View Proposal</a>
                            <a href='/job_Portal_Testing/closejobpost'>Closed Jobs</a>
                        </>
                    )}
                </div>

                <div className='nav-buttons'>
                    <div className='search-input-div'>
                        <input
                            type="text"
                            placeholder='Search job'
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    {logedUserData === null  ? (
                        <>
                            <button className='register-button' onClick={handleNavigate}>Login</button>
                        </>
                    ) : (
                        <>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
