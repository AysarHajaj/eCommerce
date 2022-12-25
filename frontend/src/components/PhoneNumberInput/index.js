import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PhoneInput from './PhoneInput';

const PhoneNumberInput = React.forwardRef(({ value, onChange, ...props }, ref) => {
  const [countryPhone, setCountryPhone] = React.useState(value?.countryPhone);
  const [phoneNumber, setPhoneNumber] = React.useState(value?.phoneNumber);

  const handleCountryChange = useCallback((country) => setCountryPhone(country.phone), []);
  const handlePhoneNumberChange = useCallback((phone) => setPhoneNumber(phone), []);

  return (
    <PhoneInput
      ref={ref}
      onChangeCountry={handleCountryChange}
      onPhoneNumberChange={handlePhoneNumberChange}
      phoneNumber={phoneNumber}
      countryNum={countryPhone}
      {...props}
    />
  );
});

PhoneNumberInput.propTypes = {
  value: PropTypes.shape({
    phoneNumber: PropTypes.string,
    countryPhone: PropTypes.number,
  }),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  defaultCountryIcon: PropTypes.any,
  CountryCode: PropTypes.string,
};

export default PhoneNumberInput;
