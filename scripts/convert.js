const fs = require('fs');

// mapping to convert category to parameter.
const CATEGORY_TO_PARAMETER = {
    'carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent': 'CO2',
    'greenhouse_gas_ghgs_emissions_including_indirect_co2_without_lulucf_in_kilotonne_co2_equivalent': 'GHG + CO2',
    'greenhouse_gas_ghgs_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent': 'GHG',
    'hydrofluorocarbons_hfcs_emissions_in_kilotonne_co2_equivalent': 'HFC',
    'methane_ch4_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent': 'CH4',
    'nitrogen_trifluoride_nf3_emissions_in_kilotonne_co2_equivalent': 'NF3',
    'nitrous_oxide_n2o_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent': 'N2O',
    'perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent': 'PFC',
    'sulphur_hexafluoride_sf6_emissions_in_kilotonne_co2_equivalent': 'SF6',
    'unspecified_mix_of_hydrofluorocarbons_hfcs_and_perfluorocarbons_pfcs_emissions_in_kilotonne_co2_equivalent': 'HFC + PFC'
};

const csv = fs.readFileSync('greenhouse_gas_inventory_data_data.csv');
const rows = csv.toString().split('\n');

/**
 * Cleaning and restructuring the data in .csv file, temporarily saving it in object `result`,
 * before writing the object data in `data.json` file.
 *
 * The `result` object will be in the following form:
 * {
 *      'country1': {
 *          'parameter1': [[year1, value1], [year2, value2], ..., [yearN1, valueN1]],
 *          'parameter2': [[year1, value1], [year2, value2], ..., [yearN2, valueN2]],
 *          ...
 *          'parameterM': [[year1, value1], [year2, value2], ..., [yearNM, valueNM]]
 *      },
 *      'country2': {
 *          'parameter1': [[year1, value1], [year2, value2], ..., [yearN1, valueN1]],
 *          'parameter2': [[year1, value1], [year2, value2], ..., [yearN2, valueN2]],
 *          ...
 *          'parameterM': [[year1, value1], [year2, value2], ..., [yearNM, valueNM]],
 *      }
 *      ...
 *      ...
 *      ...
 *      'countryX': {
 *          'parameter1': [[year1, value1], [year2, value2], ..., [yearN1, valueN1]],
 *          'parameter2': [[year1, value1], [year2, value2], ..., [yearN2, valueN2]],
 *          ...
 *          'parameterM': [[year1, value1], [year2, value2], ..., [yearNM, valueNM]],
 *      }
 */
const result = {};
for (let i = 1; i < rows.length - 1; ++i) {
    const row = rows[i].split(',');
    const country = row[0];
    const year = parseInt(row[1]);
    const value = parseFloat(row[2]);
    const parameter = CATEGORY_TO_PARAMETER[row[3]];

    if (!result[country])
        result[country] = {};

    if (!result[country][parameter])
        result[country][parameter] = [];

    result[country][parameter].push([year, value]);
}

const json = JSON.stringify(result, undefined, 4);
fs.writeFileSync('data.json', json);
