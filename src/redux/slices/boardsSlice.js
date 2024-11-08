import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boards: [],
    loading : false,
    boardName: '',
}

const boardsSlice = createSlice ({
    name : "boards",
    initialState,
    reducers : {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        addBoards: (state, action) => {
            state.boards.push(action.payload);
        },
        setBoardName : (state, action) => {
            state.boardName = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
})

export const {setBoards , addBoards , setLoading, setBoardName} = boardsSlice.actions;

export default boardsSlice.reducer;