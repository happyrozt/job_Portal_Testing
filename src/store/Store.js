

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice';

const Store =  configureStore({
    reducer: {
        Auth: authReducer
    }
});
 

export default Store ;