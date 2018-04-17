import React  from 'react'
import './board.css'
import Location from './location'
import LocationForm from './LocationForm';
export default ({ board, handleBoardDelete, handleLocationAdd, handleLocationDelete }) => {
  let locations=null;
  if(board.locations){
    locations=board.locations.map(location => <Location handleDelete={handleLocationDelete} location={location} boardId={board.id}key={location.id} />)
  }
  
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-trash" onClick={()=>handleBoardDelete(board.id)}>
          <i className="far fa-trash-alt"></i>
        </div>
        <h1>{board.name}</h1>
        <div className="location-form">
        <LocationForm boardId={board.id} handleLocationAdd={handleLocationAdd}/>
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
