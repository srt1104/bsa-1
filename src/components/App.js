import React, { Component } from 'react';

import CountryFilter from './CountryFilter';
import TimePeriodFilter from './TimePeriodFilter';
import ParametersFilter from './ParametersFilter';
import LineChart from './LineChart';

class App extends Component {
    constructor(props) {
        super(props);

        const { countrySelected, startingFrom, endingAt, parametersSelected } = props;

        this.state = {
            countrySelected: countrySelected || '',
            startingFrom,
            endingAt,
            parametersSelected: parametersSelected || [],
            inputData: {},
            lowestYear: startingFrom,
            highestYear: endingAt
        };
    }

    componentDidMount() {
        // fetch data from `data.json` file saved on the frontend,
        // and save the data in component state.
        fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            let lowestYear = new Date().getFullYear();
            let highestYear = 0;

            // find and set the lowest year and highest year in data,
            // used for time period filter.
            for (const country in jsonData)
                for (const parameter in jsonData[country])
                    for (const [ year, value ] of jsonData[country][parameter]) {
                        if (year < lowestYear)
                            lowestYear = year;
                        if (year > highestYear)
                            highestYear = year;
                    }

            this.setState(prevState => ({
                inputData: jsonData,
                lowestYear,
                highestYear,
                startingFrom: prevState.startingFrom ?? lowestYear,
                endingAt: prevState.endingAt ?? highestYear
            }));
        });
    }

    // everytime the state updates, encode it in url form and append it to origin.
    // this url can be used as a bookmark for later use.
    componentDidUpdate() {
        const { countrySelected, startingFrom, endingAt, parametersSelected } = this.state;
        const params = { countrySelected, startingFrom, endingAt, parametersSelected };

        const uri = encodeURIComponent(JSON.stringify(params));
        window.history.pushState(null, null, `?${uri}`);
    }

    onCountryChange = country => {
        this.setState(prevState => {
            if (!country)
                return { countrySelected: '', parametersSelected: [] };

            // if there are any common parameters between selected country and new country,
            // and which have been already selected (saved in `this.state.parametersSelected`),
            // keep them in the new `parametersSelected` array.
            const newParameters = Object.keys(prevState.inputData[country]);
            const parametersSelected = prevState.parametersSelected.filter(parameter => {
                return newParameters.includes(parameter);
            });

            return {
                countrySelected: country,
                parametersSelected
            };
        });
    };

    onStartingYearChange = year => {
        this.setState(() => ({ startingFrom: year }));
    };

    onEndingYearChange = year => {
        this.setState(() => ({ endingAt: year }));
    }

    onParameterChange = parameter => {
        this.setState(({ parametersSelected: prevParametersSelected }) => {
            const checked = prevParametersSelected.includes(parameter);

            // if the parameter was unchecked, add it to `parametersSelected` array
            if (!checked)
                return {
                    parametersSelected: [ ...prevParametersSelected, parameter ]
                };
            // else remove it from `parametersSelected` array
            else
                return {
                    parametersSelected: prevParametersSelected.filter(prevParameter => prevParameter !== parameter)
                };
        });
    };

    render() {
        const {
            countrySelected,
            startingFrom,
            endingAt,
            parametersSelected,
            inputData,
            lowestYear,
            highestYear
        } = this.state;

        // this check is needed as line map bugs out (doesn't show axis names and labels)
        // if empty `inputData` is passed as props
        const dataFetched = Object.keys(inputData).length > 0;

        return (
            <div>
                <CountryFilter
                    countrySelected={countrySelected}
                    countryList={[ '', ...Object.keys(inputData) ]}
                    onCountryChange={this.onCountryChange}
                />
                <TimePeriodFilter
                    startingFrom={startingFrom}
                    endingAt={endingAt}
                    lowestYear={lowestYear}
                    highestYear={highestYear}
                    onStartingYearChange={this.onStartingYearChange}
                    onEndingYearChange={this.onEndingYearChange}
                />
                {dataFetched && countrySelected && (
                    <ParametersFilter
                        parametersSelected={parametersSelected}
                        parametersList={Object.keys(inputData[countrySelected])}
                        onParameterChange={this.onParameterChange}
                    />
                )}
                {dataFetched && countrySelected && parametersSelected.length > 0 && (
                    <LineChart
                        countrySelected={countrySelected}
                        startingFrom={startingFrom}
                        endingAt={endingAt}
                        parametersSelected={parametersSelected}
                        inputData={inputData}
                    />
                )}
            </div>
        );
    }
}

export default App;
