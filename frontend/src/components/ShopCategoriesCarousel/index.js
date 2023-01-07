/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/publicPaths';
import './styles.scss';

function ShopCategoriesCarousel({ categories }) {
  const navigate = useNavigate();
  const carouselRef = useRef();
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState();
  const [scrollLeft, setScrollLeft] = useState();

  const handleMouseDown = useCallback((e) => {
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    carouselRef.current.classList.add('active');
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setIsDown(false);
    carouselRef.current.classList.remove('active');
  }, []);

  const handleMouseUp = useCallback((e) => {
    setIsDown(false);
    carouselRef.current.classList.remove('active');
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = x - startX;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDown, scrollLeft, startX],
  );

  useEffect(() => {
    carouselRef.current.addEventListener('mousedown', handleMouseDown);
    carouselRef.current.addEventListener('mouseleave', handleMouseLeave);
    carouselRef.current.addEventListener('mouseup', handleMouseUp);
    carouselRef.current.addEventListener('mousemove', handleMouseMove);
    const prevRef = carouselRef.current;
    return () => {
      prevRef.removeEventListener('mousedown', handleMouseDown);
      prevRef.removeEventListener('mouseleave', handleMouseLeave);
      prevRef.removeEventListener('mouseup', handleMouseUp);
      prevRef.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseDown, handleMouseLeave, handleMouseMove, handleMouseUp]);

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
              <div
                ref={carouselRef}
                className="items swiper-wrapper row cols-xl-6 cols-lg-5 cols-md-4 cols-sm-3 cols-2 d-flex justify-content-center"
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => navigate(ROUTES.VENDORS_PAGE.dynamicPath(category.id))}
                    className="item swiper-slide category category-ellipse app-category margin-top-important"
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
