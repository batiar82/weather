import React from 'react'

import classes from './board.css'
export default ({name, enabled,handleNameChange,handleBoardAdd}) => {
  return (
    <div className={classes.BoardBar}>
    <form onSubmit={handleBoardAdd}>
      <input type="text" placeholder="Enter Board Name..." value={name} onChange={(evt)=>handleNameChange(evt.target.value)}/>
      <button type="submit" className="btn btn-primary" disabled={!enabled}>+</button>
      </form>
    </div>
  )
}
