import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { login } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
class Login extends Component {
  state = {}

  handleLogin = (evt) => {
    evt.preventDefault();
    console.log("Submit " + this.state.username);
    this.props.login(this.state);

  }

  render() {
    if (this.props.loggedIn) {
      console.log("LOGGED?? " + this.props.loggedIn);
      return (
        <Redirect to = {{ pathname: "/" }
    } />
      )
  }
  return(
      <form method = "post" >
      <input type="text" name="username" onChange={event => this.setState({ username: event.target.value })} />
      <input type="text" name="password" onChange={event => this.setState({ password: event.target.value })} />
      <input type="submit" onClick={this.handleLogin} />
      <Link to='/user/signup' className="nav-link" >SignUp</Link>
      </form>
    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch)

const mapStateToProps = state => ({
  userData: state.user.userData,
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
