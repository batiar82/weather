import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {logout as logoutAction } from '../../actions/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Spinner} from '@blueprintjs/core'
import {app} from '../../helpers/base'
class Logout extends Component {
  state = {}

  componentWillMount(){
    this.props.logoutAction();
  }

  render() {
    if(this.props.loggedIn){
      return(
      <Redirect to={{ pathname: "/" }}/>
      )
  }
  return (
    <div>
      <Spinner/>
      </div>
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
