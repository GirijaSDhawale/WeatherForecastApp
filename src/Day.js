import React from 'react';
import { useHistory } from 'react-router-dom'
import { MDBTypography, MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';
import { formatMonth, formatWeekDay } from './Utils';

export default props => {
  let history = useHistory();
  const { data, system, index } = props;
  const date = new Date(data.dt * 1000);

  return (
    <MDBCard onClick={() => history.push('/' + index)} className="mx-auto" style={{ cursor: "pointer" }}>
      <MDBCardHeader>
        <div className="row">
          {/* DAY */}
          <MDBTypography tag="h2" variant="h2-responsive" className="mx-auto">
            {formatWeekDay(date)}
          </MDBTypography>
        </div>
        <div className="row">
          {/* MONTH + NUMBER */}
          <MDBTypography tag="h4" variant="h4-responsive" className="mx-auto">
            {formatMonth(date)} {date.getDate()}
          </MDBTypography>
        </div>
      </MDBCardHeader>
      <MDBCardBody className="w-100">
        <div className="row">
          {/* IMAGE */}
          <img className="mx-auto" src={"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"} alt={data.weather[0].description} />
        </div>
        <div className="row">
          <label className="mx-auto">{data.weather[0].description}</label>
        </div>
        <div className="w-50 my-3 border-bottom mx-auto"></div>
        <div className="row">
          <div className="mx-auto">
            <MDBTypography tag="p">Max : {data.main.temp_max} {system === "metric" ? 'C' : 'F'}</MDBTypography>
            <MDBTypography tag="p">Min : {data.main.temp_min} {system === "metric" ? 'C' : 'F'}</MDBTypography>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  )
}