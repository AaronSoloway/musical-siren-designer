import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import {  Routes,
          Route,
          useSearchParams
   } from 'react-router-dom';
import Blueprint from 'react-blueprint-svg';
import MusicalSiren from './MusicalSiren';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import MakerJs from 'makerjs';
import fileDownload from 'js-file-download'

// fonts
import "./fonts/Overpass/Overpass-ExtraLight.ttf";
import { getAutoHeightDuration } from '@mui/material/styles/createTransitions';
import { getMenuItemUnstyledUtilityClass } from '@mui/base';
import { getListItemSecondaryActionClassesUtilityClass } from '@mui/material';





function App() {
  // default disc parameters
  const [customScale, setCustomScale] = React.useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
  const [toneHoleShape, setToneHoleShape] = React.useState("oval");
  const [toneHoleLength, setToneHoleLength] = React.useState(6);
  const [toneHoleWidth, setToneHoleWidth] = React.useState(6);
  const [interRingRadius, setInterRingRadius] = React.useState(2);
  const [insideRingRadius, setInsideMountRadius] = React.useState(50.0);
  const [edgeRadius, setEdgeRadius] = React.useState(6);

  // pitch parameters
  const [ordinalTargetPitchFrequency, setOrdinalTargetPitchFrequency] = React.useState(261.626); // middle C

  // motor parameters
  const [motorTargetRpm, setMotorTargetRpm] = React.useState(262); // this will be a dependent value on ordinal [spatial] frequency and ordinal target frequency


  /*
  // attempts to use url querying to load parameters so I can spawn exact discs from the analysis visuals

  // possibly way to prevent re-render https://github.com/remix-run/react-router/issues/8908
  // const Wrapper = () => {
  //   const [searchParams] = useSearchParams();
  //   console.log(searchParams);
    
  //   return <Wrapped id={searchParams.id} />
  // }
  
  // const Wrapped = React.memo(({ id }) => `Item ${id}`); 

  // get url params so you can easily share a design
  const [searchParams] = useSearchParams();
  
  // console.log(searchParams.get('toneHoleWidth'));
  // console.log(searchParams.get('customScale'));

  // parse any url query parameters
  const customScaleParam = searchParams.get('customScale');
  const toneHoleShapeParam = searchParams.get('toneHoleShape');
  const toneHoleLengthParam = searchParams.get('toneHoleLength');
  const toneHoleWidthParam = searchParams.get('toneHoleWidth');
  const interRingRadiusParam = searchParams.get('interRingRadius');
  const edgeRadiusParam = searchParams.get('edgeRadius');
  
  // prefer url query parameters over default values, if they exist
  console.log(customScaleParam);
  if (customScaleParam){
    console.log("test");
    setCustomScale(customScaleParam);
  }

  if (toneHoleShapeParam){
    setToneHoleShape(toneHoleShapeParam);
  }

  if (toneHoleLengthParam){
    setToneHoleLength(toneHoleLengthParam);
  }

  if (toneHoleWidthParam){
    setToneHoleWidth(toneHoleWidthParam);
  }

  if (interRingRadiusParam){
    setInterRingRadius(interRingRadiusParam);
  }

  if (edgeRadiusParam){
    setEdgeRadius(edgeRadiusParam);
  }
*/
  // create musical siren model
  let musicalSirenModel = new MusicalSiren(customScale, toneHoleShape, toneHoleLength, toneHoleWidth, interRingRadius, insideRingRadius, edgeRadius);
 
  // https://maker.js.org/docs/exporting/
  const filename = "output.dxf";
  const file = MakerJs.exporter.toDXF(musicalSirenModel);

  const handleToneHoleShapeMenuChange = (event, newValue) => {
    setToneHoleShape(newValue.props.value);
  } 
  
  const handleCustomScaleChange = (e) => {
    // console.log(e);
    setCustomScale(e.target.value);

    // update target motor RPM since it can depend on this if ordinal changes
    var resultantRpm = ordinalTargetPitchFrequency / Math.round(Number(e.target.value.split(',')[0]));
    setMotorTargetRpm(Math.round(resultantRpm));
  }

  const handleToneHoleLengthSliderMoved = (event, newValue) => {
    setToneHoleLength(newValue);
  }

  const handleToneHoleWidthSliderMoved = (event, newValue) => {
    setToneHoleWidth(newValue);
  }

  const handleInterRingDistanceSliderMoved = (event, newValue) => {
    setInterRingRadius(newValue);
  }

  const handleInsideRingRadiusSliderMoved = (event, newValue) => {
    setInsideMountRadius(newValue);
  }

  const handleOrdinalTargetFrequencySliderMoved = (event, targetPitchFreq) => {
    setOrdinalTargetPitchFrequency(targetPitchFreq);

    var resultantRpm = targetPitchFreq / Math.round(Number(customScale[0]));
    setMotorTargetRpm(Math.round(resultantRpm)); // this is still too much precision but at least makes the connection between freq and rpm clear when ordinal = 1 and rpm should exactly match desired pitch
  }


  // override default to make design load with the siren fit to the blueprint
  const initialOptions = {
    fitOnScreen: true, // I want it to load ideally fit on screen
    showGrid: false,
    showPathNames: false,
    showPathFlow: false,
    yDirection: 'naturalUp',
    unitString: "mm"
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


    <div className='App'>
      {/* <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet">
      </header> */}
      <div className="title">
        <h2>Musical Siren Designer</h2>
      </div>
      <div className="blueprint">
        <Blueprint className='blueprint' model={musicalSirenModel} options={initialOptions}>
        </Blueprint>
      </div>
      <div className='controls'>
        <Box className='controlBox'
          // components="form"
          // sx={{
          //   '& > :not(style)': { m: 4 },
          // }}
          // noValidate
          // autoComplete="off"
        >
          <Divider className="dividerText" textAlign="center">SCALE</Divider>
          <div className='uiText'>Tone Holes per Ring</div>
          <TextField 
            // id="outlined-basic" 
            fullWidth
            onChange={handleCustomScaleChange}
            // onChange={evt => this.updateInputValue(evt)} 
            value={customScale} 
            // inputProps={customScale} 
            // label="scale"
            variant="outlined" 
            helperText="inside ring (left) to outside ring (right), decimals are rounded to nearest whole number" 
          />
          {/* <div className='uiText'>Tone Hole Length</div> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Divider className="dividerText" textAlign="center">TONE HOLE</Divider>
          <br></br>
          <br></br>
          <br></br>
          <Slider className='sliders'
            onChange={handleToneHoleLengthSliderMoved}
            value={toneHoleLength}
            valueLabelDisplay="on"
            valueLabelFormat={value => <div>Tone Hole Length: {value} mm</div>}
            min={1}
            max={25}
            step={0.1}
          />
          {/* <div className='uiText'>Tone Hole Width</div> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Slider className='sliders'
            onChange={handleToneHoleWidthSliderMoved}
            value={toneHoleWidth}
            valueLabelDisplay="on"
            valueLabelFormat={value => <div>Tone Hole Width: {value} mm</div>}
            min={1}
            max={25}
            step={0.1}
          />
          <div className='uiText'>Tone Hole Shape</div>
          <Select
            // labelId="demo-simple-select-label"
            // id="demo-simple-select"
            value={toneHoleShape}
            label="Tone Hole Shape"
            onChange={handleToneHoleShapeMenuChange}
          >
            <MenuItem value={"oval"}>Oval</MenuItem>
            <MenuItem value={"rectangle"}>Rectangle</MenuItem>
            <MenuItem value={"triangle"}>Triangle</MenuItem>
            <MenuItem value={"diamond"}>Diamond</MenuItem>
          </Select> 
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Divider className="dividerText" textAlign="center">DISC LAYOUT</Divider>
          <br></br>
          <br></br>
          <br></br>
          <Slider className='sliders'
            onChange={handleInterRingDistanceSliderMoved}
            value={interRingRadius}
            valueLabelDisplay="on"
            valueLabelFormat={value => <div>Inter-Ring Distance: {value} mm</div>}
            min={1}
            max={25}
            step={0.1}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Slider className='sliders'
            onChange={handleInsideRingRadiusSliderMoved}
            value={insideRingRadius}
            valueLabelDisplay="on"
            valueLabelFormat={value => <div>Ring 1 Radius: {value} mm</div>}
            min={1}
            max={200}
            step={0.1}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Slider className='sliders'
            onChange={handleOrdinalTargetFrequencySliderMoved}
            value={ordinalTargetPitchFrequency}
            valueLabelDisplay="on"
            valueLabelFormat={value => <div>Ring 1 Target Pitch When Spun: {value} Hz</div>}
            min={1}
            max={1000}
            step={0.001}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Divider className="dividerText" textAlign="center">MOTOR</Divider>
          <br></br>
          <br></br>
          To achieve this pitch, you will need a ~{motorTargetRpm} RPM Motor
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            onClick={() => {
                var dxfData = MakerJs.exporter.toDXF(musicalSirenModel, {accuracy: 0.0001, units: MakerJs.unitType.Millimeter, usePOLYLINE: true});

                var today = new Date();
                const time = today.toLocaleTimeString("en-GB"); //this makes it 24hr rather than AM/PM

                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                
                today = yyyy + '/' + mm + '/' + dd;

                var dateTimeString = today + "-" + time;
                fileDownload(dxfData, "MusicalSiren" + dateTimeString + ".dxf");
            }}
          >
            Download .DXF
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            onClick={() => {
                var svgData = MakerJs.exporter.toSVG(musicalSirenModel, {accuracy: 0.0001, units: MakerJs.unitType.Millimeter});

                var today = new Date();
                const time = today.toLocaleTimeString("en-GB"); //this makes it 24hr rather than AM/PM

                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                
                today = yyyy + '/' + mm + '/' + dd;

                var dateTimeString = today + "-" + time;

                fileDownload(svgData, "MusicalSiren" + dateTimeString + ".svg");
            }}
          >
            Download .SVG
          </Button>
        </Box>
        {/* <h3><a href={file}>{filename}</a></h3> */}
      </div>
      {/* <Routes> 
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
        <Route path=':toneHoleLength' element={toneHoleLength}></Route>
      </Routes> */}
    </div>      
    );
}

export default App;


// TODO: adjust scale to fit siren based on outerDiameter... only need to activate "fit on screen" for blueprint?
// TODO: include scale 