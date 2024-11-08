import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards : [],
    loading : false,
    isAddingCard : false,
    cardName: '',
}

const CardsSlice = createSlice({
    name : 'cards',
    initialState,
    reducers : {
        setCards : (state, action) => {
            state.cards = action.payload;
        },
        addCard : (state, action) => {
            state.cards.push(action.payload);
        },
        setIsAddingCard : (state, action) => {
            state.isAddingCard = action.payload;
        },
        setCardName : (state, action) => {
            state.cardName = action.payload;
        },
        deleteCard : (state, action) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const {setCards, addCard, setCardName , setIsAddingCard, deleteCard, setLoading} = CardsSlice.actions;

export default CardsSlice.reducer;