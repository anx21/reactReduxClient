import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.clearError();
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" {...password} className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <div className="flex-container">
          <button action="submit" className="btn btn-primary signin-button">Sign in</button>
          <Link to="/resetpasswordinit">Reset Password</Link>
        </div>
      </form>
    );
  }
}

Signin.propTypes = {
  handleSubmit: React.PropTypes.func,
  fields: React.PropTypes.object,
  signinUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  clearError: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
}, mapStateToProps, actions)(Signin);
