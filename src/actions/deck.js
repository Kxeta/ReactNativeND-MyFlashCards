import uuid from 'uuid';
import * as ActionTypes from '../util/actionTypes';
import * as API from '../api';


export const clearDecks = () => dispatch => {
  API.doomsdayClear().then(() => dispatch({
    type: "CLEAR"
  })
  );
}

export const fetchDecks = () => dispatch => {
  dispatch({
    type: ActionTypes.IS_LOADING,
    payload: true
  });
  API.getDecks().then(decks => {
    let newDecks = [];
    if (typeof decks === "object"){
      for(let key in decks){
        newDecks.push(decks[key]);
      }
    } else {
      newDecks = decks;
    }
    dispatch({
      type: ActionTypes.RECEIVE_DECKS,
      decks: newDecks
    })
    dispatch({
      type: ActionTypes.IS_LOADING,
      payload: false
      })
  }).catch(e => {
    console.log(e);
      dispatch({
      type: ActionTypes.IS_LOADING,
      payload: false
      })
    } 
  );
}

export const createDeck = (deckName) => dispatch => {
  const id = uuid.v1();
  const deck = {
    name: deckName,
    id
  }
  dispatch({
    type: ActionTypes.IS_LOADING,
    payload: true
  });
  API.saveDeck(deck).then(response => {
    dispatch({
      type: ActionTypes.CREATE_DECK,
      id: deck.id,
      name: deck.name
    });
    dispatch({
      type: ActionTypes.IS_LOADING,
      payload: false
      })
  }).catch(e => {
      dispatch({
      type: ActionTypes.IS_LOADING,
      payload: false
      })
    } 
  );
}