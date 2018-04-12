import React, { Component } from 'react';
import  {Link} from 'react-router-dom';

class Nav extends Component {
    state={
        navCollapsed:true
    }
    
    _onToggleNav = () => {
        console.log("Click");
        this.setState({navCollapsed : !this.state.navCollapsed})
    }
    
    render() {
        const {navCollapsed} =this.state
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">Weather App Challenge</Link>
            

            <button onClick={this._onToggleNav} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className='collapse navbar-collapse' id="navbarColor03">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <Link to='/books/all' className="nav-link" >Boards
            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/user/login' className="nav-link" >Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/user/signin' className="nav-link" >Signin</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/user/logout' className="nav-link" >Logout</Link>
                    </li>
                </ul>

            </div>

        </nav>)
    }
}
export default Nav;