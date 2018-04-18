import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
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

    render() {
        console.log("Logged "+this.props.loggedIn);
        let showUnlogged =
            <Aux>
                <li>
                    <Link to='/user/signup' className="nav-link" >
                        <i className="fas fa-user-plus" ></i> Sing Up
                    </Link>
                </li>
                <li>
                    <Link to='/user/login' className="nav-link" >
                        <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                </li>
            </Aux>

        if (this.props.loggedIn) {
            showUnlogged = 
            <li>
                <Link to='/user/logout' className="nav-link" >
                    <i className="fas fa-sign-out-alt"></i> Logout
                </Link>
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
export default connect(mapStateToProps)(Nav);