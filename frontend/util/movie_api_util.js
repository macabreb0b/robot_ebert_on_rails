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

export const bookmarkMovie = id => (
  $.ajax({
    method: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    url: `/api/movies/${id}/bookmark`
  })
);

export const unBookmarkMovie = id => (
  $.ajax({
    method: 'DELETE',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    url: `/api/movies/${id}/unbookmark`
  })
);
