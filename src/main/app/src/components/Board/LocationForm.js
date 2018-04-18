import React, { Component } from 'react'
import classes from './LocationForm.css'
export default class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '' };
  }
  handleChange = (event) => this.setState({ city: event.target.value });
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("value " + this.state.city + "  " + this.props.boardId);
    this.props.handleLocationAdd(this.props.boardId, this.state.city)
  }

  render() {
    return (
      <div className={classes.LocationForm}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} placeholder="Add city" onChange={this.handleChange} />
          <button type="submit" className="btn btn-primary">+</button>
        </form>
      </div>
    )
  }
}
