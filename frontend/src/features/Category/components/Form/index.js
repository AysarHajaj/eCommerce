import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGetCategories } from "../../categorySlice";

const Form = ({ id }) => {
  const [data, setData] = useState({
    id,
    name: "",
    image: "",
    deactivated_at: null,
  });
  const [initialData, setInitialData] = useState({ ...data });

  const isEdit = !!id;

  const { data: categories } = useSelector(selectGetCategories);

  useEffect(() => {
    if (isEdit) {
      const category = categories.find((item) => item.id === id) || {};
      setData({ ...data, ...category });
      setInitialData({ ...initialData, ...category });
    }
  }, []);

  return <div></div>;
};

export default Form;
