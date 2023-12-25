import { configureStore } from '@reduxjs/toolkit';
import { createWrapper} from 'next-redux-wrapper';
import productsReducer from '../redux/slices/productsSlice';
import usersReducer from '../redux/slices/usersSlice';

const store = configureStore({
  reducer: {
    products: productsReducer, 
    users : usersReducer
  },
});


const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
