import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import formUtils from './formUtils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiTextField-root': {
    flexBasis: '45%',
    marginTop: '10px',
  },
}));

function ProductGroupChoicesDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

ProductGroupChoicesDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProductGroupChoices(props) {
  const { productName, initialValues } = props;
  const [data, setData] = React.useState({ ...formUtils.initialValues });

  const handleChange = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  React.useEffect(() => {
    if (initialValues) setData({ ...data, ...initialValues });
  }, [initialValues]);

  React.useEffect(() => {
    if (!props.open) setData({ ...formUtils.initialValues });
  }, [props.open]);

  return (
    <div>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="product-group-choices-title"
        open={props.open}
      >
        <DialogTitle id="product-group-choices-title" onClose={props.handleClose}>
          Add Product Group Choices {productName ? `: ${productName}` : ''}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="English Name"
            name="english_name"
            value={data.english_name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Arabic Name"
            name="arabic_name"
            value={data.arabic_name}
            onChange={handleChange}
          />
          <TextField
            label="Min Number"
            name="min_number"
            type="number"
            value={data.min_number}
            onChange={handleChange}
          />

          <TextField
            label="Max Number"
            name="max_number"
            type="number"
            value={data.max_number}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={
              !data.english_name ||
              data.max_number <= 0 ||
              data.min_number < 0 ||
              data.min_number > data.max_number ||
              (!!initialValues && formUtils.isEqual(data, initialValues))
            }
            autoFocus
            onClick={() => props.onSubmit(data)}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

ProductGroupChoices.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  productName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};
