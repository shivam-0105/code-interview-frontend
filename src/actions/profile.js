import axios from 'axios';
import { setAlert } from './alert';

import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE , GET_PROFILES , PROFILE_ERROR , UPDATE_PROFILE , GET_REPOS } from './types';

// Get current user profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CLEAR_PROFILE
        });
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });

    try {
        const res = await axios.get('/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }
};

// Get profile by id
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }
};

// Get github repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }
};

// Create or update profile 
export const createProfile = (formData , history , edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/profile' , formData , config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated successfully' : 'Profile Created successfully' , 'success'));

        if ( !edit ) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors ) {
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }
};

// Add experience 
export const addExperience = (formData , history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/profile/experience' , formData , config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added successfully :)' , 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors ) {
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }   
}

// Add education 
export const addEducation = (formData , history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/profile/education' , formData , config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added successfully :)' , 'success'));

        history.push('/dashboard');
        
    } catch (err) {
        const errors = err.response.data.errors;

        if ( errors ) {
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        })
    }   
}

// Delete experience 
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed successfully ;)' , 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        });  
    }
}

// Delete education 
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed successfully ;)' , 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.respone.statusText , status: err.response.status }
        });  
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if ( window.confirm('Are you sure ? This action can NOT be undone :(') ){
        try {
            await axios.delete('/profile');

            dispatch({
                type: CLEAR_PROFILE
            });

            dispatch({
                type: DELETE_ACCOUNT
            });

            dispatch(setAlert('Your account has been deleted successfully' , 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.respone.statusText , status: err.response.status }
            });
        }
    }
}