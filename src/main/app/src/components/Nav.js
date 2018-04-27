import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { googleLogin,logout } from '../actions/userAction'
import { bindActionCreators } from 'redux'

import Aux from './hoc/Aux'
class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            navCollapsed: false
        }
    }
    _onToggleNav = () => {
        console.log("Click " + JSON.stringify(this.props.userData));
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }
    login = (evt)=>{
        evt.preventDefault();
        console.log("Login");
        this.props.googleLogin();

    }
    logout = (evt)=>{
        evt.preventDefault();
        console.log("Logout");
        this.props.logout();

    }
    
    render() {
        console.log("Logged "+this.props.loggedIn);
        let showUnlogged =
            <Aux>
                <li>
                    <a onClick={this.login} className='nav-link'> 
                        <i className="fas fa-sign-in-alt"></i> Login
                    </a>
                </li>
            </Aux>

        if (this.props.loggedIn) {
            showUnlogged = 
            <li>
                <a className="nav-link" onClick={this.logout} >
                    <i className="fas fa-sign-out-alt"></i> Logout
                </a>
            </li>
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand" >Weather App Challenge</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    {showUnlogged}


                    </ul>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    userData: state.user.userData,
    loggedIn: state.user.loggedIn
})
const mapDispatchToProps = dispatch => bindActionCreators({
    googleLogin,
    logout,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav);