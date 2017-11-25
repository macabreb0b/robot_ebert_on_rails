export const asArray = ({ movies }) => (
  Object.keys(movies).map(key => movies[key])
);