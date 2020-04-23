import React, {useEffect} from "react";
import * as d3 from 'd3';
//import BubbleList from './BubbleList';
import BarChart from './BarChart';
import GlobalUseReducerContext from '../context/GlobalUseReducerContext';
import {updateCurrentPitcher} from '../utils/ActionMaker';

function PitcherFilter(props) {
    const [globalState, globalStateDispatcher] = React.useContext(GlobalUseReducerContext)
    const color = globalState.pitchColor
    let map = new Map(globalState.currentPitcher.typeset)
    let pitchTypeOrder = ["FF", "CH", "CU", "SL", "FT", "FC", "KC", "SI", "FS", "OT"];
    let pitchType = pitchTypeOrder.map(t => [t, map.get(t)]);
    let scale = d3.scaleLinear().domain([0, 1]).range([6, 18])
    const atbatCounts = (globalState.currentPitcher.indexes) ? globalState.currentPitcher.indexes.length : 0;

    useEffect(() => {
        map = new Map(globalState.currentPitcher.typeset)
        pitchType = pitchTypeOrder.map(t => [t, map.get(t)]);
        scale = d3.scaleLinear().domain([0, 1]).range([6, 18]) 
    }, [globalState.currentPitcher.typeset])

  function handlePitcherUpdate(evt) {
      //props.onPitcherUpdate(evt.target.value);
      globalStateDispatcher(updateCurrentPitcher(evt.target.value))
  }

  return (
    <div id="pitcher-filter" className="input-container">
      <div className="field-container">
        <p>Pitcher:&nbsp;
          <span>
            <input
              type="text"
              id="pitcher-name"
              value={globalState.currentPitcher.name}
              onChange={e => handlePitcherUpdate(e)}
            />
          </span>
        </p>
      </div>
      <div className="s-field-container">
        <span>
          <span style={{fontSize: '6px'}}>PA Counts: {atbatCounts}</span>
        </span>
      </div>
      <div id="typelist" className="field-container">
        {/*<BubbleList 
            color={pitchColor}
            size={scale}
            typeset={pitchType}
        />*/}
        <BarChart
            margin={{top:20, left:25}}
            width={250}
            height={150}
            color={color}
            typeset={pitchType}
        />
      </div>
      <div className="seperator"/>
    </div>
  );
}

export default PitcherFilter;
