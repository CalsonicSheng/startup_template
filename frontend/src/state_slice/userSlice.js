import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signInWithEandP = createAsyncThunk('user/signInWithEandP', async function (signInInput, { rejectWithValue }) {
  try {
    const response = await axios.post('/user/signin', { email: signInInput.email, password: signInInput.password });
    localStorage.setItem('userLocalState', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signUpWithEandP = createAsyncThunk('user/signUpWithEandP', async function (signUpInput, { rejectWithValue }) {
  try {
    const response = await axios.post('/user/signup', { email: signUpInput.email, password: signUpInput.password, username: signUpInput.username });
    localStorage.setItem('userLocalState', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUserProfileProtectedRoute = createAsyncThunk('user/getProfileProtectedRoute', async function (input, { rejectWithValue }) {
  try {
    const response = await axios.get('/user/profile', { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userLocalState')).token}` } });
    return response.data;
  } catch (error) {
    localStorage.removeItem('userLocalState');
    return rejectWithValue(error.response.data);
  }
});

export const updateUserProfileInfoProtectedRoute = createAsyncThunk('user/updateProfileInfo', async function (input, { rejectWithValue }) {
  try {
    const response = await axios.put('/user/profile', input, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userLocalState')).token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userInitialValue = {
  isloading: false,
  userState: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('userLocalState') ? { isloading: false, userState: { authSuccess: JSON.parse(localStorage.getItem('userLocalState')) } } : userInitialValue,
  reducers: {
    userStateReset(state, action) {
      state.userState = {};
      state.isloading = false;
    },
    userLogOut(state, action) {
      localStorage.removeItem('userLocalState');
      state.userState = {};
      state.isloading = false;
    },
  },

  // it is important to realize that each async function will ALL BE END UP IN either "authSuccess" or "authFail" eventually (we will use authSuccess and authFail for most frontend logic)
  // ALL different async functions when call in different component will all eventually update the "userState" here
  // the actual response object for the either "authSuccess" or "authFail" state will DIFFERENT BASED ON DIFFERENT ASYNC FUNCTION

  extraReducers: {
    [signUpWithEandP.fulfilled]: (state, action) => {
      state.userState = { authSuccess: action.payload };
    },
    [signUpWithEandP.rejected]: (state, action) => {
      state.userState = { authFail: action.payload };
    },

    //----------------------------------------------------------

    [signInWithEandP.fulfilled]: (state, action) => {
      state.userState = { authSuccess: action.payload };
    },
    [signInWithEandP.rejected]: (state, action) => {
      state.userState = { authFail: action.payload };
    },

    //----------------------------------------------------------

    [getUserProfileProtectedRoute.pending]: (state, action) => {
      state.isloading = true;
    },
    [getUserProfileProtectedRoute.fulfilled]: (state, action) => {
      state.isloading = false;
      state.userState = { authSuccess: action.payload };
    },
    [getUserProfileProtectedRoute.rejected]: (state, action) => {
      state.isloading = false;
      state.userState = { authFail: action.payload };
    },

    //----------------------------------------------------------

    // the failure case for the profile update process will just simply fallback / reset to the original data (it is still under the "authSuccess" case)

    [updateUserProfileInfoProtectedRoute.fulfilled]: (state, action) => {
      state.isloading = false;
      state.userState = { authSuccess: action.payload };
    },
    [updateUserProfileInfoProtectedRoute.rejected]: (state, action) => {
      state.isloading = false;
      state.userState = { authSuccess: action.payload };
    },
  },
});

// this will be further used under the configure store to convert slice into traditional reducer format
export default userSlice;
export const userSliceActions = userSlice.actions;
