import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { signup, resetError } from '../../actions/userAction'
import classes from './Signup.css'
import Spinner from '../Spinner/Spinner'
class Signup extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    error: null,
    disableSubmit: true,
  }

  handleSignup = (evt) => {
    evt.preventDefault();
    const lowCaseUsername = this.state.username.toLowerCase()
    this.setState({ username: lowCaseUsername });
    this.props.signup(this.state);
  }
  fieldChangeHandler(evt, field) {
    if (field === 'name')
      this.setState({ name: evt.target.value });
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
      return (<Redirect to={{ pathname: "/" }} />)
    }
    if(this.props.signupSuccess){
      return (<Redirect to={{pathname: "/user/login"}} />)
    }
    if(this.props.loading)
    return <Spinner/>
    let error = null;

    if (this.props.error && this.props.error.status === 409 && this.props.error.data.username === this.state.username)
      error = (<div className={classes.Error}>That username already exists</div>);
      let disableForm = true;
      (this.state.username !== '' && this.state.password !== '' && this.state.name!=='') ? disableForm = false : disableForm = true;
          
      return (
      <section className={classes.Signup}>
        {error}
        <form onSubmit={this.handleSignup}>
          <input type="text"
            name="name"
            placeholder="Name"
            required
            className="form-control input-lg"
            onChange={(evt) => this.fieldChangeHandler(evt, 'name')} />
          <input type="text"
            name="username"
            placeholder="Username"
            required
            className="form-control input-lg"
            onChange={(evt) => this.fieldChangeHandler(evt, 'username')} />
          <input type="password"
            className="form-control input-lg"
            placeholder="Password"
            required
            onChange={(evt) => this.fieldChangeHandler(evt, 'password')} />
          <button type="submit" disabled={disableForm}
            className="btn btn-lg btn-primary btn-block">Sign up</button>
          <div>
            <Link to='/user/login'>or Login</Link>
          </div>
        </form>
      </section>
    )
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  signup,
  resetError,
}, dispatch)

const mapStateToProps = state => ({
  error: state.user.error,
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
  signupSuccess: state.user.signupSuccess,
})
export default connect(mapStateToProps, mapDispatchToProps)(Signup);