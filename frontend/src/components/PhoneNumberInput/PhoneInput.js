import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import CountryListDropDown from './CountryDropDown';
import './style.scss';
import { omit } from '../../utils/index.ts';

const PhoneNumberInput = React.forwardRef(
  ({ onChangeCountry, onPhoneNumberChange, isValid, ...props }, ref) => {
    const { variant, countryNum, phoneNumber, defaultCountryIcon, CountryCode, ...rest } = props;
    const hasValue = !!countryNum || !!phoneNumber;

    const handleCountryChange = useCallback(
      (country) => onChangeCountry(country),
      [onChangeCountry],
    );

    const handlePhoneNumberChange = useCallback(
      (e) => onPhoneNumberChange(e.target.value),
      [onPhoneNumberChange],
    );

    return (
      <div
        style={rest.style}
        className={`phone-number-input-cont ${variant === 'outlined' ? 'outlined' : ''}`}
      >
        <TextField
          placeholder="Phone number"
          onChange={handlePhoneNumberChange}
          {...omit(rest, ['style'])}
          value={phoneNumber || ''}
          ref={ref}
          variant={variant}
          className="phone-number-input"
          InputProps={{
            endAdornment: !!isValid && hasValue && <span>✅</span>,
            startAdornment: (
              <CountryListDropDown
                value={countryNum}
                defaultIcon={defaultCountryIcon}
                onChange={handleCountryChange}
                CountryCode={CountryCode}
              />
            ),
          }}
        />
      </div>
    );
  },
);

PhoneNumberInput.propTypes = {
  countryNum: PropTypes.number,
  phoneNumber: PropTypes.string,
  onChangeCountry: PropTypes.func,
  onPhoneNumberChange: PropTypes.func,
  name: PropTypes.string,
  isValid: PropTypes.bool,
  variant: PropTypes.string,
  defaultCountryIcon: PropTypes.any,
  CountryCode: PropTypes.string,
};

export default React.memo(PhoneNumberInput);
