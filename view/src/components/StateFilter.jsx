import React from "react";
import Bases from "./Bases";
import GlobalUseReducerContext from '../context/GlobalUseReducerContext';
import {updateSituation} from '../utils/ActionMaker';

function StateFilter(props) {
  const [globalState, globalStateDispatcher] = React.useContext(GlobalUseReducerContext)
  const indexBasesMap = baseState => {
    return {
      "third-base": baseState[0],
      "second-base": baseState[1],
      "first-base": baseState[2]
    };
  };

  function handleBasesUpdate(evt) {
    const basesMapping = indexBasesMap(globalState.situation.bases);
    basesMapping[evt.target.id] = !!basesMapping[evt.target.id] ? 0 : 1;
    //props.onStateUpdate({ ...props.state, bases: Object.values(basesMapping) });
    globalStateDispatcher(updateSituation({...globalState.situation, bases: Object.values(basesMapping)}))
    evt.target.style.backgroundColor = basesMapping[evt.target.id]
      ? "orange"
      : "gray";
  }

  function handleOutsUpdate(evt) {
    //props.onStateUpdate({ ...props.state, outs: Number(evt.target.value) });
    globalStateDispatcher(updateSituation({...globalState.situation, outs: Number(evt.target.value)}))
  }

  function handleBatterUpdate(evt) {
    //props.onStateUpdate({ ...props.state, batter: evt.target.value });
    globalStateDispatcher(updateSituation({...globalState.situation, batter: evt.target.value}))
  }

  function stateFilterOnOff(evt){
    props.onFilterSwitch(evt.target.checked)
  }

  return (
    <div id="state-filter" className="input-container">
      <div className="field-container">
        <p>Batter:&nbsp;
          <span>
            <input
              id="batter-name"
              type="text"
              placeholder="Batter's name or L/R"
              onChange={ handleBatterUpdate }
            />
          </span>
        </p>
      </div>
      <div className="field-container">
        <span>
          <span style={{marginRight:'10px'}}>
            Outs:
          </span>
          <select id="outs" defaultValue="0" onChange={ handleOutsUpdate }>
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </select>
        </span>
      </div>
      <Bases handler={ handleBasesUpdate } />
      <div className="seperator"/>
      <div className="switch">
        <label htmlFor="all" style={{fontSize:"5px"}} >StateFilter On/Off: </label>
        <input type='checkbox' id="all" onChange={ stateFilterOnOff } defaultChecked={props.isFilterOn}/>
      </div>
    </div>
  );
}

export default StateFilter;
