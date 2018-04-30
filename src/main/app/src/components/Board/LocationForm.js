import React, { Component } from 'react'
import classes from './LocationForm.css'
import SearchSuggest from '../SearchSuggest/SearchSuggest'
import axios from 'axios'

export default class LocationForm extends Component {
  state = {
    city: '',
    suggestions: []
  }
  disabled = () => {
    let disable = false;
    this.state.city === '' ? disable = true : disable = false;

    return disable;
  }
  componentDidUpdate() {
    console.log("reset? " + this.props.resetForm)
    if (this.props.resetForm && this.state.city !== '') {
      this.setState({ city: '' })
      this.props.resetedFormHandler(this.props.boardId);
    }
  }

  changeHandler=(name)=> {
    this.setState({ city: name })
    console.log("evyyy "+this.state.city );
    const jwtToken = localStorage.getItem('jwtToken');
    const server = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${server}/autocomplete?query=${name}`, { headers: { 'Authorization': jwtToken } })
    .then(response => {
      const suggestions=response.data.predictions.map(pred=>{
        return {name:pred.description}
      })
      this.setState({suggestions:suggestions})
    })
    .catch(error =>console.log("error "+error.data));

   }
   selectHandler=(name)=>{
     this.props.handleLocationAdd(null, this.props.boardId,name)
     this.setState({suggestions:[]});
   }

  render() {
    return (
      <div className={classes.LocationForm}>
        <form 
        onSubmit={(evt) => this.props.handleLocationAdd(evt, this.props.boardId, this.state.city)}>
          <SearchSuggest value={this.state.city} 
          placeholder="Add city" 
          onChange={this.changeHandler}
          onSelect={this.selectHandler} 
          suggestions={this.state.suggestions}/>
         <button type="submit" disabled={this.disabled()} className="btn btn-primary">+</button>
        </form>
      </div>
    )
  }
}
