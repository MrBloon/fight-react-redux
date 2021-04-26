import { UPDATE_COMPUTER_HP } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_COMPUTER_HP:
      return action.payload
    default:
      return state;
  }
}
