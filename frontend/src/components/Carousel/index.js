/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './style.scss';

function Carousel({ data, wrapperClassName, sliderClassName, itemClassName }) {
  const carouselRef = useRef();

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const end = useCallback(() => {
    isDown.current = false;
    carouselRef.current.classList.remove('active');
  }, []);

  const start = useCallback((e) => {
    isDown.current = true;
    carouselRef.current.classList.add('active');
    startX.current = e.pageX || e.touches[0].pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  }, []);

  const move = useCallback((e) => {
    if (!isDown.current) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - carouselRef.current.offsetLeft;
    const dist = x - startX.current;
    carouselRef.current.scrollLeft = scrollLeft.current - dist;
  }, []);

  useEffect(() => {
    carouselRef.current.addEventListener('mousedown', start);
    carouselRef.current.addEventListener('touchstart', start);

    carouselRef.current.addEventListener('mousemove', move);
    carouselRef.current.addEventListener('touchmove', move);

    carouselRef.current.addEventListener('mouseleave', end);
    carouselRef.current.addEventListener('mouseup', end);
    carouselRef.current.addEventListener('touchend', end);

    const prevRef = carouselRef.current;
    return () => {
      prevRef.addEventListener('mousedown', start);
      prevRef.addEventListener('touchstart', start);
      prevRef.addEventListener('mousemove', move);
      prevRef.addEventListener('touchmove', move);
      prevRef.addEventListener('mouseleave', end);
      prevRef.addEventListener('mouseup', end);
      prevRef.addEventListener('touchend', end);
    };
  }, []);

  return (
    <div className={`carousel-wrapper ${wrapperClassName}`}>
      <IconButton
        onClick={() => {
          carouselRef.current.scrollLeft -= 100;
        }}
        className="btn-left"
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={() => {
          carouselRef.current.scrollLeft += 100;
        }}
        className="btn-right"
      >
        <ChevronRightIcon />
      </IconButton>

      <PerfectScrollbar
        containerRef={(ref) => {
          carouselRef.current = ref;
        }}
        className={`items ${sliderClassName}`}
        component="ul"
      >
        {data?.map((item, index) => (
          <li key={index} className={`item ${itemClassName}`}>
            {item}
          </li>
        ))}
      </PerfectScrollbar>
    </div>
  );
}

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.element),
  wrapperClassName: PropTypes.string,
  sliderClassName: PropTypes.string,
  itemClassName: PropTypes.string,
};

export default Carousel;
