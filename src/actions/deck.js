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