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
import addDays from 'date-fns/add_days';
import isEqual from 'date-fns/is_equal';
import isBefore from 'date-fns/is_before';

const NO_DATA_FOR_DAY = 'NO DATA FOR DAY'

function _makeBoxOfficeDaysByDateMap(boxOfficeDays) {
    const dateToBoxOfficeDayMap = {};

    boxOfficeDays.forEach(function(boxOfficeDay) {
        const formattedBoxOfficeDayDate = new Date(boxOfficeDay.day).toLocaleDateString('en-US')
        dateToBoxOfficeDayMap[formattedBoxOfficeDayDate] = boxOfficeDay;
    });

    return dateToBoxOfficeDayMap;
}

function _makeBlankBoxOfficeDay(date) {
    return {
        day: date.toLocaleDateString('en-US'),
        bomojo_to_date_gross: NO_DATA_FOR_DAY,
        bomojo_daily_gross: NO_DATA_FOR_DAY
    }
}

function _fillInMissingDays(sortedBoxOfficeDays) {
    if (sortedBoxOfficeDays == []) return [];

    let boxOfficeDaysWithMissingDaysFilled = [];

    const boxOfficeDaysByDateMap = _makeBoxOfficeDaysByDateMap(sortedBoxOfficeDays);

    const firstDayInList = new Date(sortedBoxOfficeDays[0].day);
    const lastDayInList = new Date(sortedBoxOfficeDays[sortedBoxOfficeDays.length - 1].day);

    let currentDay = firstDayInList;
    while (isBefore(
        currentDay,
        lastDayInList
    ) || isEqual(
        currentDay,
        lastDayInList
    )) {
        let currentBoxOfficeDay = boxOfficeDaysByDateMap[currentDay.toLocaleDateString('en-US')] || _makeBlankBoxOfficeDay(
            currentDay
        );
        boxOfficeDaysWithMissingDaysFilled.push(
            currentBoxOfficeDay
        )

        currentDay = addDays(currentDay, 1);
    }

    return boxOfficeDaysWithMissingDaysFilled;
}

function _formatChartDollarValue(value) {
    if (value == NO_DATA_FOR_DAY) {
        return value;
    } else {
        return _renderDollarsWithCommas(value);
    }
}
class BoxOfficeChart extends React.Component {
    render() {
        let areaChart = (
            <LoadingSpinner />
        );

        if (this.props.boxOfficeDays.length) {
            areaChart = (
                <ResponsiveContainer>
                    <AreaChart
                        data={_fillInMissingDays(this.props.boxOfficeDays)}
                        margin={{top: 20, right: 0, bottom: 50, left: 30}}>

                        <XAxis
                            dataKey='day'
                            tick={<TiltedXAxisLabel />}
                            interval={'preserveStartEnd'}
                        />

                        <YAxis
                            type='number'
                            domain={[0, 'dataMax']}
                            tickFormatter={_formatChartDollarValue}
                        />

                        <Tooltip formatter={_formatChartDollarValue}/>
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