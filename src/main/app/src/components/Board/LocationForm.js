import React, { Component } from 'react'
import classes from './LocationForm.css'
export default class LocationForm extends Component {
  state = {
    city: '',
  }
  disabled = ()=>{
    let disable=false;
    this.state.city==='' ? disable=true : disable=false;

    return disable;
  }
  componentDidUpdate(){
    console.log("reset? "+this.props.resetForm)
    if(this.props.resetForm && this.state.city!==''){
      this.setState({city:''})
      this.props.resetedFormHandler(this.props.boardId);
    }
  }
  render() {
    return (

      <div className={classes.LocationForm}>
        <form onSubmit={(evt)=>this.props.handleLocationAdd(evt,this.props.boardId, this.state.city)}>
          <input type="text" value={this.state.city} placeholder="Add city" onChange={(evt)=>{this.setState({city: evt.target.value})}} />
          <button type="submit" disabled={this.disabled()} className="btn btn-primary">+</button>
        </form>
      </div>
    )
  }
}
