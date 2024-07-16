import { createSlice } from "@reduxjs/toolkit";
import { addProposalToUser, addUser, checkFreelancerApplicationStatus, filterHirersByTitle, getDataById, getFromLocalStorage, getUserDataByEmail, getUserProposalByEmail, getUsersWithRoleHirer, setInLocalStorage, setuserAppliedJobData, toggleJobStatus, updateAppliedJobStatus, updateProposalStatus } from "../utils/localStorageHelpers";
const initialState = {
    isUserLoggedIn: null,
    isUserRole: null,
    logedUserData: getFromLocalStorage('loggedUsers'),
    jobsData: getUsersWithRoleHirer(),
    addUserData: null,
    jobPostStatus: null,
    closeJobData: [],
    selectJob: null,
    proposal: null,
    appliedJobData: null,
    receivedProposal: [],
    userSearchedData: [],
    isApplied:false,

}

const userAuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        checkLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload
        },
        userLogout: (state, action) => {
            state.isUserLoggedIn = action.payload,
                state.logedUserData = action.payload,
                localStorage.removeItem("loggedUsers")
        },
        setUserRole: (state, action) => {
            state.isUserRole = action.payload
        },
        setUserData: (state, action) => {
            state.logedUserData = action.payload
            setInLocalStorage('loggedUsers', action.payload);
        },
        setAllHirerData: (state, action) => {
            state.jobsData = getUsersWithRoleHirer()
        },
        addUsersData: (state, action) => {
            state.addUserData = action.payload

            addUser(action.payload)
        },
        updateJobPoststatus: (state, action) => {
            state.jobPostStatus = action.payload
            toggleJobStatus(action.payload)
        },
        getUserLogedUserDataByEmail: (state, action) => {
            state.closeJobData = getUserDataByEmail(action.payload)
        },

        userSelectJob: (state, action) => {
            state.selectJob = action.payload
        },

        sendProposal: (state, action) => {

            state.proposal = addProposalToUser(action.payload)
        },

        getAppliedJobData: (state, action) => {
            state.appliedJobData = getUserDataByEmail(action.payload)
        },

        saveAppliedJobData: (state, action) => {
            state.appliedJobData = setuserAppliedJobData(action.payload)
        },
        getReceivedProposal: (state, action) => {
            state.receivedProposal = getUserProposalByEmail(action.payload)
        },
        getSearchedData: (state, action) => {
            state.userSearchedData = filterHirersByTitle(action.payload)
        },
        updateFreelancerProposalStatus: (state, action) => {
            let { email, id, status } = action.payload;
            updateAppliedJobStatus(email, id, status);
        },
        updateHirerProposalStatus: (state, action) => {
            let { hirerEmail, id, status } = action.payload;
            updateProposalStatus(hirerEmail, id, status);
        },
        fetchUserSelectedjob: (state, action) => {
            state.selectJob = getDataById(action.payload)
        },
        checkFreeLancerJobApplication: (state, action) => {
            const { email, id } = action.payload;
            state.isApplied = checkFreelancerApplicationStatus(email, id)
        }



    }
})


export const { checkLoggedIn, userLogout, setUserRole, setUserData, addUsersData, updateJobPoststatus,
    getUserLogedUserDataByEmail, userSelectJob, sendProposal, getAppliedJobData, saveAppliedJobData,
    getReceivedProposal, getSearchedData, updateFreelancerProposalStatus, updateHirerProposalStatus, fetchUserSelectedjob, checkFreeLancerJobApplication } = userAuthSlice.actions;

export default userAuthSlice.reducer;