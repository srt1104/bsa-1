import React from 'react';

const ParametersFilter = props => {
    const { parametersSelected, parametersList, onParameterChange } = props;

    return (
        <ul>
            {
                parametersList.map(parameter => (
                    <li key={parameter}>
                        <input
                            type='checkbox'
                            id={parameter}
                            checked={parametersSelected.includes(parameter)}
                            onChange={() => onParameterChange(parameter)}
                        />
                        <label htmlFor={parameter}>{parameter}</label>
                    </li>
                ))
            }
        </ul>
    );
};

export default ParametersFilter;
