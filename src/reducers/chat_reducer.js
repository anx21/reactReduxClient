import { CHAT_ERROR } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CHAT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
