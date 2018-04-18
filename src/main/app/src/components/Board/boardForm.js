import React from 'react'

import classes from './board.css'
export default ({handleBoardAdd}) => {
  return (
    <div className={classes.BoardBar}>
      <input type="text" placeholder="Enter Board Name..." ref={(input)=> this._board = input}/>
      <button className="btn btn-primary" onClick={()=>handleBoardAdd(this._board)}>+</button>
    </div>
  )
}
