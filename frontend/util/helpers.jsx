import React from 'react';

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
        return day + ' ⭐️ ';
    }
    return day;
}


export function _renderIconBookmarked(isBookmarked) {
    return isBookmarked ? (
        <div className='chunky-icon' title="Click to remove from Favorites">
            <i className="fa fa-star" aria-hidden="true"></i>
        </div>
    ) : (
        <div className='chunky-icon' title="Click to add to Favorites">
            <i className="fa fa-star-o" aria-hidden="true"></i>
        </div>
    )
}

export function _renderIconSeenIt(isSeen) {
    return isSeen ? (
        <div className='chunky-icon' title="Click to mark as Not Seen" >
            <i className="fa fa-eye" aria-hidden="true"></i>
        </div>
    ) : (
        <div className='chunky-icon' title="Click to mark as Seen">
            <span className='seen-it-no'>
                <i className="fa fa-eye-slash" aria-hidden="true"></i>
            </span>
        </div>
    )
}