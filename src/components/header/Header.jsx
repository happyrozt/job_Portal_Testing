import React, { useEffect } from 'react';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn, setUserRole } from '../../store/Slice';
import { useNavigate } from 'react-router-dom';
import useGetDatafromLocalstr from '../CustomHook/useGetDatafromLocalstr';

export default function Header() {
    const userLogged = useSelector((state) => state.Auth.isUserLoggedIn);
    const checkUserRole = useSelector((state) => state.Auth.isUserRole);
    const { isLoggedIn, userRole, removeLoggedUser } = useGetDatafromLocalstr();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        removeLoggedUser();
        dispatch(checkLoggedIn(null));
        dispatch(setUserRole(null));
        navigate("/");
    };

    useEffect(() => {
        if (isLoggedIn !== null && userRole !== null) {
            dispatch(checkLoggedIn(isLoggedIn));
            dispatch(setUserRole(userRole));
        }

    }, [isLoggedIn, dispatch, userLogged]);

    return (
        <div className='header-component'>
            <div className='nav-bar'>
                <div className='nav-liiks'>
                    <div className='company-name'>Zasya</div>
                    <a href='/'>Home</a>
                    {checkUserRole === "Freelancer" && (
                        <>
                            <a href='#applied-jobs'>Applied Jobs</a>
                        </>
                    )}

                    {checkUserRole === "Hirer" && (
                        <>
                            <a href='/createjobpost'>Create Job Post</a>
                            <a href='#view-proposal'>View Proposal</a>
                            <a href='/closejobpost'>Closed Jobs</a>
                        </>
                    )}
                </div>

                <div className='nav-buttons'>
                    <div className='search-input-div'>
                        <input type="text" placeholder='search job' />
                    </div>
                    {userLogged === null ? (
                        <>
                            <button className='register-button' onClick={handleNavigate}>Login</button>
                            {/* <button className='register-button' onClick={handleNavigate}>Register</button> */}
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
