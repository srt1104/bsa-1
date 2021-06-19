import React from 'react';

const CountryFilter = props => {
    const { countrySelected, countryList, onCountryChange } = props;

    return (
        <select
            value={countrySelected}
            onChange={e => onCountryChange(e.target.value)}
        >
            {
                countryList.map(country => (
                    <option key={country} value={country}>{country || 'Select Country'}</option>
                ))
            }
        </select>
    );
};

export default CountryFilter;
