/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveShopCategories, selectGetActiveShopCategories } from './homePageSlice';
import ShopCategoriesCarousel from '../../components/ShopCategoriesCarousel';
import '../../styles/assets/scss/demos/demo4/demo4.scss';
import '../../styles/assets/scss/demos/demo3/demo3.scss';
import './styles.scss';

function HOME() {
  const dispatch = useDispatch();
  const { data } = useSelector(selectGetActiveShopCategories);

  useEffect(() => {
    dispatch(getActiveShopCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="sections container border-start border-end  pt-3">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between ">
              <a className="links  mx-1 w-50 d-flex">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="app-select-btn active-select"
                >
                  <i className="bi bi-shop mx-3" />
                  Market Place
                </button>
              </a>

              <a className="links w-50 mx-1 d-flex">
                <button type="submit" className="app-select-btn">
                  <i className="bi bi-truck mx-3" />
                  Delivery Services
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sections main-section container-fluid border-start border-end  mt-2">
        <div className="row main-marquee">
          <div className="col px-2">
            <div className="sale-banner banner br-sm  appear-animate-visible main-sale-banner main-marquee">
              <div className="banner-content">
                <h4 className="content-left banner-subtitle text-uppercase mb-8 mb-md-0 mr-0 mr-md-4 text-primary ls-25">
                  <span className="text-dark font-weight-bold lh-1 ls-normal mr-1">
                    Up <br />
                    To
                  </span>
                  70% Sale!
                </h4>
                <div className="content-right  bg-dark marquee-bg">
                  <h3 className="banner-title text-uppercase font-weight-normal mb-4 mb-md-0 ls-25 text-white">
                    <span>
                      Shop By The
                      <strong className="mr-10 pr-lg-10">Most Popular Brand Now!</strong>
                      Shop By The
                      <strong className="mr-10 pr-lg-10">Most Popular Brand Now!</strong>
                      Shop By The
                      <strong className="mr-10 pr-lg-10">Most Popular Brand Now!</strong>
                    </span>
                  </h3>
                  <a className="btn btn-light text-light btn-rounded shop-now">
                    Shop Now
                    <i className="w-icon-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-12 mb-3 px-2">
            <div className="intro-wrapper main-intro-slider ">
              <div
                className="swiper-container swiper-theme pg-inner animation-slider row cols-1 gutter-no"
                data-swiper-options="{
                            'autoplay': {
                                'delay': 8000,
                                'disableOnInteraction': false
                            }
                        }"
              >
                <div className="swiper-wrapper h-100">
                  <div
                    className="swiper-slide banner banner-fixed intro-slide intro-slide1 br-sm home-image-banner"
                    style={{
                      backgroundColor: '#E8EAEF',
                    }}
                  >
                    <div className="banner-content y-50">
                      <div
                        className="slide-animate"
                        data-animation-options="{
                                            'name': 'flipInY', 'duration': '1s'
                                        }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 mb-3 px-2">
            <div className="side-banner-box">
              <div className="box-btn-warpper">
                <a className="w-50 h-100">
                  <div className="w-100 h-100 left-side">
                    <img
                      src="https://f-test.nooncdn.com/mpcms/EN0001/assets/be050f77-df1c-4cf8-9d3c-c1daabb5a074.png"
                      alt=""
                    />
                  </div>
                </a>
                <a className="w-50 h-100">
                  <div className="w-100 h-100 right-side">
                    <img
                      src="https://f-test.nooncdn.com/mpcms/EN0001/assets/c45bf8bc-957c-485a-ae1b-70ae0a313112.png   "
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShopCategoriesCarousel categories={data} />
    </>
  );
}

export default HOME;
