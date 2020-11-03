import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import FiveDay from './FiveDay';
import ThreeHour from './ThreeHour';

//import all components  

export default props => {
  const [zipcode, setZipcode] = useState(null)
  const [country, setCountry] = useState(null)
  const [system, setSystem] = useState('metric')
  const [changes, setChanges] = useState(false);
  const [fiveDayData, setFiveDayData] = useState();

  function handleCountry(value) {
    setCountry(value)
    setChanges(true)
  }

  function handleFiveDayData(value) {
    setFiveDayData(value)
  }

  function handleSystem(value) {
    setSystem(value)
  }

  function handleZipcode(value) {
    setZipcode(value)
    setChanges(true)
  }

  return (
    <div className="w-100">
      <div className="fixed-top">
        <Navbar system={system} handleSystem={handleSystem} />
      </div>
      <div className="content" style={{ margin: '4rem' }}>
        <Switch>
          <Route exact path="/"
            render={() => <FiveDay
              system={system}
              handleZipcode={handleZipcode}
              handleCountry={handleCountry}
              handleFiveDayData={handleFiveDayData}
              changes={changes}
              zipcode={zipcode}
              country={country}
              fiveDayData={fiveDayData}
              {...props}
            />}
          />
          <Route exact path='/:index' render={() =>
            <ThreeHour
              system={system}
              handleZipcode={handleZipcode}
              handleCountry={handleCountry}
              handleFiveDayData={handleFiveDayData}
              changes={changes}
              zipcode={zipcode}
              country={country}
              fiveDayData={fiveDayData}
              {...props}
            />
          } />
        </Switch>
      </div>
    </div>
  );
}