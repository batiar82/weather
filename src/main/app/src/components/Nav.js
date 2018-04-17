import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

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
        const { navCollapsed } = this.state
        console.log("COLLA " + navCollapsed);
        let collapseClass = 'collapse'
        if (!navCollapsed)
            collapseClass += ' navbar-collapse';
        let status = <li className="nav-item">
            <Link to='/user/logout' className="nav-link" >Logout</Link>
        </li>
        if (!this.props.loggedIn) {
            status = <li className="nav-item">
                <Link to='/user/login' className="nav-link" >Login</Link><Link to='/user/signup' className="nav-link" >Signup</Link>
            </li>
        }
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <Link to='/' className="navbar-brand" >Weather App Challenge</Link>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <Link to='/user/signup' className="nav-link" >
                                <i class="fas fa-user-plus" ></i> Sing Up
                            </Link>
                        </li>
                        <li>
                            <Link to='/user/login' className="nav-link" >
                                <i class="fas fa-sign-in-alt"></i> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/user/logout' className="nav-link" >
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </Link>
                        </li>
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