import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { TbChevronCompactLeft, TbChevronCompactRight } from "react-icons/tb";
import Skeleton from "../UI/Skeleton";

//HotCollections Task List:
//1. Fetch slides w/axios from
// https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
//2. map array into HotCollections
//3. Use owl, keen or react slick slider to carousel images
//4. Push nftId to url on image click

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  //USE STATE
  const [hotCo, setHotCo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keenSize, setKeenSize] = useState(4);
  const navigate = useNavigate();

  //Axios API call
  async function getHotCo() {
    const response = await axios.get(BASE_URL);
    setHotCo(response.data);
    setLoading(false);
    console.log(response.data);
  }

  //KEEN SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 10,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    breakpoints: {
      //widths to match model
      "(min-width:0px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width:600px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width:900px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(min-width:1200px)": {
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
    },
  });

  //Defines how many skeleton slides will appear (matching Keen) based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1200) {
        setKeenSize(4);
      } else if (width > 900) {
        setKeenSize(3);
      } else if (width > 600) {
        setKeenSize(2);
      } else {
        setKeenSize(1);
      }
    };
    //Set initial value
    handleResize();
    //Add event listener
    window.addEventListener("resize", handleResize);
    //Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //USE EFFECT
  useEffect(() => {
    setLoading(true);
    getHotCo();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [hotCo, loading, instanceRef]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div className="keen-slider" ref={sliderRef}>
              {loading
                ? //Render skeleton slides while loading
                  [...Array(keenSize || 4)].map((_, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={``}>
                            <Skeleton width="100%" height="200px" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={``}>
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="">
                            <Skeleton width="100px" height="20px" />
                          </Link>
                          <br />
                          <Skeleton width="60px" height="20px" />
                        </div>
                      </div>

                    </div>
                  ))
                : //Render actual data when loaded
                  hotCo.map((hotColl, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link
                            to={`/item-details/${hotColl.nftId}`}
                            state={{ item: hotColl }}
                          >
                            <img
                              src={hotColl.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={hotColl.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{hotColl.title}</h4>
                          </Link>
                          <span>ERC-{hotColl.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {instanceRef.current && (
              <>
                <div className="owl-nav">
                  <button
                    type="button"
                    onClick={() => instanceRef.current?.prev()}
                    className="owl-prev"
                  >
                    <span></span>
                    {"<"}
                  </button>
                  <button
                    type="button"
                    className="owl-next"
                    onClick={() => instanceRef.current?.next()}
                  >
                    <span>{">"}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={hotColl.nftImage}
                      className="lazy img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={hotColl.authorImage}
                      alt=""
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{hotColl.title}</h4>
                  </Link>
                  <span>ERC-{hotColl.code}</span>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
