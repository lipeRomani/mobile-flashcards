import { GET_DECKS, ADD_CARD, ADD_DECK } from '../actions';

function decks(state = {}, action) {
  const { type, decks, deck, card } = action;

  switch (type) {
    case GET_DECKS:
      return {
        ...state,
        ...decks
      };
    case ADD_CARD:
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            card
          ]
        }
      };
    case ADD_DECK:
      return {
        ...state,
        [deck]: {
          title: deck,
          questions: []
        }
      };
    default:
      return state;
  }
}

export default decks;
