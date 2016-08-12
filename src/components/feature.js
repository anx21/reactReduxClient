import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class Feature extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.debugSocket();
    this.props.fetchMessage();
  }

  handleFormSubmit({ message }) {
    // Call action creator to sign up the user
    this.props.createMessage(message);
  }

  renderAlert() {
    if (this.props.chatErrorMessage) {
      return (
        <div className="alert alert-danger">{this.props.chatErrorMessage}</div>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, fields: { message } } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className="form-group">
            <input className="form-control" {...message} />
            {message.touched && message.error && <div className="error">{message.error}</div>}
          </fieldset>
          {this.renderAlert()}
        </form>
        This is a feature {this.props.message}
      </div>
    );
  }
}

Feature.propTypes = {
  message: React.PropTypes.string,
  fields: React.PropTypes.object,
  fetchMessage: React.PropTypes.func,
  chatErrorMessage: React.PropTypes.func,
  debugSocket: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    chatErrorMessage: state.chat.error,
  };
}

export default reduxForm({
  form: 'message',
  fields: ['message'],
  validate,
}, mapStateToProps, actions)(Feature);
