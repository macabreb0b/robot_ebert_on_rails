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


const TiltedXAxisLabel = (props) => (
    <text 
        x={props.x} 
        y={props.y + 6.0} 
        style={{
            textAnchor: 'end'
        }}
        fill={'#666'}
        transform={`rotate(-45 ${props.x} ${props.y})`}>

        <tspan>{props.payload.value}</tspan>
    </text>
)

function _renderDollarsWithCommas(amount) {
    return "$" + amount.toLocaleString(
        undefined,
        { minimumFractionDigits: 0 }
    );
}

const YAxisLabel = (props) => {
    return (
        <text
            x={props.x}
            y={props.y + 4}
            fill={'#666'}
            style={{
                textAnchor: props.textAnchor
            }}
        >{_renderDollarsWithCommas(props.payload.value)}</text>
    )
}


class MovieShow extends React.Component {
    componentDidMount() {
        if (this.props.movie.box_office_days == undefined) {
            this.props.fetchMovie(this.props.movieId);
        }
    }

    render() {
        let boxOfficeDayRows = null;
        let sortedBoxOfficeDays = [];

        if (this.props.movie.box_office_days) {
            sortedBoxOfficeDays = this.props.movie.box_office_days.sort(function(a, b) {
                return new Date(a.day) - new Date(b.day);
            })
            boxOfficeDayRows = sortedBoxOfficeDays.map((boxOfficeDay) => {
                return (
                    <tr className="row" key={boxOfficeDay.id}>
                        <td className="cell u-nowrap">
                            {boxOfficeDay.day}
                        </td>
                        <td className="cell u-text--right">
                            {boxOfficeDay.metacritic_score}
                        </td>
                        <td className="cell u-text--right">
                            {boxOfficeDay.imdb_rating}
                        </td>
                        <td className="cell u-text--right">
                            {boxOfficeDay.tomato_meter}
                        </td>
                        <td className="cell u-text--right">
                            {boxOfficeDay.bomojo_rank} 
                        </td>
                        <td className="cell u-text--right">
                            {_renderDollarsWithCommas(boxOfficeDay.bomojo_daily_gross)} 
                        </td>
                        <td className="cell u-text--right">
                            {_renderDollarsWithCommas(boxOfficeDay.bomojo_to_date_gross)} 
                        </td>
                    </tr>
                )
            })
        }
        
        return (
            <div className="">
                <h2>{this.props.movie.title}</h2>
                <Link to="/">Back to Search / Index</Link>
                
                <div className="">
                    <div>
                        <span className="label">Year:</span>
                        {' '}
                        <strong>{this.props.movie.year}</strong>
                    </div>
                    <div>
                        <span className="label">Release date:</span>
                        {' '}
                        <strong>{this.props.movie.release_date}</strong>
                    </div>
                    <div>
                        <span className="label">Rating:</span>
                        {' '}
                        <strong>{this.props.movie.mpaa_rating}</strong>
                    </div>

                    <div className="chart-container" style={{position: 'relative'}}>
                        <AreaChart 
                            width={800} 
                            height={400} 
                            data={sortedBoxOfficeDays}
                            margin={{top: 20, right: 0, bottom: 50, left: 50}}>

                            <XAxis 
                                dataKey="day" 
                                tick={<TiltedXAxisLabel />} 
                                interval={0}
                            />

                            <YAxis 
                                type="number" 
                                domain={[0, 'dataMax']} 
                                tick={<YAxisLabel />}
                            />

                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="bomojo_to_date_gross" 
                                fill="#FFF8DC" 
                                stroke="#FFF8DC"
                                strokewidth={2} />
                            <Area 
                                type="monotone" 
                                dataKey="bomojo_daily_gross" 
                                stroke="#8884d8" 
                                strokewidth={2} 
                                fillOpacity={0}/>

                            
                        </AreaChart>
                    </div>

                    <table className="table box-office-days">
                        <thead>
                            <tr className="row header">
                                <td className="cell">
                                    Date
                                </td>
                                <td className="cell">
                                    Metacritic
                                </td>
                                <td className="cell">
                                    IMDB
                                </td>
                                <td className="cell">
                                    Tomatometer
                                </td>
                                <td className="cell">
                                    Box Office Rank
                                </td>
                                <td className="cell">
                                    Single Day Box Office
                                </td>
                                <td className="cell">
                                    All-Time Box Office
                                </td>
                            </tr>
                        </thead>
                        <tbody> 
                            {boxOfficeDayRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default MovieShow;