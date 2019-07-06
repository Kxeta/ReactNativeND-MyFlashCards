import * as ActionTypes from '../util/actionTypes';

const initialState = {
  isLoading: false,
  deckList: []
};

const decks = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.RECEIVE_DECKS: {
      return {
        ...state,
        deckList: [...action.decks]
      }
    }

    case ActionTypes.CREATE_DECK: {  
      return {
        ...state,
        deckList: [
          ...state.deckList,
          {
            id: action.id,
            name: action.name,
            cards: []
          }
        ]
      };
    }
    case ActionTypes.EDIT_DECK:      
      return {
        ...state,
        deckList: state.deckList.map( deck => {
          if(deck.id === action.id){
            return {
              id: action.id,
              name: action.name,
              cards: deck.cards
            }
          }
          return deck;
        })
      };
      case ActionTypes.EDIT_CARD:
      case ActionTypes.CREATE_CARD: 
        return {
          ...state,
          deckList: state.deckList.map( deck => {
            if(deck.id === action.deckId){
              return {
                ...deck,
                cards: [
                  ...deck.cards,
                  { ...action.card }
                ]
              }
            }
            return deck;
        })
      };
    case "CLEAR": 
      return initialState
    default:
      return state
  }
}

export default decks;