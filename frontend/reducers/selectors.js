export const sortMoviesByReleaseDate = (moviesArr) => (
    moviesArr.sort(function(a, b) {
        if (a.release_date > b.release_date) {
            return 1;
        }

        if (a.release_date < b.release_date) {
            return -1;
        }

        return 0;
    }).reverse()
);

export const userFavoriteMovies = ({ movies }) => (
    sortMoviesByReleaseDate(Object.values(movies).filter(movie => (
        movie.is_favorited
    )))
);

export const userViewedMovies = ({ movies }) => (
    sortMoviesByReleaseDate(Object.values(movies).filter(movie => (
        movie.is_viewed
    )))
);