import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const Working = () => {
  //USE STATE
  const [hotCo, setHotCo] = useState([]);

  //KEEN SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 15,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
  });

  //Axios API call
  async function getHotCo() {
    const response = await axios.get(BASE_URL);
    setHotCo(response.data);
  }

  //USE EFFECT
  useEffect(() => {
    getHotCo();
  }, []);

  useEffect(() => {
    if (hotCo.length > 0 && instanceRef.current) {
      instanceRef.current.update();
    }
  }, [hotCo]);

  return (
    <>
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>(Dynamic) Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {hotCo.map((hotColl, id) => (
                  <div className="keen-slider__slide" key={id}>
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
                ))}
              </div>
              {instanceRef.current && (
                <>
                  <button
                    onClick={() => instanceRef.current?.prev()}
                    className="keen__nav keen__arrow arrow__prev"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => instanceRef.current?.next()}
                    className="keen__nav keen__arrow arrow__next"
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
