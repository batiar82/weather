import React  from 'react'
import '../css/board.css'
import Location from './location'
export default ({ board, handleBoardDelete, handleLocationAdd, handleLocationDelete }) => {
  let locations=null;
  if(board.locations){
    locations=board.locations.map(location => <Location handleDelete={handleLocationDelete} location={location} key={location.id} />)
  }
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-trash" onClick={()=>handleBoardDelete(board.id)}>
          <i className="far fa-trash-alt"></i>
        </div>
        <h1>{board.name}</h1>
        <div className="location-form">
          <input type="text" placeholder="City" ref={(input)=> this._city = input}/>
          <button type="submit" onClick={()=>handleLocationAdd(this._city)}>Add</button>
        </div>

      </div>
      <div className="container">
        <div className="row">
          {locations}
        </div>
      </div>
      <div className="panel-footer">

      </div>
    </div>

  )
}
