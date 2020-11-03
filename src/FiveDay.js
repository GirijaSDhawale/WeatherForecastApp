/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardHeader, MDBIcon, MDBTypography, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import { getFiveDay } from './weatherApi';
import Day from './Day'

export default props => {
  const { zipcode, country, fiveDayData, handleZipcode, handleCountry, system, changes, handleFiveDayData } = props;
  const [error, setError] = useState(null)

  async function handleData() {
    let rawData = await getFiveDay(zipcode, country, system)
      .then(res => {
        if (res.cod === "200") {
          return res
        }
        setError(true)
        return null
      })
    handleFiveDayData(rawData)
  }

  const noZipcode = () => {
    return (
      <div className="col-xl-6 col-12 mx-auto">
        <MDBInput type="number" label="Zip Code" maxlength="5" onChange={(e) => handleZipcode(e.target.value)} />
        <MDBInput type="text" label="Country Code (blank for US)" maxlength="2" onChange={(e) => handleCountry(e.target.value)} />
        {
          changes
            ? <MDBBtn rounded color="primary" onClick={() => handleData()}>Search</MDBBtn>
            : <></>
        }
        {
          error
            ? <MDBTypography text="danger" tag="small"><MDBIcon icon="exclamation" /> Invalid data</MDBTypography>
            : <></>
        }
      </div>
    )
  }

  function reset() {
    handleCountry(null)
    handleZipcode(null)
    handleFiveDayData(null)
  }

  const weatherForecast = () => {
    let target = [];
    const list = fiveDayData?.list
    for (let i = 0; i < list?.length; i++) {
      if (i % 7 === 0 && i > 0) {
        target.push(
          <div className="col-12 col-xl-2 mx-auto mt-2">
            <Day data={list[i]} system={system} index={i} />
          </div>
        )
      }
    }

    return (
      <div className="row">
        <div className="w-100">
          <div className="row">
            <MDBTypography className="mr-xl-auto mx-auto my-auto" tag="h3" variant="h3-responsive">{fiveDayData?.city?.name} | {fiveDayData.city?.country}</MDBTypography>
          </div>
        </div>
        <div className="w-50 my-3 border-bottom mx-auto mr-xl-auto"></div>
        <div className="row col-12 mx-auto">
          {target}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (zipcode && system) {
      handleData()
    }
  }, [system])
  return (
    <MDBCard>
      <MDBCardHeader>
        <div className="row">
          <MDBTypography tag="h1" variant="h1-responsive" className="my-auto mr-xl-auto mx-auto">
            {
              fiveDayData
                ? '5-day weather forecast'
                : 'Select your city by zipcode'
            }
          </MDBTypography>
          {
            fiveDayData
              ? <div className="ml-xl-auto mx-auto">
                <MDBBtn onClick={() => reset()} color="primary">Back</MDBBtn>
              </div>
              : <></>
          }
        </div>
      </MDBCardHeader>
      <MDBCardBody className="w-100 mx-auto">
        {
          fiveDayData
            ? weatherForecast()
            : noZipcode()
        }
      </MDBCardBody>
    </MDBCard>
  )
}