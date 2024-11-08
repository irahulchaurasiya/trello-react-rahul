import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    lists: [],
    loading: false,
    isAddingList: false,
    listName: '',
    singleBoardName : '',
};

const singleBoardSlice = createSlice ({
    name : 'singleBoard',
    initialState,
    reducers : {
        setLists: (state , action) => {
            state.lists = action.payload;
        },
        setListName: (state, action) => {
            state.listName = action.payload;
        },
        setIsAddingList: (state, action) => {
            state.isAddingList = action.payload;
        },
        addList: (state, action) => {
            state.lists.push(action.payload);
        },
        deleteList: (state, action) => {
            state.lists = state.lists.filter((list) => list.id !== action.payload);
        },
        setSingleBoardName: (state , action) => {
          state.singleBoardName = action.payload;  
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const {setLists, addList, deleteList, setLoading, setIsAddingList, setListName, setSingleBoardName } = singleBoardSlice.actions;

export default singleBoardSlice.reducer;