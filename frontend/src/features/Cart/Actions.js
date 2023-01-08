/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable arrow-body-style */
import { Button } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/function-component-definition
const Actions = () => {
  return (
    <div className="cart-action mb-6">
      <a href="#" className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto">
        <i className="w-icon-long-arrow-left" />
        Continue Shopping
      </a>
      <Button
        type="submit"
        className="btn btn-rounded btn-default btn-clear"
        name="clear_cart"
        value="Clear Cart"
      >
        Clear Cart
      </Button>
      <Button
        type="submit"
        className="btn btn-rounded btn-update disabled"
        name="update_cart"
        value="Update Cart"
      >
        Update Cart
      </Button>
    </div>
  );
};

export default Actions;
