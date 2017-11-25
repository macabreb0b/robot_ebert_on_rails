import React from 'react';
import { Link } from 'react-router-dom';

// const MovieShow = ({ movie, movieId, fetchMovie }) => {
//     return (
//         <div className="">
//             <h2>{movie.title}</h2>
//             <div className="">
//                 <Link to="/">Back to Search / Index</Link>
//             </div>
//             <div className="">
//                 {movie.title}
//             </div>
//         </div>
//     );
// };

class MovieShow extends React.Component {
    componentDidMount() {
        if (this.props.movie.id == undefined) {
            this.props.fetchMovie(this.props.movieId);
        }
    }
    
    render() {
        return (
            <div className="">
                <h2>{this.props.movie.title}</h2>
                <div className="">
                    <Link to="/">Back to Search / Index</Link>
                </div>
                <div className="">
                    {this.props.movie.title}
                </div>
            </div>
        );
    }
}
export default MovieShow;