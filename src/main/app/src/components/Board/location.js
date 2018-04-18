import React from 'react'
import './location.css'
import moment from 'moment'
import classes from './location.css'
export default ({ location, handleDelete,boardId }) => {
  //const forecastDate = Date.parse(location.forecast.date);
  const forecastDate = moment(location.forecast.date).format("D/M/YYYY HH:mm");
  return (
    <div className={classes.Location}>
        <div className={classes.LocationTrash} onClick={()=>handleDelete(boardId,location.id)}>
          <i className="far fa-trash-alt"></i>
        </div>

        <div className="city">{location.forecast.city}</div>
        <div className="country">{location.forecast.country}</div>
        <div className="country">Updated: {forecastDate}</div>
        <div className="condition">{location.forecast.text}</div>
        <h1>{location.forecast.temp}°</h1>
      </div>
  
  )
}

