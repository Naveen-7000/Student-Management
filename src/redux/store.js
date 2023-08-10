import {configureStore} from '@reduxjs/toolkit';
import tokenSlice from './slice/tokenSlice';
import userSlice from './slice/userSlice';

const store = configureStore({
    reducer:{
        token:tokenSlice,
        user:userSlice,
    }
})

export default store;