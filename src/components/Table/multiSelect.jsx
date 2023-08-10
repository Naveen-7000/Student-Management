import React, { useState } from 'react';
import { TextField, Autocomplete, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';



export default function MultiSelect({subjects,selectedNames,setSelectedNames}) {
const names = subjects.map((subject)=>subject.name);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !selectedNames.includes(inputValue) && !names.includes(inputValue)) {
      setSelectedNames([...selectedNames, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      multiple
      options={names}
      value={selectedNames}
      onChange={(_, newValue) => setSelectedNames(newValue)}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      disableCloseOnSelect
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent form submission
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Multiple Autocomplete"
          placeholder="Multiple Autocomplete"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleInputConfirm();
            }
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: 'space-between' }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}
