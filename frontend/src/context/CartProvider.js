/* eslint-disable no-unused-vars */
import React, { createContext, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cloneData } from '../tools';

const CartContext = createContext({
  cart: undefined,
  addChoiceToCart: (vendorId, productId, choiceId) => {},
  addProductToCart: (vendorId, vendorName, productId, quantity = 1) => {},
  removeChoiceFromCart: (vendorId, productId, choiceId) => {},
  removeProductFromCart: (vendorId, productId, quantity = 1) => {},
});

const getCart = () => {
  const cart = localStorage.getItem('cart');

  if (cart) {
    return JSON.parse(cart);
  }
  return undefined;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getCart);

  const addProductToCart = useCallback(
    (vendorId, vendorName, productId, quantity = 1) => {
      const newCartData = cloneData(cart) || {};
      if (!newCartData[vendorId])
        newCartData[vendorId] = {
          date_time: new Date().getTime(),
          products: [{ productId, quantity }],
          vendorName,
        };
      else {
        const product = newCartData[vendorId]?.products?.find(
          (_product) => _product.productId === productId,
        );
        if (product) {
          const oldQuantity = +(product?.quantity || 0);
          product.quantity = oldQuantity + quantity;
        } else {
          newCartData[vendorId]?.products?.push({ productId, quantity });
        }
      }
      localStorage.setItem('cart', JSON.stringify(newCartData));
      setCart(newCartData);
    },
    [cart],
  );

  const removeProductFromCart = useCallback(
    (vendorId, productId, quantity = 1) => {
      const newCartData = cloneData(cart) || {};
      if (newCartData[vendorId]) {
        const products = newCartData[vendorId]?.products;
        const productIndex = products?.findIndex((product) => product?.productId === productId);
        if (productIndex > -1) {
          const product = newCartData[vendorId]?.products[productIndex];
          product.quantity -= quantity;
          if (product.quantity === 0) product.splice(productIndex, 1);
        }
        if (!products?.length) {
          delete newCartData[vendorId];
        }
        localStorage.setItem('cart', JSON.stringify(newCartData));
        setCart(newCartData);
      }
    },
    [cart],
  );

  const addChoiceToCart = useCallback(
    (vendorId, productId, choiceId) => {
      const newCartData = cloneData(cart) || {};
      if (newCartData[vendorId]) {
        const products = newCartData[vendorId]?.products;
        const productIndex = products?.findIndex((product) => product?.productId === productId);
        if (productIndex > -1) {
          const product = newCartData[vendorId]?.products[productIndex];
          if (!product.choices) product.choices = [choiceId];
          else product.choices?.push(choiceId);
        }
        localStorage.setItem('cart', JSON.stringify(newCartData));
        setCart(newCartData);
      }
    },
    [cart],
  );

  const removeChoiceFromCart = useCallback(
    (vendorId, productId, choiceId) => {
      const newCartData = cloneData(cart) || {};
      if (newCartData[vendorId]) {
        const products = newCartData[vendorId]?.products;
        const productIndex = products?.findIndex((product) => product?.productId === productId);
        if (productIndex > -1) {
          const product = newCartData[vendorId]?.products[productIndex];
          if (product.choices) {
            product.choices = product?.choices?.filter((choice) => choice !== choiceId);
            localStorage.setItem('cart', JSON.stringify(newCartData));
            setCart(newCartData);
          }
        }
      }
    },
    [cart],
  );

  const providerValue = useMemo(
    () => ({
      cart,
      addProductToCart,
      removeProductFromCart,
      addChoiceToCart,
      removeChoiceFromCart,
    }),
    [addChoiceToCart, addProductToCart, cart, removeChoiceFromCart, removeProductFromCart],
  );

  return <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.any,
};

export default CartContext;
