import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ComposedChart, 
    Line, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    LineChart, 
    AreaChart, 
    Brush 
} from 'recharts';
import { _renderDollarsWithCommas } from '../util/helpers';
import LoadingSpinner from './loading_spinner';

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


class BoxOfficeChart extends React.Component {
    render() {
        let areaChart = (
            <LoadingSpinner />
        );

        if (this.props.boxOfficeDays.length) {
            areaChart = (
                <AreaChart 
                    width={800} 
                    height={400} 
                    data={this.props.boxOfficeDays}
                    margin={{top: 20, right: 0, bottom: 50, left: 50}}>

                    <XAxis 
                        dataKey='day' 
                        tick={<TiltedXAxisLabel />} 
                        interval={'preserveStartEnd'}
                    />

                    <YAxis 
                        type='number' 
                        domain={[0, 'dataMax']} 
                        tickFormatter={_renderDollarsWithCommas}
                    />

                    <Tooltip formatter={_renderDollarsWithCommas}/>
                    <Area 
                        type='monotone' 
                        dataKey='bomojo_to_date_gross' 
                        name='Box Office Earnings - Running Total'
                        fill='#F06449'
                        stroke='#F06449'
                        strokewidth={2} 
                        fillopacity={0.5} />

                    <Area 
                        type='monotone' 
                        dataKey='bomojo_daily_gross' 
                        name='Box Office Earnings - Single Day'
                        stroke='#5BC3EB' 
                        strokewidth={2} 
                        fillOpacity={0} />

                </AreaChart>
            )
        }

        

        return (
            <div 
                className='chart-container' 
                style={{width: 800, height: 400, position: 'relative'}}>

                {areaChart}
            </div>
        )
    }
}
export default BoxOfficeChart;