import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setPlayerAction, setComputerAction, setResult, updatedUses, setSelectedSpecial } from '../actions/index.js';

class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meleeActive: false,
      rangedActive: false,
      magicActive: false,
      visionActive: false
    };
  }

  renderActions = (playerAction) => {
    let actionClass = `btn${this.setActiveClass(playerAction)}`;
    return (
      <li key={playerAction}
          onClick={() => this.handleActionClick(playerAction)}

      >
        <button type="button" className={actionClass}>{playerAction}</button>
      </li>
    );
  }

  setActiveClass = (playerAction) => {
    if (this.state.meleeActive && playerAction === "Melee Attack") {
      return ' active'
    } else if (this.state.rangedActive && playerAction === "Ranged Attack") {
      return ' active'
    } else if (this.state.magicActive && playerAction === "Magic Attack") {
      return ' active'
    } else {
      return ''
    }
  }

  handleActionClick = (playerAction) => {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.setAttribute("disabled", "disabled");
    });

    this.props.setPlayerAction(playerAction);

    if (this.state.visionActive) {
      this.timeout = setTimeout(() => {
        this.computeResult(playerAction, this.props.computerAction)
      }, 1000);
    } else {
      if (this.props.selectedSpecial) this.decreaseUse(this.props.selectedSpecial);
      const computerAction = this.props.actions[Math.floor(Math.random() * this.props.actions.length)];
      this.props.setComputerAction(computerAction);
      this.timeout = setTimeout(() => {
        this.computeResult(playerAction, computerAction)
      }, 1000);
    }

    this.resetBoostStateToFalse();
    this.setState({visionActive: false})
  }

  decreaseUse = (special) => {
    special.uses--
    this.props.updatedUses(special.uses);
  }

  computeResult = (playerAction, computerAction) => {
    let result = null;

    if (playerAction === computerAction) {
      result = "Both sides suffer damages";
    } else if (playerAction === "Melee Attack" && computerAction === "Ranged Attack") {
      result = "You deal damage to your foe but suffer from his range attack";
    } else if (playerAction === "Ranged Attack" && computerAction === "Magic Attack")  {
      result = "You deal damage to your foe";
    } else if (playerAction === "Magic Attack" && computerAction === "Melee Attack") {
      result = "You deal heavy damage to your foe"
    } else if (computerAction === "Melee Attack" && playerAction === "Ranged Attack") {
      result = "The foe deals damage to you but suffer from your range attack";
    } else if (computerAction === "Ranged Attack" && playerAction === "Magic Attack") {
      result = "The foe deals damage to you";
    } else if (computerAction === "Magic Attack" && playerAction === "Melee Attack") {
      result = "The foe deals heavy damage to you";
    }

    this.props.setResult(result);
  }

  renderSpecials = (special) => {
    let specialClass = "btn";
    if (special.uses === 0) {
      specialClass += " inactive"
    }
    return (
      <div key={special.name}
           onClick={() => {
            if (special.uses > 0) this.handleSpecialClick(special)
           }
          }
      >
        <button type="button" className={specialClass}>{special.name} ({special.uses})</button>
      </div>
    );
  }

  handleSpecialClick = (special) => {
    this.props.setSelectedSpecial(special);

    this.resetBoostStateToFalse()
    const computerAction = this.props.actions[Math.floor(Math.random() * this.props.actions.length)];

    switch (special.name) {
      case "Vision":
        return (
          this.props.setComputerAction(computerAction),
          this.decreaseUse(special),
          this.setState({visionActive: true})
        )
      case "Melee Boost":
        return this.setState({
          meleeActive: !this.state.meleeActive
        })
      case "Ranged Boost":
        return this.setState({
          rangedActive: !this.state.rangedActive
        })
      case "Magic Boost":
        return this.setState({
          magicActive: !this.state.magicActive
        })
    }
  }

  resetBoostStateToFalse = () => {
    this.setState({
      meleeActive: false,
      rangedActive: false,
      magicActive: false
    });
  }

  render () {
    return (
      <div>
        <ul >
          {this.props.actions.map(this.renderActions)}
        </ul>
        <div>
          {this.props.specials.map(this.renderSpecials)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    specials: state.specials,
    selectedSpecial: state.selectedSpecial,
    computerAction: state.computerAction
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setPlayerAction: setPlayerAction,
      setComputerAction: setComputerAction,
      setResult: setResult,
      setSelectedSpecial: setSelectedSpecial,
      updatedUses: updatedUses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionList);
