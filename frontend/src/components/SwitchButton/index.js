import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const SwitchButton =  ({ checked: isChecked, changeStatus }) => {
  const [checked, setChecked] = React.useState(isChecked);
  const [label, setLabel] = React.useState("");

  useEffect(() => {
    setLabel(checked ? "Active" : "Inactive");
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    changeStatus(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={label}
    />
  );
};


export default SwitchButton;