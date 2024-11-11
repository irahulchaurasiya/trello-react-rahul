import { configureStore } from '@reduxjs/toolkit';

import boardsReducer from '../redux/slices/boardsSlice';
import singleBoardReducer from './slices/singleBoardSlice';
import CardsSliceReducer from './slices/cardSlice';
import checkItemsReducer from './slices/checkItemsSlice';
import checklistReducer from './slices/checklistSlice';

export const store = configureStore({
  reducer: {
    boards : boardsReducer,
    singleBoard : singleBoardReducer,
    cards : CardsSliceReducer,
    checkItems : checkItemsReducer,
    checklists: checklistReducer,
  },
})