import uuid from 'uuid';
import * as ActionTypes from '../util/actionTypes';
import * as API from '../api';

export const addCard = (deckId, question, answer) => dispatch => {
  dispatch({
    type: ActionTypes.IS_LOADING,
    payload: true
  });
  const id = uuid.v1();
  const card = {
    id,
    question,
    answer
  }
  API.saveCard(deckId, card);
  dispatch({
    type: ActionTypes.CREATE_CARD,
    deckId,
    card
  })
  .then(() => {
    dispatch({
      type: IS_LOADING,
      payload: false,
    });
  });
  return card;
}