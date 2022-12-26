import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorsByCategoryId, selectGetVendors } from './vendorsPageSlice';
import VendorList from '../../components/VendorList';

function VendorsPage() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetVendors);

  useEffect(() => {
    dispatch(getVendorsByCategoryId(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <VendorList vendors={data} />
    </div>
  );
}

export default VendorsPage;
