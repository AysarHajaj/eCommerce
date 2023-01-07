/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/publicPaths';
import Carousel from '../Carousel';
import './styles.scss';

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
            <Carousel
              itemClassName="category-ellipse"
              wrapperClassName="category-wrapper appear-animate-visible"
              data={categories.map((category) => (
                <div key={category.id}>
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
                  <div
                    onClick={() => navigate(ROUTES.VENDORS_PAGE.dynamicPath(category.id))}
                    className="category-content"
                  >
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
    </section>
  );
}

ShopCategoriesCarousel.propTypes = {
  categories: PropTypes.array.isRequired,
};
export default ShopCategoriesCarousel;
