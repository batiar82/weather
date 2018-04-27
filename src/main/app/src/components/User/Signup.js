import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
//import { signup } from '../../actions/userAction'
import classes from './Signup.css'
class Signup extends Component {
  state = {
    username: '',
    password: '',
    name: ''
  }

  handleSignup = (evt) => {
    evt.preventDefault();
    const lowCaseUsername = this.state.username.toLowerCase()
    this.setState({ username: lowCaseUsername });
    //this.props.signup(this.state);
  }
  validateRequiredField(field) {
    if (field === undefined || field.length === 0) {
      return (<div className="invalid-feedback">
        Please fill this field.
      </div>)
    }
  }
  render() {
    if (this.props.loggedIn || this.props.signupSuccess) {
      return (
        <Redirect to={{ pathname: "/" }
        } />
      )
    }
    let hasErrors = this.state.password.length === 0 || this.state.name.length === 0 || this.state.username.length === 0
    let userExists = null;

    if (this.props.error && this.props.error.status === 409 && this.props.error.data.username === this.state.username)
      userExists = <div className="invalid-feedback">That username already exists.</div>
    return (
      <section className={classes.Signup}>
        <form method="post" action="#" role="signup">
          <input type="text" name="name" placeholder="Name" required className="form-control input-lg" onChange={event => this.setState({ name: event.target.value })} />
          {this.validateRequiredField(this.state.name)}
          <input type="text" name="username" placeholder="Username" required className="form-control input-lg" onChange={event => this.setState({ username: event.target.value })} />
          {this.validateRequiredField(this.state.username)}
          {userExists}
          <input type="password" className="form-control input-lg" id="password" placeholder="Password" required="" onChange={event => this.setState({ password: event.target.value })} />
          {this.validateRequiredField(this.state.password)}
          <button type="submit" name="go" disabled={hasErrors} className="btn btn-lg btn-primary btn-block" onClick={this.handleSignup} >Sign up</button>
          <div>
            <Link to='/user/login'>or Login</Link>
          </div>

        </form>

      </section>



    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  //signup
}, dispatch)

const mapStateToProps = state => ({
  error: state.user.error,
  signupSuccess: state.user.signupSuccess,
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);