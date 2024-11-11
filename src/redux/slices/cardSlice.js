import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCards : {},
    loading : {},
    isAddingCard : {},
    cardName: {},
}

const CardsSlice = createSlice({
    name : 'cards',
    initialState,
    reducers : {
        setCards : (state, action) => {
            const {listId , cards} = action.payload
            state.listCards[listId] = cards;
            state.loading[listId] = false;
        },
        addCard : (state, action) => {
            const { listId, card } = action.payload;
            state.listCards[listId].push(card);
        },
        setIsAddingCard : (state, action) => {
            const { listId , isAdding} = action.payload;
            state.isAddingCard[listId] = isAdding;
        },
        setCardName : (state, action) => {
            const { listId, cardName} = action.payload;
            state.cardName[listId] = cardName;
        },
        deleteCard : (state, action) => {
            const { listId, cardId } = action.payload;
            state.listCards[listId] = state.listCards[listId].filter(
              (card) => card.id !== cardId
            );
        },
        setLoading : (state, action) => {
            const {listId , loading} = action.payload;
            state.loading[listId] = loading;
        }
    },
});

export const {setCards, addCard, setCardName , setIsAddingCard, deleteCard, setLoading} = CardsSlice.actions;

export default CardsSlice.reducer;