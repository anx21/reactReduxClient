import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        This is a feature {this.props.message}
      </div>
    );
  }
}

Feature.propTypes = {
  message: React.PropTypes.string,
  fetchMessage: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(Feature);
