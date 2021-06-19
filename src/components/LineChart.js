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
        () => parametersSelected.map(parameter => ({
            label: parameter,
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
