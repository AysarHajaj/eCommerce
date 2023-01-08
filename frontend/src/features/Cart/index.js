/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
// import Actions from './Actions';
// import Form from './Form';
// import SideBar from './SideBar';
import Table from './Table';
import useCart from '../../hooks/useCart';
import './style.scss';
import apis from '../../api';

export default function Cart() {
  const { cart } = useCart();
  const [selectedVendor, setSelectedVendor] = useState(0);
  const [products, setProducts] = useState([]);
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const vendorsData = useMemo(
    () => Object.keys(cart || {}).map((vendorId) => ({ ...cart[vendorId], vendorId })),
    [cart],
  );

  const fetchData = useCallback(async (_products, _choices) => {
    setIsLoading(true);
    const data = await Promise.all([
      (apis.getMultiProducts(_products), apis.getMultiProductChoices(_choices)),
    ]);
    const poductsRes = await apis.getMultiProducts(_products);
    const choicesRess = apis.getMultiProductChoices(_products);
    setProducts(poductsRes?.data?.result);
    setChoices(choicesRess?.data?.result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (vendorsData?.length && !selectedVendor) setSelectedVendor(vendorsData[0]?.vendorId);
    if (!vendorsData?.length) setSelectedVendor('');
  }, [selectedVendor, vendorsData]);

  useEffect(() => {
    const productIds = new Set();
    const _choices = new Set();
    vendorsData.forEach((vendor) => {
      vendor?.products?.forEach((product) => {
        productIds.add(product?.productId);
        _choices.add(...(product?.choices || []));
      });
    });
    fetchData(Array.from(productIds), Array.from(_choices));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <div style={{ padding: '10px' }} className="page-content">
      <div className="container">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="row">
            <div className="col-lg-8 pr-lg-4 mb-6">
              <div className="cart-page-header">
                <h2>Products In Cart</h2>
                {vendorsData.length > 1 && (
                  <FormControl style={{ marginTop: '10px' }}>
                    <InputLabel id="vendor-label">Shop</InputLabel>
                    <Select
                      labelId="vendor-label"
                      label="Shop"
                      onChange={(e) => setSelectedVendor(+e.target.value)}
                      value={selectedVendor}
                    >
                      {vendorsData.map((vendor) => (
                        <MenuItem key={vendor.vendorId} value={vendor.vendorId}>
                          {vendor.vendorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
              {!vendorsData?.length && !isLoading && (
                <div>
                  {' '}
                  <i>No data</i>{' '}
                </div>
              )}
              <Table
                data={vendorsData}
                selectedVendor={selectedVendor}
                products={products}
                choices={choices}
              />
              {/* <Actions /> */}
              {/* <Form /> */}
            </div>
            {/* <SideBar /> */}
          </div>
        )}
      </div>
    </div>
  );
}
