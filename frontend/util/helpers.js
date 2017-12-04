
export function _renderDollarsWithCommas(amount) {
    return '$' + amount.toLocaleString(
        undefined,
        { minimumFractionDigits: 0 }
    );
}

export function _renderBoxOfficeDay(day, movieReleaseDay) {

    const dayAsDate = new Date(day);
    const movieReleaseDayAsDate = new Date(movieReleaseDay);

    // if it's the release day, add a star emoji
    if (dayAsDate.getTime() == movieReleaseDayAsDate.getTime()) {
        return day + ' ⭐️ ' 
    }
    return day
}


