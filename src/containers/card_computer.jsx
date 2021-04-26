import React, { Component } from 'react';
import { connect } from 'react-redux';

class ComputerCard extends Component {
  render () {
    return (
      <div>
        <h1>Foe</h1>
        <ul>
          <li>computer action : {this.props.computerAction}</li>
          <li>computer hp : {this.props.computerHP}</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    computerAction: state.computerAction,
    computerHP: state.computerHP
  };
}
export default connect(mapStateToProps, null)(ComputerCard);
