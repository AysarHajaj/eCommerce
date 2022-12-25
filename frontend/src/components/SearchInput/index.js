import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import usePrevious from '../../hooks/usePrevious';

const SEARCH_FIELD_COLOR = { color: '#1DD0C1' };

const TIME_TO_UPDATE_SEARCH = 600;
const SearchTextInput = React.forwardRef(({ onChange }, ref) => {
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const prevSearchText = usePrevious(searchText);

  useEffect(() => {
    let updateSearchTimeOut;
    if (prevSearchText !== searchText) {
      updateSearchTimeOut = setTimeout(() => {
        onChange(searchText);
      }, TIME_TO_UPDATE_SEARCH);
    }
    return () => {
      if (updateSearchTimeOut) clearTimeout(updateSearchTimeOut);
    };
  }, [searchText, prevSearchText, onChange]);

  return (
    <TextField
      id="employee-search"
      type="search"
      inputRef={ref}
      onChange={(e) => setSearchText(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color={focused ? 'primary' : 'secondayr'} fontSize="small" />
          </InputAdornment>
        ),
      }}
      value={searchText}
      placeholder="Search"
      style={SEARCH_FIELD_COLOR}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      fullWidth
    />
  );
});

SearchTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default React.memo(SearchTextInput);
