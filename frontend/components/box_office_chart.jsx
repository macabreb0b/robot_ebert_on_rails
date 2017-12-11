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
    ResponsiveContainer,
    Brush 
} from 'recharts';
import { _renderDollarsWithCommas } from '../util/helpers';
import LoadingSpinner from './loading_spinner';
import TiltedXAxisLabel from './tilted_axis_label';


class BoxOfficeChart extends React.Component {
    render() {
        let areaChart = (
            <LoadingSpinner />
        );

        if (this.props.boxOfficeDays.length) {
            areaChart = (
                <ResponsiveContainer>
                    <AreaChart 
                        data={this.props.boxOfficeDays}
                        margin={{top: 20, right: 0, bottom: 50, left: 30}}>

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
                            name='Box Office Earnings - Cumulative'
                            fill='#F06449'
                            stroke='#F06449'
                            strokewidth={2} 
                            fillOpacity={0.5} />

                        <Area 
                            type='monotone' 
                            dataKey='bomojo_daily_gross' 
                            name='Box Office Earnings - Single Day'
                            stroke='#5BC3EB' 
                            strokewidth={2} 
                            fillOpacity={0} />

                    </AreaChart>
                </ResponsiveContainer>
            )
        }

        return (
            <div 
                className='chart-container' 
                style={{width: '100%', height: 400, position: 'relative'}}>

                {areaChart}
            </div>
        )
    }
}
export default BoxOfficeChart;