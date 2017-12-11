import React from 'react';


const TiltedXAxisLabel = ({x, y, payload}) => (
    <text 
        x={x} 
        y={y + 6.0} 
        style={{
            textAnchor: 'end'
        }}
        fill={'#666'}
        transform={`rotate(-45 ${x} ${y})`}>

        <tspan>{payload.value}</tspan>
    </text>
)

export default TiltedXAxisLabel;