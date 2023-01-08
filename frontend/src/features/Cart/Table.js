/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, IconButton, Typography } from '@mui/material';
import useCart from '../../hooks/useCart';

function Table({ data, selectedVendor, products, choices }) {
  const { addProductToCart, removeProductFromCart } = useCart();

  const vendorOrder = useMemo(
    () => data?.find((vendor) => +(vendor?.vendorId || 0) === +selectedVendor),
    [data, selectedVendor],
  );

  return (
    <table className="shop-table cart-table">
      <thead>
        <tr>
          <th colSpan={2} className="product-name">
            <span>Product</span>
          </th>
          <th className="product-price">
            <span>Price</span>
          </th>
          <th className="product-quantity">
            <span>Quantity</span>
          </th>
          <th className="product-subtotal">
            <span>Subtotal</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {vendorOrder?.products?.map(({ productId, quantity }) => {
          const product = products?.find((p) => p.id === productId);
          if (!product) return null;

          return (
            <tr>
              <td className="product-thumbnail">
                <div className="p-relative">
                  <Avatar src={product?.image} />
                </div>
              </td>
              <td>
                <Typography>{product.english_name}</Typography>
              </td>
              <td className="product-price">
                <span className="amount">{product?.price}</span>
              </td>
              <td className="product-quantity">
                <div>
                  <IconButton
                    onClick={() => removeProductFromCart(product?.user_id, product?.id)}
                    variant="contained"
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    onClick={() => addProductToCart(product?.user_id, 'starbucks', product.id)}
                    variant="contained"
                  >
                    <AddIcon color="primary" />
                  </IconButton>
                </div>
              </td>
              <td className="product-subtotal">
                <span className="amount">{(product?.price || 0) * quantity}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
      {!vendorOrder?.products?.length && (
        <tfoot>
          <tr>
            <th colSpan={5}>
              <i style={{ fontWeight: 'normal' }}>No Rows</i>
            </th>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  selectedVendor: PropTypes.any,
  products: PropTypes.array,
  choices: PropTypes.array,
};

export default Table;
