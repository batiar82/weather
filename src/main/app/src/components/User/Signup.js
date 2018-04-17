import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import {signup} from '../../actions/userAction'
class Signup extends Component {
    state = {}

    handleSignup = (evt) => {
        evt.preventDefault();
        this.props.signup(this.state);
    }

    render() {
        return (
            <form>
                <input type="text" name="name" onChange={event=>this.setState({name: event.target.value})}/>
                <input type="text" name="username" onChange={event=>this.setState({username: event.target.value})}/>
                <input type="text" name="password" onChange={event=>this.setState({password: event.target.value})}/>
                <input type="submit" onClick={this.handleSignup} />
                <Link to='/user/login' className="nav-link" >Login</Link>
            </form>
        )
    }
}
const mapDispatchToProps = dispatch =>  bindActionCreators({
    signup
  },dispatch)
  
const mapStateToProps = state => ({ 
})
export default connect(mapStateToProps,mapDispatchToProps)(Signup);