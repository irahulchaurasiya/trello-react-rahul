import { configureStore } from '@reduxjs/toolkit';

import boardsReducer from '../redux/slices/boardsSlice';
import singleBoardReducer from './slices/singleBoardSlice';

export const store = configureStore({
  reducer: {
    boards : boardsReducer,
    singleBoard : singleBoardReducer,
  },
})