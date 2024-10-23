import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SingleSelectSearchable = ({ options, label }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Autocomplete
      options={options}
      value={selectedOption}
      onChange={(event, newValue) => setSelectedOption(newValue)}
      getOptionLabel={(option) => `${option.naics_code} - ${option.naics_industry_description}`} // Customize label
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
      disableClearable
      isOptionEqualToValue={(option, value) => option.naics_code === value.naics_code}
    />
  );
};

export default SingleSelectSearchable;
