import React, { Component } from 'react'
import './board.css'
import Location from './location'
import LocationForm from './LocationForm';
import Aux from '../hoc/Aux'
import classes from './board.css'

class Board extends Component {
  state={
    error: false,
    errormsg:'',
  }
  /*componentDidUpdate(){
    if(this.props.error)
  }*/
  render() {
    let locations = null;
    const { board, handleBoardDelete, handleLocationAdd, handleLocationDelete,resetedFormHandler } = this.props;
    if (board.locations) {
      locations = board.locations.map(location => <Location handleDelete={handleLocationDelete} location={location} boardId={board.id} key={location.id} />)
    }
    let error=null;
    if(this.props.board.error)
      error=(<div className={classes.Error}>City not Found</div>)
  
    return (
      <Aux>
        <div className={classes.BoardBar}>

          <p>{board.name}</p>
          <LocationForm 
            boardId={board.id} 
            resetForm={board.resetForm}
            handleLocationAdd={handleLocationAdd} 
            resetedFormHandler={resetedFormHandler}
             />
          {error}
          <div className={classes.BoardTrash} onClick={() => handleBoardDelete(board.id)}>
            <i className="far fa-trash-alt"></i>
          </div>
        </div>


        <div className={classes.BoardCities}>
          {locations}
        </div>
      </Aux >
    )
  }
}

export default Board;