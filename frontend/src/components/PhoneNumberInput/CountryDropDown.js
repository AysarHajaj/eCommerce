import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { getFlagEmoji } from './utils';
import countries from './countries';
import SearchInput from '../SearchInput';

export default function CountryListDropDown({ value, defaultIcon, onChange, CountryCode }) {
  const [searchText, setSearchText] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [anchorEl, setAnchorEl] = useState(null);
  const [focused, setFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const searchRef = useRef();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (CountryCode) {
      const country = countries.find((contr) => contr.code === CountryCode.toUpperCase());
      onChange(country);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CountryCode]);

  useEffect(() => {
    if (value) {
      const country = countries.find((countr) => countr.phone === +value);
      setSelectedCountry(country);
    } else setSelectedCountry(null);
  }, [value]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    setFocused(true);
  };

  const handleMenuItemClick = (country) => {
    onChange(country);
    setAnchorEl(null);
    setFocused(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFocused(false);
  };

  useEffect(() => {
    if (!open && searchText) setSearchText('');
  }, [open, searchText]);

  useEffect(() => {
    if (searchText) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (filteredCountries !== countries) setFilteredCountries(countries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    searchRef.current?.focus();
  }, [filteredCountries]);

  return (
    <div onBlur={() => setFocused(false)} className={`country-list ${focused ? 'focused' : ''}`}>
      <List component="div" onClick={handleClickListItem}>
        <ListItem
          id="country-button"
          aria-haspopup="listbox"
          component="div"
          className="country-flag"
          style={{ width: '22px', textAlign: 'left' }}
        >
          {selectedCountry ? (
            <span>{getFlagEmoji(selectedCountry?.code ?? '')}</span>
          ) : (
            defaultIcon || '🌐'
          )}
        </ListItem>
        <ListItem component="div" className="drop-icon" style={{ width: '22px', height: '22px' }}>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <ListItem className="country-phone-number" component="div">
          <span className="country-phone-number" style={{ fontSize: 13 }}>
            {selectedCountry?.phone ? (
              `+${selectedCountry?.phone}`
            ) : (
              <span style={{ color: 'rgb(0,0,0, 0.3)' }}> (+1) </span>
            )}
          </span>
        </ListItem>
      </List>
      <Menu
        id="country-list"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={open}
        onClose={handleClose}
        style={{ maxHeight: '200px' }}
        MenuListProps={{
          'aria-labelledby': 'country-button',
          role: 'listbox',
          style: {
            width: '380px',
            position: 'relatve',
            maxHeight: 'fit-content',
          },
        }}
      >
        <MenuItem
          style={{
            lineHeight: 'inherit',
            position: 'sticky',
            top: '0',
            zIndex: '1',
            backgroundColor: 'white',
            padding: '0 -10px',
          }}
          key="country-search-item"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div style={{ width: '100%' }} className="country-search-cont">
            <SearchInput ref={searchRef} onChange={setSearchText} />
          </div>
        </MenuItem>
        {filteredCountries.map((country) => (
          <MenuItem
            key={country.id}
            selected={+value === country.phone}
            onClick={(e) => {
              e.stopPropagation();
              handleMenuItemClick(country);
            }}
          >
            <span className="country-icon">{getFlagEmoji(country.code)}</span>
            <span
              style={{ fontSize: '14px', margin: ' 0 2px 0 5px', color: 'black' }}
              className="country-name"
            >
              {country.name}
            </span>
            <span
              style={{ color: 'rgba(0,0,0, .6)', marginLeft: 'auto', marginRight: '4px' }}
              className="country-phone"
            >
              +{country.phone}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

CountryListDropDown.propTypes = {
  value: PropTypes.number,
  defaultIcon: PropTypes.any,
  onChange: PropTypes.func,
  CountryCode: PropTypes.string,
};
