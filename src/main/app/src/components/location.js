import React from 'react'
import '../css/location.css'
import moment from 'moment'
export default ({ location, handleDelete }) => {
  //const forecastDate = Date.parse(location.forecast.date);
  const forecastDate = moment(location.forecast.date).format("D/M/YYYY HH:mm");
  return (
    <div className="col-xs-12 col-sm-4">
      <div className="card weather">
        <div className="card-trash" onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </div>

        <div className="city">{location.forecast.city}</div>
        <div className="country">{location.forecast.country}</div>
        <div className="country">Updated: {forecastDate}</div>
        <div className="condition">{location.forecast.text}</div>
        <h1>{location.forecast.temp}°</h1>
      </div>
    </div>

  )
}

