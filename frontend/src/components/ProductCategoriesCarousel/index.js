/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';

function ProductCategoriesCarousel({ categories }) {
  return (
    <section className="sections container-fluid mx-3 border-top border-bottom pt-3 pb-3">
      <div className="row">
        <div className="col">
          <div className="swiper categories-swiper">
            <div className="swiper-container category-wrapper swiper-theme appear-animate-visible">
              <Carousel
                data={categories.map((category) => (
                  <div
                    key={category.id}
                    className="swiper-slide category category-ellipse app-category margin-top-important"
                  >
                    <figure className="category-media">
                      <a>
                        <img
                          src={category.image}
                          alt="Category"
                          className="category-img"
                          style={{ backgroundColor: '#5C92C0' }}
                        />
                      </a>
                    </figure>
                    <div className="category-content">
                      <h4 className="category-name">
                        <a>{category.name}</a>
                      </h4>
                    </div>
                  </div>
                ))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ProductCategoriesCarousel.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default ProductCategoriesCarousel;
