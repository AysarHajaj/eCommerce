/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';

function ProductCategoriesCarousel({ categories }) {
  return (
    <div className="shop-default-category category-ellipse-section mb-6">
      <div
        className="swiper-container swiper-theme shadow-swiper"
        data-swiper-options="{
      'spaceBetween': 20,
      'slidesPerView': 2,
      'breakpoints': {
          '480': {
              'slidesPerView': 3
          },
          '576': {
              'slidesPerView': 4
          },
          '768': {
              'slidesPerView': 6
          },
          '992': {
              'slidesPerView': 7
          },
          '1200': {
              'slidesPerView': 8,
              'spaceBetween': 30
          }
      }
  }"
      >
        <div
          style={{ overflow: 'auto' }}
          className="swiper-wrapper row gutter-lg cols-xl-8 cols-lg-7 cols-md-6 cols-sm-4 cols-xs-3 cols-2"
        >
          {categories.map((category) => (
            <div className="swiper-slide category-wrap">
              <div className="category category-ellipse">
                <figure className="category-media">
                  <a href="shop-banner-sidebar.html">
                    <img
                      src={category.image}
                      alt="Category"
                      width="190"
                      height="190"
                      style={{ backgroundColor: '#5C92C0' }}
                    />
                  </a>
                </figure>
                <div className="category-content">
                  <h4 className="category-name">
                    <a href="shop-banner-sidebar.html">{category.name}</a>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ProductCategoriesCarousel.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default ProductCategoriesCarousel;
