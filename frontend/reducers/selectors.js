export const asSortedArray = ({ movies }) => (
    Object.keys(movies).map(key => movies[key]).sort(function(a, b) {
        if (a.release_date > b.release_date) {
            return 1
        }

        if (a.release_date < b.release_date) {
            return -1
        }

        return 0
    }).reverse()
);