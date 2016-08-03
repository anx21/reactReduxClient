import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class ResetPasswordInit extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearError();
  }

  handleFormSubmit({ email }) {
    this.props.resetPasswordInitiate({ email });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
    return null;
  }

  renderEmailAlert() {
    if (this.props.emailMessage) {
      return (
        <div className="alert alert-success">
          <strong>Success!</strong> {this.props.emailMessage}
        </div>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, fields: { email } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        {this.renderAlert()}
        {this.renderEmailAlert()}
        <button action="submit" className="btn btn-primary">Reset Password</button>
      </form>
    );
  }
}

ResetPasswordInit.propTypes = {
  handleSubmit: React.PropTypes.func,
  fields: React.PropTypes.object,
  emailMessage: React.PropTypes.string,
  resetPasswordInitiate: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  clearError: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    emailMessage: state.auth.emailMessage,
  };
}

export default reduxForm({
  form: 'reset_password_init',
  fields: ['email'],
}, mapStateToProps, actions)(ResetPasswordInit);
