import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ComposedChart, 
    Line, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    AreaChart, 
    Brush,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { _renderDollarsWithCommas } from '../util/helpers';
import LoadingSpinner from './loading_spinner';
import TiltedXAxisLabel from './tilted_axis_label';

// https://color.hailpixel.com/#DA98DD,5C38A8,75D1C6,CBD279,BD62CB,BF4A40,349D4D,BB3E6A,491F18,5D2060,7262CB,D07C71,7E562A
const LINE_COLORS = Object.values({
    pink: '#DA98DD',
    royal: '#5C38A8',
    teal: '#75D1C6',
    chartreuse: '#CBD279',
    lightPurple: '#BD62CB',
    red: '#BF4A40',
    green: '#349D4D',
    magenta: '#BB3E6A',
    darkBrown: '#491F18',
    darkPurple: '#5D2060',
    babyBlue: '#7262CB',
    peach: '#D07C71',
    lightBrown: '#7E562A'
})

function _sortByAmount(a, b) {
    if (a.value > b.value) {
        return -1
    } else if (a.value < b.value) {
        return 1
    }

    return 0
}

function _makeChartData(boxOfficeDaysById) {
    const dataByDate = {};
    Object.values(boxOfficeDaysById).forEach(boxOfficeDay => {
        if (!dataByDate[boxOfficeDay.day]) {
            dataByDate[boxOfficeDay.day] = { day: boxOfficeDay.day }
        }
        const dataForDay = dataByDate[boxOfficeDay.day];

        dataForDay[boxOfficeDay.movie_id] = boxOfficeDay.bomojo_daily_gross;
    })
    // need to create object with keys of movie id, value of 'boxOfficeDay.bomojo_daily_gross'
    return Object.values(dataByDate).sort((a, b) => {
        if (a.day > b.day) {
            return 1;
        } else if (a.day < b.day) {
            return -1
        }
    })
}

class BoxOfficeTimeline extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }


    componentDidMount() {
        if (!this.props.didFetchTimeline) {
            this.props.fetchTimeline();
        }
    }

    render() {
        let areaChart = (
            <LoadingSpinner />
        );

        const chartData = _makeChartData(this.props.boxOfficeDays)
        const movieIdsForCurrentScope = new Set(Object.values(this.props.boxOfficeDays).map(boxOfficeDay => (
            boxOfficeDay.movie_id
        )))
        const chartLines = [];
        movieIdsForCurrentScope.forEach((id, index) => {
            const movie = this.props.movies[id]
            const lineColor = LINE_COLORS[index % LINE_COLORS.length]
            
            chartLines.push(
                <Area 
                    type='monotone' 
                    key={movie.id}
                    dataKey={movie.id} 
                    name={movie.title}
                    stroke={lineColor}
                    fill={lineColor}
                    strokewidth={2}
                    fillOpacity={0.1} />
            )
        })

        if (chartData.length) {
            areaChart = (
                <ResponsiveContainer>
                    <AreaChart 
                        data={chartData}
                        margin={{top: 20, right: 30, bottom: 0, left: 30}}>

                        <XAxis 
                            dataKey='day' 
                            height={70}
                            tick={<TiltedXAxisLabel />} 
                            interval={'preserveStartEnd'}
                        />

                        <YAxis 
                            type='number' 
                            domain={[0, 'dataMax']} 
                            tickFormatter={_renderDollarsWithCommas}
                        />

                        <Tooltip 
                            itemSorter={_sortByAmount}
                            formatter={_renderDollarsWithCommas}/>
                        {chartLines}

                    </AreaChart>
                </ResponsiveContainer>
            )
        }

        return (
            <section>
                <section className='wrapper'>
                    
                </section>
                <section>
                    <h3 style={{textAlign: 'center'}}>
                        Daily box office gross (for top 12 movies by gross per day)
                    </h3>
                    <div 
                        className='chart-container' 
                        style={{width: '100%', height: 500, position: 'relative'}}>

                        {areaChart}
                    </div>
                </section>
            </section>
        )
    }
}
export default BoxOfficeTimeline;