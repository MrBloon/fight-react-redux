import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerCard extends Component {
  render () {
    return (
      <div>
        <h1>Card Player</h1>
        <ul>
          <li>player action : {this.props.playerAction}</li>
          <li>player hp : {this.props.playerHP}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playerAction: state.playerAction,
    playerHP: state.playerHP
  };
}
export default connect(mapStateToProps, null)(PlayerCard);
