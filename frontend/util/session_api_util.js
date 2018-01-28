export const login = user => (
  $.ajax({
    method: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    url: '/api/session',
    data: user
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    url: '/api/users',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    },
    url: '/api/session'
  })
);