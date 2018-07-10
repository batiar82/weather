import React from 'react'
import './location.css'
import moment from 'moment'
import classes from './location.css'
import Wrap from '../hoc/Wrap'
export default ({ location, handleDelete, boardId }) => {
  let inside = (<div className={classes.LocationLoader}></div>)
  if (!location.loading) {
    const forecastDate = moment(location.forecast.date).format("D/M/YYYY HH:mm");
    inside = (<Wrap><div className={classes.LocationTrash} onClick={() => handleDelete(boardId, location.id)}>
      <i className="far fa-trash-alt"></i>
    </div><div className="city">{location.forecast.city}</div>
      <div className="country">{location.forecast.country}</div>
      <div className="country">Updated: {forecastDate}</div>
      <div className="condition">{location.forecast.text}</div>
      <h1>{location.forecast.temp}°</h1></Wrap>)
  }
  return (
    <div className={classes.Location}>
      {inside}
    </div>

  )
}

