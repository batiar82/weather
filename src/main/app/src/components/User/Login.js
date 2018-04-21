import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';
import { login } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Toaster, Intent} from "@blueprintjs/core"
import classes from './Login.css'
import {app, googleProvider} from '../../helpers/base'
class Login extends Component {
  constructor(){
    super()
      this.authWithGoogle=this.authWithGoogle.bind(this)
    }
  
  authWithGoogle(){
    console.log("Auth with google");
    //this.props.login({"pepe":"pappa"});
    app.auth().signInWithPopup(googleProvider).then((result,error)=>{
      if(error){
        this.toaster.show({intent: Intent.DANGER,message: "Unable to sign in with Google"})
      }else {
        this.props.login(result);
      }
    })
  }
  render(){
    if(this.props.loggedIn){
      return (
        <Redirect to={{ pathname: "/" }}/>
      )
    }
    return (

      <div>
        <Toaster ref={(element) => {this.toaster = element}}/>
        <button onClick={()=> this.authWithGoogle()}>Log in with Google</button>
  </div>        
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch)

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
