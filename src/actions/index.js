export const SET_PLAYER_ACTION = 'SET_PLAYER_ACTION';
export const SET_COMPUTER_ACTION = 'SET_COMPUTER_ACTION';
export const SET_RESULT = 'SET_RESULT';
export const RESET_STATE = 'RESET_STATE';
export const UPDATE_PLAYER_HP = 'UPDATE_PLAYER_HP';
export const UPDATE_COMPUTER_HP = 'UPDATE_COMPUTER_HP';
export const UPDATE_USES = 'UPDATE_USES';
export const UPDATE_ACTIVE = 'UPDATE_ACTIVE';
export const SET_SELECTED_SPECIAL = 'SET_SELECTED_SPECIAL';

export function setPlayerAction(playerAction) {
  return {
    type: SET_PLAYER_ACTION,
    payload: playerAction
  };
}

export function setComputerAction(computerAction) {
  return {
    type: SET_COMPUTER_ACTION,
    payload: computerAction
  };
}

export function setResult(result) {
  return {
    type: SET_RESULT,
    payload: result
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function updatePlayerHP(playerHP) {
  return {
    type: UPDATE_PLAYER_HP,
    payload: playerHP
  };
}

export function updateComputerHP(computerHP) {
  return {
    type: UPDATE_COMPUTER_HP,
    payload: computerHP
  };
}

export function updatedUses(uses) {
  return {
    type: UPDATE_USES,
    payload: uses
  };
}

export function setSelectedSpecial(special) {
  return {
    type: SET_SELECTED_SPECIAL,
    payload: special
  };
}

