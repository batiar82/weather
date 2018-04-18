import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {logout as logoutAction } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
class Logout extends Component {
  state = {}

  componentWillMount(){
    console.log("En ogout");
    this.props.logoutAction();
  }

  render() {
    return (
      <Redirect to="/"/>  
    )

  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  logoutAction
}, dispatch)

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
