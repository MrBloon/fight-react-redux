import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resetState, updatePlayerHP, updateComputerHP } from '../actions/index.js';

class Result extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.result !== nextProps.result;
  }

  componentDidUpdate() {
    if (this.props.result) {
      this.timeout = setTimeout(() => {
        this.computePlayerHP();
        this.computeComputerHP();
      }, 1000);
    }
  }

  handleClick = (event) => {
    this.props.resetState();
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.removeAttribute("disabled");
    });
  }

  computePlayerHP = () => {
    const result = this.props.result;
    let playerHP = this.props.playerHP

    if (result === "Both sides suffer damages") {
      playerHP--
    } else if (result === "You deal damage to your foe but suffer from his range attack") {
      playerHP--
    } else if (result === "The foe deals damage to you but suffer from your range attack") {
      playerHP = playerHP - 2
    } else if (result === "The foe deals damage to you") {
      playerHP = playerHP - 2
    } else if (result === "The foe deals heavy damage to you") {
      playerHP = playerHP - 3
    }

    this.props.updatePlayerHP(playerHP);
  }

  computeComputerHP = () => {
    const result = this.props.result;
    let computerHP = this.props.computerHP;
    let boost = 0

    if (this.props.selectedSpecial && this.props.selectedSpecial.name.includes("Boost")) {
      boost = this.props.selectedSpecial.boost;
    }

    if (result === "Both sides suffer damages") {
      computerHP = computerHP - (1 + boost)
    } else if (result === "The foe deals damage to you but suffer from your range attack") {
      computerHP = computerHP - (1 + boost)
    } else if (result === "You deal damage to your foe but suffer from his range attack") {
      computerHP = computerHP - (2 + boost)
    } else if (result === "You deal damage to your foe") {
      computerHP = computerHP - (2 + boost)
    } else if (result === "You deal heavy damage to your foe") {
      computerHP = computerHP - (3 + boost)
    }

    this.props.updateComputerHP(computerHP);
  }

  render () {
    return (
      <div>
        <div>result : {this.props.result} </div>
        <button onClick={this.handleClick}>continue</button>
        <button>defeat</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.result,
    playerHP: state.playerHP,
    computerHP: state.computerHP,
    selectedSpecial: state.selectedSpecial
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { resetState: resetState,
      updatePlayerHP: updatePlayerHP,
      updateComputerHP: updateComputerHP
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
