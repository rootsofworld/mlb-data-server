import * as d3 from "d3";
import React, { useEffect } from "react";

function XAxis(props) {
  const scale = props.scale;
  const group = React.createRef();
  let axis = d3.axisBottom(scale);

  useEffect(() => {
    d3.select(group.current)
      .attr(
        "transform",
        `translate(${props.transform.left}, ${props.transform.top})`
      )
      .call(axis);
  });

  return <g className="axis" ref={group} />;
}

export default XAxis;
