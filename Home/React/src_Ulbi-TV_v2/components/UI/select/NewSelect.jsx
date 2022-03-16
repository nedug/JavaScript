import React from 'react';

const NewSelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}>

            <option disabled value="">{defaultValue}</option>

            {options.map(elem =>
                <option
                    key={elem.value}
                    value={elem.value}>
                    {elem.name}
                </option>)
            }
        </select>
    );
};

export default NewSelect;