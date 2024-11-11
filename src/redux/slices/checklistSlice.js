import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checklistsByCard: {}, 
  checklistName: '',
  loading: false,
};

const checklistSlice = createSlice({
  name: 'checklists',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChecklists: (state, action) => {
      const { cardId, checklists } = action.payload;
      state.checklistsByCard[cardId] = checklists;  
    },
    addCheckList: (state, action) => {
      const { cardId, checklist } = action.payload;
      if (!state.checklistsByCard[cardId]) {
        state.checklistsByCard[cardId] = [];
      }
      state.checklistsByCard[cardId].push(checklist);
    },
    deleteCheckList: (state, action) => {
      const { cardId, checklistId } = action.payload;
      state.checklistsByCard[cardId] = state.checklistsByCard[cardId].filter(
        (checklist) => checklist.id !== checklistId
      );
    },
    setCheckListName: (state, action) => {
      state.checklistName = action.payload;
    },
  },
});

export const {
  setLoading,
  setChecklists,
  addCheckList,
  deleteCheckList,
  setCheckListName,
} = checklistSlice.actions;

export default checklistSlice.reducer;
