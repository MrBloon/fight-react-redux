import { UPDATE_PLAYER_HP } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_PLAYER_HP:
      return action.payload
    default:
      return state;
  }
}
