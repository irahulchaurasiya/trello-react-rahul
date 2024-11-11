import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkItemsByChecklist: {},
  loading: false,
  checkItemName: '',
  isAddingItem: false, 
};

const checkItemsSlice = createSlice({
  name: 'checkItems',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCheckItems: (state, action) => {
      const { checklistId, checkItems } = action.payload;
      state.checkItemsByChecklist[checklistId] = checkItems;
    },
    addCheckItem: (state, action) => {
      const { checklistId, checkItem } = action.payload;
      if (!state.checkItemsByChecklist[checklistId]) {
        state.checkItemsByChecklist[checklistId] = [];
      }
      state.checkItemsByChecklist[checklistId].push(checkItem);
    },
    deleteCheckItem: (state, action) => {
      const { checklistId, checkItemId } = action.payload;
      state.checkItemsByChecklist[checklistId] = state.checkItemsByChecklist[
        checklistId
      ].filter((checkItem) => checkItem.id !== checkItemId);
    },
    updateCheckItemState: (state, action) => {
      const { checklistId, checkItemId, state: updatedState } = action.payload;
      const checkItems = state.checkItemsByChecklist[checklistId];
      if (checkItems) {
        const index = checkItems.findIndex(
          (checkItem) => checkItem.id === checkItemId
        );
        if (index !== -1) {
          checkItems[index].state = updatedState;
        }
      }
    },
    setCheckItemName: (state, action) => {
      state.checkItemName = action.payload;
    },
    setIsAddingItem: (state) => {
      state.isAddingItem = !state.isAddingItem;
    },
  },
});

export const {
  setLoading,
  setCheckItems,
  addCheckItem,
  deleteCheckItem,
  updateCheckItemState,
  setCheckItemName,
  setIsAddingItem,
} = checkItemsSlice.actions;

export default checkItemsSlice.reducer;
