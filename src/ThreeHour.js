import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { MDBCard, MDBCardHeader, MDBTypography, MDBCardBody, MDBBtn } from 'mdbreact';
import Hour from './Hour';
import { formatWeekDay, formatMonth } from './Utils'
import { getFiveDay } from './weatherApi'

export default props => {
  const params = useParams()
  const history = useHistory()
  const { index } = params;
  const { zipcode, country, fiveDayData, system, handleFiveDayData } = props;


  async function handleData() {
    if (zipcode) {
      let rawData = await getFiveDay(zipcode, country, system)
      handleFiveDayData(rawData)
    }
    return null
  }

  const hourlyForecast = () => {
    let target = [];
    const list = fiveDayData?.list
    const date = new Date(list[index].dt * 1000)

    for (let days of list) {
      let _date = new Date(days.dt * 1000)
      let _dayDate = _date.getDate()
      let _targetDate = date.getDate()

      if (_dayDate === _targetDate) {
        target.push(
          <div className="col mx-auto mt-2" key={days.dt}>
            <Hour data={days} system={system} />
          </div>)
      }
    }

    return (
      <div className="row">
        <div className="w-100">
          <div className="row">
            <MDBTypography className="mr-xl-auto mx-auto" tag="h3" variant="h3-responsive">{fiveDayData?.city?.name} | {fiveDayData?.city?.country} </MDBTypography>
          </div>
          <div className="row">
            <MDBTypography className="mr-xl-auto mx-auto" tag="h3" variant="h3-responsive"> {formatWeekDay(date)}, {formatMonth(date)} {date.getDate()}</MDBTypography>
          </div>
          <div className="w-50 my-3 border-bottom mr-xl-auto mx-auto"></div>
          <div className="row col-12 mx-auto">
            {target.sort((a, b) => a.key - b.key)}
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (zipcode && system) {
      handleData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system])
  return (
    <MDBCard>
      <MDBCardHeader>
        <div className="row">
          <MDBTypography tag="h1" variant="h1-responsive" className="my-auto mr-xl-auto mx-auto">Three-hour weather forecast</MDBTypography>
          <div className="ml-xl-auto mx-auto">
            <MDBBtn onClick={() => history.push('/')} color="primary">Back</MDBBtn>
          </div>
        </div>
      </MDBCardHeader>
      <MDBCardBody className="w-100 mx-auto">
        {
          fiveDayData
            ? hourlyForecast()
            : null
        }
      </MDBCardBody>
    </MDBCard>
  )
}