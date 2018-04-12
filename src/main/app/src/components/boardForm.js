import React from 'react'

export default ({handleBoardAdd}) => {
  return (
    <div>
      <input type="text" placeholder="Enter Board Name..." ref={(input)=> this._board = input}/>
      <button className="btn btn-default" onClick={()=>handleBoardAdd(this._board)}>Add</button>
    </div>
  )
}
