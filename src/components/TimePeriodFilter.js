import React from 'react';

const TimePeriodFilter = props => {
    const {
        startingFrom,
        endingAt,
        lowestYear,
        highestYear,
        onStartingYearChange,
        onEndingYearChange
    } = props;

    const getYears = (from, till) => {
        const years = [];

        while (from <= till) {
            years.push(from);
            ++from;
        }

        return years;
    }

    return (
        <div>
            <select
                value={startingFrom}
                onChange={e => onStartingYearChange(e.target.value)}
            >
                {
                    getYears(lowestYear, endingAt).map(year => (
                        <option key={year}>{year}</option>
                    ))
                }
            </select>
            {'-'}
            <select
                value={endingAt}
                onChange={e => onEndingYearChange(e.target.value)}
            >
                {
                    getYears(startingFrom, highestYear).map(year => (
                        <option key={year}>{year}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default TimePeriodFilter;
