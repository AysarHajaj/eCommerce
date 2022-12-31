/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/publicPaths';

function ShopCategoriesCarousel({ categories }) {
  const navigate = useNavigate();

  return (
    <section className="sections container-fluid mx-3 border-top border-bottom pt-3 pb-3">
      <div className="row">
        <div className="col">
          <h2 className="title text-left pt-1 mb-5 appear-animate-visible margin-bottom-important">
            <i className="bi bi-basket mx-3" />
            Multi Categories
          </h2>

          <div className="swiper categories-swiper">
            <div className="swiper-container category-wrapper swiper-theme appear-animate-visible">
              <div className="swiper-wrapper row cols-xl-6 cols-lg-5 cols-md-4 cols-sm-3 cols-2 d-flex justify-content-center">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => navigate(ROUTES.VENDORS_PAGE.dynamicPath(category.id))}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ShopCategoriesCarousel.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default ShopCategoriesCarousel;
