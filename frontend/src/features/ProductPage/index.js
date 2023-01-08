/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct, selectGetSingleProduct } from './productPageSlice';
import ProductList from '../../components/ProductList';
import ProductCategoriesCarousel from '../../components/ProductCategoriesCarousel';
import './style.scss';
import useCart from '../../hooks/useCart';

function ProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetSingleProduct);
  const { addProductToCart } = useCart();

  useEffect(() => {
    dispatch(getSingleProduct(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="page-content w-100">
      <div className="container-fluid pt-5 mt-5">
        <div className="row d-flex justify-content-center">
          <div className="main-content">
            <div className="product product-single row bg-light product-panels food-panel">
              <div className="col-md-6 mb-4 mb-md-8">
                <div className="product-gallery product-gallery-sticky">
                  <div
                    className="swiper-container product-single-swiper swiper-theme nav-inner"
                    data-swiper-options="{
                                            'navigation': {
                                                'nextEl': '.swiper-button-next',
                                                'prevEl': '.swiper-button-prev'
                                            }
                                        }"
                  >
                    <div className="swiper-wrapper row cols-1 gutter-no">
                      <div className="swiper-slide">
                        <figure className="product-image">
                          <img
                            src={data.image}
                            data-zoom-image={data.image}
                            alt=""
                            width="800"
                            height="900"
                          />
                        </figure>
                      </div>
                    </div>

                    <a className="product-gallery-btn product-image-full">
                      <i className="w-icon-zoom" />
                    </a>
                  </div>
                  <div className="product-thumbs-wrap swiper-container">
                    <div className="product-thumbs swiper-wrapper row cols-4 gutter-sm" />
                    <button className="swiper-button-next" />
                    <button className="swiper-button-prev" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-6 mb-md-8">
                <div className="product-details" data-sticky-options="{'minWidth': 767}">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1
                      className="product-title"
                      style={{
                        color: '#5f4da0',
                      }}
                    >
                      {data.english_name}
                    </h1>

                    <div className="product-link-wrapper d-flex">
                      <a className="btn-product-icon btn-wishlist w-icon-heart">
                        <span />
                      </a>
                    </div>
                  </div>
                  <div className="ratings-container">
                    <div className="ratings-full">
                      <span className="ratings" style={{ width: '80%' }} />
                      <span className="tooltiptext tooltip-top" />
                    </div>
                    <a className="rating-reviews">(3 Reviews)</a>
                  </div>
                  <div className="product-bm-wrapper">
                    <figure className="brand">
                      <img
                        src={data?.product_category?.image}
                        alt="Brand"
                        width="105"
                        height="48"
                      />
                    </figure>
                    <div className="product-meta">
                      <div className="product-categories">
                        Category:
                        <span className="product-category">
                          <a>{data?.product_category?.name}</a>
                        </span>
                      </div>
                      {/* <div className="product-sku">
                        SKU: <span>MS46891340</span>
                      </div> */}
                    </div>
                  </div>

                  <hr className="product-divider" />

                  <div className="product-price d-flex justify-content-between align-items-center mb-0">
                    <ins
                      style={{
                        color: '#5f4da0',
                      }}
                      className="new-price"
                    >
                      {data.price} AED
                    </ins>
                  </div>

                  <hr className="product-divider" />
                  <div className="product-short-desc mt-4">
                    <p>{data.english_description}</p>
                  </div>
                  <hr className="product-divider" />

                  {/* <div className="product-form product-variation-form product-size-swatch">
                    <label className="mb-1">Size:</label>
                    <div className="flex-wrap d-flex align-items-center product-variations">
                      <a href="#" className="size">
                        Small
                      </a>
                      <a href="#" className="size">
                        Medium
                      </a>
                      <a href="#" className="size">
                        Large
                      </a>
                      <a href="#" className="size">
                        Extra Large
                      </a>
                    </div>
                    <a href="#" className="product-variation-clean">
                      Clean All
                    </a>
                  </div> */}

                  {/* <div className="product-variation-price">
                    <span />
                  </div>

                  <hr className="product-divider" /> */}

                  {/* Add On */}
                  {data?.product_choice_groups &&
                    data?.product_choice_groups.map((group) => (
                      <div key={group.id} className="row mb-3">
                        <div className="col">
                          <div className="row">
                            <div className="col px-0">
                              <h4
                                style={{
                                  color: '#5f4da0',
                                }}
                                className="sec-title"
                              >
                                {group.english_name}
                              </h4>
                            </div>
                          </div>
                          {group?.product_choices &&
                            group.product_choices.map((choice) => (
                              <div key={choice.id} className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                  <div className="form-group my-form-group">
                                    <input type="checkbox" className="custom-checkbox" id="opt1" />
                                    <label className="options-label">
                                      {choice.english_name}{' '}
                                      {choice.price && <span>({choice.price})</span>}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}

                  {/* Cheese */}
                  {/* <div className="row mb-5">
                    <div className="col">
                      <div className="row">
                        <div className="col px-0">
                          <h4 className="sec-title">Cheese(Choose items from the list)</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt7" />
                            <label for="opt7" className="options-label">
                              Tomato
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt8" />
                            <label for="opt8" className="options-label">
                              Lettuce
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt9" />
                            <label for="opt9" className="options-label">
                              No Lettuce
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt10" />
                            <label for="opt10" className="options-label">
                              American Cheese (2.00)
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt11" />
                            <label for="opt11" className="options-label">
                              No American Cheese
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* Cheese  */}
                  {/* <div className="row mb-5">
                    <div className="col">
                      <div className="row">
                        <div className="col px-0">
                          <h4 className="sec-title">Drinks(Choose items from the list)</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt12" />
                            <label for="opt12" className="options-label">
                              Pepsi
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt13" />
                            <label for="opt13" className="options-label">
                              Cocacola
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group my-form-group">
                            <input type="checkbox" className="custom-checkbox" id="opt14" />
                            <label for="opt14" className="options-label">
                              Mountain Dew
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="fix-bottom product-sticky-content sticky-content">
                    <div className="product-form container">
                      <button
                        onClick={() => addProductToCart(data?.user_id, 'aysar', data?.id)}
                        className="btn btn-primary btn-cart w-100"
                      >
                        <i className="w-icon-cart" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
