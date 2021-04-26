import { SET_SELECTED_SPECIAL } from '../actions';
import { RESET_STATE } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case SET_SELECTED_SPECIAL:
      return action.payload;
    case RESET_STATE:
      return state = null;
    default:
      return state;
  }
}
