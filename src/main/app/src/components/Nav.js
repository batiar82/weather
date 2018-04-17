import React, { Component } from 'react';
import  {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class Nav extends Component {
    constructor(props){
        super(props)
    
    this.state={
        navCollapsed:true
    }
}
    _onToggleNav = () => {
        console.log("Click "+JSON.stringify(this.props.userData));
        this.setState({navCollapsed : !this.state.navCollapsed})
    }
    
    render() {
        const {navCollapsed} =this.state
        let collapseClass='collapse'
        if(!navCollapsed)
            collapseClass+=' navbar-collapse';
        let status=<li className="nav-item">
        <Link to='/user/logout' className="nav-link" >Logout</Link>
        </li>
        if(!this.props.loggedIn){
            status=<li className="nav-item">
            <Link to='/user/login' className="nav-link" >Login</Link><Link to='/user/signup' className="nav-link" >Signup</Link>
            </li>
        }
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">Weather App Challenge</Link>
            

            <button onClick={this._onToggleNav} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={collapseClass} id="navbarColor03">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <Link to='/' className="nav-link" >Boards
            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    {status}
                </ul>

            </div>

        </nav>)
    }
}
const mapStateToProps = state =>({
    userData: state.user.userData,
    loggedIn: state.user.loggedIn
})
export default connect(mapStateToProps)(Nav);