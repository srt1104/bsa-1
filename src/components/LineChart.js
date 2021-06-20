import React, { useMemo } from 'react';
import { Chart } from 'react-charts';

const LineChart = props => {
	const {
		countrySelected,
		startingFrom,
		endingAt,
		parametersSelected,
		inputData
	} = props;

    const data = useMemo(
        // for the resultant array, include only those objects whose parameters are checked
        () => parametersSelected.map(parameter => ({
            label: parameter,
            // include only those datapoints whose `year` falls between `startingFrom` and `endingAt`
            data: inputData[countrySelected][parameter].filter(([ year, value ]) => {
				return startingFrom <= year && year <= endingAt;
			})
        })),
        [countrySelected, startingFrom, endingAt, parametersSelected]
    );

    const axes = useMemo(
        () => [{
            primary: true, type: 'ordinal', position: 'bottom'
        }, {
            type: 'linear', position: 'left'
        }],
        []
    );

    return (
        <div style={{ width: '400px', height: '300px' }}>
            <Chart data={data} axes={axes} />
        </div>
    );
};

export default LineChart;
