import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn, setUserRole, setUserData, getSearchedData, userLogout } from '../../store/Slice';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const checkUserRole = useSelector((state) => state.Auth.isUserRole);
    const checkUserLogged = useSelector((state) => state.Auth.logedUserData)
    const logedUserData = useSelector((state)=>state.Auth.logedUserData)
    const isUserRole = useSelector((state)=>state.Auth.isUserRole)
    const isUserLoggedIn = useSelector((state)=>state.Auth.isUserLoggedIn)
    const [searchQuery, setSearchQuery] = useState('');
 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        dispatch(getSearchedData(query))
       
      };

    const handleLogout = () => {
        dispatch(userLogout(null))
        dispatch(setUserRole(null));
        navigate("/");
    };

    useEffect(() => {
        
        if (logedUserData  && isUserRole == null) {
            dispatch(setUserRole(logedUserData.data.role));
        }
    }, [logedUserData , dispatch, checkUserLogged,isUserLoggedIn]);

    return (
        <div className='header-component'>
            <div className='nav-bar'>
                <div className='nav-liiks'>
                    <div className='company-name'>Zasya</div>
                    <a href='/'>Home</a>
                    {checkUserRole === "Freelancer" && (
                        <>
                            <a href='/applyedjobs'>Applied Jobs</a>
                        </>
                    )}

                    {checkUserRole === "Hirer" && (
                        <>
                            <a href='/createjobpost'>Create Job Post</a>
                            <a href='/proposals'>View Proposal</a>
                            <a href='/closejobpost'>Closed Jobs</a>
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
