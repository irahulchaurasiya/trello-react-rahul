import { configureStore } from '@reduxjs/toolkit';

import boardsReducer from '../redux/slices/boardsSlice';
import singleBoardReducer from './slices/singleBoardSlice';
import CardsSliceReducer from './slices/CardSlice';

export const store = configureStore({
  reducer: {
    boards : boardsReducer,
    singleBoard : singleBoardReducer,
    cards : CardsSliceReducer,
  },
})