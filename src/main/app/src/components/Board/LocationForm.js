import React, { Component } from 'react'

export default class LocationForm extends Component {
    constructor(props){
        super(props);
        this.state = {city: ''};
    }
    handleChange = (event)=> this.setState({city: event.target.value});
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("value "+this.state.city+"  "+this.props.boardId);
        this.props.handleLocationAdd(this.props.boardId,this.state.city)
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Add"/>
      </form>
    )
  }
}
 