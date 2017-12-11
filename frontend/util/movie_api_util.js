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
    url: `/api/movies/${id}`
  })
);
