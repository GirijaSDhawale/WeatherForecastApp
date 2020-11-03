import React from 'react';
import { MDBTypography, MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';


export default props => {
  const { data, system } = props;
  const date = new Date(data.dt * 1000);
  console.log(data)
  function handleTime() {
    let hours = date.getHours();
    if (hours === 0) {
      return "12AM"
    } else if (hours >= 12) {
      if (hours === 12) {
        return (hours + "PM")
      } else {
        return (hours - 12 + "PM")
      }
    } else {
      return (hours + "AM")
    }
  }

  return (
    <MDBCard className="mx-auto">
      <MDBCardHeader>
        <div className="row">
          <MDBTypography tag="h2" variant="h2-responsive" className="mx-auto">
            {handleTime()}
          </MDBTypography>
        </div>
      </MDBCardHeader>
      <MDBCardBody className="w-100">
        <div className="row">
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