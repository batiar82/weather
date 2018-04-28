import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { login, resetError } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './Login.css'
class Login extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    disableSubmit: true
  }
  handleLogin = (evt) => {
    evt.preventDefault();
    const lowCaseUsername = this.state.username.toLowerCase()
    this.setState({ username: lowCaseUsername });
    this.props.login(this.state);

  }
  fieldChangeHandler(evt, field) {
    if (field === 'username')
      this.setState({ username: evt.target.value });
    if (field === 'password')
      this.setState({ password: evt.target.value });
  }

  updateSubmitState() {
    if (this.state.username !== '' && this.state.password !== '') {
      this.setState({ disableSubmit: false })
      console.log("Cambio estado " + this.state.disableSubmit);
    }
  }
  componentDidMount() {
    this.props.resetError();
    console.log("user pass " + this.state.username + this.state.password);
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <Redirect to={{ pathname: "/" }
        } />
      )
    }

    let message = null;
    if (this.props.error)
      message = (<div className={classes.Error}>
        Error logging in, check your credentials</div>)
    if (this.props.signupSuccess)
      message = (<div className={classes.Success}>Signup success, please login</div>)
    let disableForm = true;
    (this.state.username !== '' && this.state.password !== '') ? disableForm = false : disableForm = true;
    return (
      <section className={classes.Login}>
        {message}
        <form onSubmit={this.handleLogin}>

          <input type="text"
            name="username"
            placeholder="Username"
            required
            className="form-control input-lg"
            onChange={(evt) => this.fieldChangeHandler(evt, 'username')}
            value={this.state.username} />
          <input type="password"
            className="form-control input-lg"
            placeholder="Password"
            required
            onChange={(evt) => this.fieldChangeHandler(evt, 'password')}
            value={this.state.password} />
          <button type="submit"
            disabled={disableForm}
            className="btn btn-lg btn-primary btn-block" >Log in</button>
          <div>
            <Link to='/user/signup'>or create account</Link>
          </div>
        </form>
      </section>
    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  resetError,
}, dispatch)

const mapStateToProps = state => ({
  userData: state.user.userData,
  loggedIn: state.user.loggedIn,
  error: state.user.error,
  signupSuccess: state.user.signupSuccess,

})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
