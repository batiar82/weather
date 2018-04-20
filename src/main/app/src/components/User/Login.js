import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';
import { login } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './Login.css'
class Login extends Component {
  state = {
    username:'',
    password: '',
  }

  handleLogin = (evt) => {
    evt.preventDefault();
    console.log("Submit " + this.state.username);
    const lowCaseUsername = this.state.username.toLowerCase()
    this.setState({username: lowCaseUsername});
    this.props.login(this.state);

  }
  validateRequiredField(field){
    if(field===undefined || field.length===0){
      return (<div className="invalid-feedback">
      Please fill this field.
    </div>)
    }
  }
  render() {
    if (this.props.loggedIn && localStorage.getItem("jwtToken")!=null) {
      console.log("LOGGED?? " + this.props.loggedIn);
      return (
        <Redirect to={{ pathname: "/" }
        } />
      )
    }
    let hasErrors = this.state.password.length===0 || this.state.username.length===0
    return (
      <section className={classes.Login}>
        <form method="post" action="#">
          <input type="text" name="username" placeholder="Username" required className="form-control input-lg" onChange={event => this.setState({ username: event.target.value.toLowerCase() })}/>
          {this.validateRequiredField(this.state.username)}
          <input type="password" className="form-control input-lg" id="password" placeholder="Password" required="" onChange={event => this.setState({ password: event.target.value })}/>
          {this.validateRequiredField(this.state.password)}
          <button type="submit" name="go" disabled={hasErrors} className="btn btn-lg btn-primary btn-block" onClick={this.handleLogin} >Log in</button>
          <div>
            <Link to='/user/signup'>or create account</Link>
          </div>

        </form>

      </section>



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
