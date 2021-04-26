import { UPDATE_USES } from '../actions';
import { UPDATE_ACTIVE } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_USES:
      const copiedState = state.slice(0);
      return copiedState
    default:
      return state;
  }
}
