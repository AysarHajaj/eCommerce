import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveVendors, selectGetVendors } from './vendorsPageSlice';
import VendorList from '../../components/VendorList';

function VendorsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetVendors);

  useEffect(() => {
    dispatch(getActiveVendors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <VendorList vendors={data} />;
}

export default VendorsPage;
