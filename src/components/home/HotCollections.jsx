import React, { useEffect, useState } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import NftCard from "../UI/NftCard";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  //USE STATE
  const [hotCo, setHotCo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keenSize, setKeenSize] = useState(4);

  //Axios API call
  async function getHotCo() {
    const response = await axios.get(BASE_URL);
    setHotCo(response.data);
    setLoading(false);
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
    //Initial value
    handleResize();
    //Event listener
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
              {hotCo.length === 0
                ? //Render skeleton slides while loading
                  [...Array(keenSize || 4)].map((_, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <NftCard data={null} />
                    </div>
                  ))
                : //Render actual data when loaded
                  hotCo.map((hotColl, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <NftCard data={hotColl} />
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
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
