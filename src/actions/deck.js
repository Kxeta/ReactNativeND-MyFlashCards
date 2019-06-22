import uuid from 'uuid';
import * as ActionTypes from '../util/actionTypes';
import * as API from '../api';

export const fetchDecks = () => dispatch => {
  dispatch({
    type: ActionTypes.IS_LOADING,
    payload: true
  });
  API.getDecks().then(decks => {
    dispatch({
      type: ActionTypes.RECEIVE_DECKS,
      decks
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
  API.saveDeck(deck).then(() => {
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