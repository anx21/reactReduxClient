import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class ResetPassword extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearError();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    const token = this.props.params.token_id;
    this.props.resetPasswordEnd({ password: formProps.password, token });
    setTimeout(() => { this.context.router.push('/'); }, 2000);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      );
    }
    return null;
  }

  renderResetAlert() {
    if (this.props.resetMessage) {
      return (
        <div className="alert alert-success">
          {this.props.resetMessage}
        </div>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, fields: { password, passwordConfirm } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          {
            passwordConfirm.touched &&
            passwordConfirm.error &&
              <div className="error">
                {passwordConfirm.error}
              </div>
          }
        </fieldset>
        {this.renderAlert()}
        {this.renderResetAlert()}
        <button action="submit" className="btn btn-primary">Reset Password</button>
      </form>
    );
  }
}

ResetPassword.propTypes = {
  handleSubmit: React.PropTypes.func,
  params: React.PropTypes.object,
  fields: React.PropTypes.object,
  resetPasswordEnd: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  resetMessage: React.PropTypes.string,
  clearError: React.PropTypes.func,
};

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    resetMessage: state.auth.resetMessage,
  };
}

export default reduxForm({
  form: 'resetPassword',
  fields: ['password', 'passwordConfirm'],
  validate,
}, mapStateToProps, actions)(ResetPassword);
