import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

//Step 1. Fetch slides w/axios from
// https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
//2. map array into HotCollections.
//3. Use owl, keen or react slick slider to carousel images
//4. Push nftId to url on image click

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  //USE STATE
  const [hotCo, setHotCo] = useState([]);


  //KEEN SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

    //USE EFFECT
  useEffect(() => {
    getHotCo();
  }, []);

  

  //Axios API call
  async function getHotCo() {
    const response = await axios.get(BASE_URL);
    setHotCo(response.data);
    console.log("Inside async fn");
    console.log(response.data);
  }
  console.log("After async fn");

  return (
    <>
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
              <div ref={sliderRef} className="keen-slider">
                <div className="keen-slider__slide number-slide1">1</div>
                <div className="keen-slider__slide number-slide2">2</div>
                <div className="keen-slider__slide number-slide3">3</div>
                <div className="keen-slider__slide number-slide4">4</div>
                <div className="keen-slider__slide number-slide5">5</div>
                <div className="keen-slider__slide number-slide6">6</div>
              </div>
            </div>
            {loaded && instanceRef.current && (
              <>
                <button
                  onClick={() => instanceRef.current?.prev()}

                >
                  ←
                </button>

                <button
                  onClick={() => instanceRef.current?.next()}
                >
                  →
                </button>
              </>
            )}

            {hotCo.map((hotColl, id) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotCollections;
