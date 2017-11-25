import React from 'react';
import { Link } from 'react-router-dom';

class MovieShow extends React.Component {
    componentDidMount() {
        if (this.props.movie.box_office_days == undefined) {
            this.props.fetchMovie(this.props.movieId);
        }
    }

    render() {
        let boxOfficeDayRows = null;
        if (this.props.movie.box_office_days) {
            boxOfficeDayRows = this.props.movie.box_office_days.map((boxOfficeDay) => {
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
                            {'$' + boxOfficeDay.bomojo_daily_gross} 
                        </td>
                        <td className="cell u-text--right">
                            {'$' + boxOfficeDay.bomojo_to_date_gross} 
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