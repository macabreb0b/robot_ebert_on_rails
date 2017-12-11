export const fetchTimeline = data => (
  $.ajax({
    method: 'GET',
    url: 'api/timeline',
    data
  })
);