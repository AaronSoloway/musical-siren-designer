import logo from './logo.svg';
import './App.css';
import React from 'react';
import Blueprint from 'react-blueprint-svg';
import MusicalSiren from './MusicalSiren';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';

function App() {

  let musicalSirenModel = new MusicalSiren("1, 2, 3, 4, 5, 6, 7, 8, 9, 10", "circle", 3.0, 3.0, 3.0);

  const handleSliderMoved = (event, newValue) => {
    
  }
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='container'>
      <div>
        <Blueprint model={musicalSirenModel}>
          <h2>Musical Siren Designer</h2>
        </Blueprint>
      </div>

      {/* <Slider
      onChange={handleSliderMoved}
      value={smileSpan}
      valueLabelDisplay="auto"
      min={0}
      max={90}
      /> */}
    </div>
  );
}

export default App;
