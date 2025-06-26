import React, { useState } from 'react';
import './App.css';
import Routes from './routes'

const App = () => {
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const a = e.target[0].value;
    const b = e.target[1].value;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/shortd/${a}/${b}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setDisplay(true);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setDisplay(false);
      setData(null);
      console.error('Error:', err);
    }

    setLoading(false);
    e.target[0].value = '';
    e.target[1].value = '';
  };

  return (
    <div className="mainContainer">
      <div className="formInput">
        <form method="post" onSubmit={onsubmitHandler} className="formGroup">
          <div className="sourceForm">
            <label htmlFor="source">Source</label>
            <input
              id="source"
              name="a"
              type="number"
              min={1}
              max={64}
              placeholder="Enter Source"
              className="sourceInput"
              required
            />
          </div>
          <div className="destinationForm">
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              name="b"
              type="number"
              min={1}
              max={64}
              placeholder="Enter Destination"
              className="destinationInput"
              required
            />
          </div>
          <button className="formButton" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>

      {error && <div className="errorMsg">{error}</div>}

      <div className="projectDisplay">
        {display && data && <Routes dataPoint={data} />}
      </div>
    </div>
  );
};

export default App;
