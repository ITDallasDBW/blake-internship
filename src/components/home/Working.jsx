import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const Working = () => {
  //USE STATE
  const [hotCo, setHotCo] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  //Axios API call
  async function getHotCo() {
    const response = await axios.get(BASE_URL);
    setHotCo(response.data);
    setLoading(false);
    console.log(response.data);
  }
  console.log(loading);

  //USE EFFECT
  useEffect(() => {
    setLoading(true);
    getHotCo();
  }, []);

  // useEffect(() => {
  //   if (hotCo.length > 0 && instanceRef.current) {
  //     instanceRef.current.update();
  //   }
  // }, [hotCo]);
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [hotCo, instanceRef]);

  return (
    <>
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>(Dynamic) Hot Collections</h2>
                {loading ? (
                  <h3 className="skelLoad">LOADING</h3>
                ) : (
                  <h3>loaded</h3>
                )}
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {loading ? (
                  //Render 4 sketon slides while loading
                  [...Array(4)].map((_, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft_coll skeleton">
                        <div className="nft_wrap skeleton nft_wrap-skeleton">
                          <div className="nft_coll_pp">
                            <div className="skeleton pp-coll"></div>
                          </div>
                          <div className="nft_coll_info">
                            <div className="skelDesc__Up"></div>
                            <div className="skelDesc__Down"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  //Render actual data when loaded
                  
                {hotCo.map((hotColl, id) => (
                  <div className="keen-slider__slide" key={id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <div className="lazy img-fluid"></div>
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
                      {/* </>
                      )} */}
                    </div>
                  </div>
                ))}
                )}

              </div>
              {instanceRef.current && (
                <>
                  <button
                    onClick={() => instanceRef.current?.prev()}
                    className="arrow arrow--left"
                  >
                    {"<"}
                  </button>
                  <button
                    className="arrow arrow--right"
                    onClick={() => instanceRef.current?.next()}
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Working;
