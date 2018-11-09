export const fetchMovies = data => (
    $.ajax({
        method: 'GET',
        url: '/api/movies',
        data
    })
);

export const fetchMovie = id => (
    $.ajax({
        method: 'GET',
        url: `/api/movies/${id}`,
    })
);

export const markMovieAsFavorite = id => (
    $.ajax({
        method: 'POST',
        url: `/api/movies/${id}/favorite`,
    })
);

export const markMovieAsViewed = id => (
    $.ajax({
        method: 'POST',
        url: `/api/movies/${id}/view`,
    })
);

export const markMovieAsNotFavorite = id => (
    $.ajax({
        method: 'DELETE',
        url: `/api/movies/${id}/favorite`,
    })
);

export const markMovieAsNotViewed = id => (
    $.ajax({
        method: 'DELETE',
        url: `/api/movies/${id}/view`,
    })
);