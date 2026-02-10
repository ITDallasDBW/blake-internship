import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown";

//newitems Task List:
//1. Fetch slides w/axios from API
//2. Map array into New Items
//3. Use keen to carousel images
//4. Push authorId to author url on click
//  Push nftId to item-details url on click
//5. Implement countdown timer (Date.now)

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  //USE STATE
  const [newFetch, setNewFetch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keenSize, setKeenSize] = useState(4);

  //Axios API call
  async function getNewFetch() {
    const response = await axios.get(BASE_URL);
    setNewFetch(response.data);
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
    getNewFetch();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [newFetch, loading, instanceRef]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div className="keen-slider" ref={sliderRef}>
              {loading
                ? //Render skeleton slides while loading
                  [...Array(keenSize || 4)].map((_, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a
                                  href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a
                                  href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="mailto:?subject=I%20wanted%20you%20to%20see%20this%20site&body=Check%20out%20this%20site%20https://gigaland.io">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={``}>
                            <Skeleton width="100%" height="350px" />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={``}>
                            <Skeleton width="180px" height="30px" />
                          </Link>
                          <Skeleton width="100px" height="20px" />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width="30px" height="15px" />
                        </div>
                      </div>
                    </div>
                  ))
                : //Render actual data when loaded
                  newFetch.map((newItem, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <div className="nft__item" >
                        <div className="author_list_pp">
                          <Link
                            to={`author/${newItem.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              src={newItem.authorImage}
                              alt=""
                              className="lazy"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {newItem.expiryDate && (
                          <CountDown expiryDate={newItem.expiryDate} />
                        )}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a
                                  href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a
                                  href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link
                            to={`/item-details/${newItem.nftId}`}
                            // state={{ item: newItem }}
                          >
                            <img
                              src={newItem.nftImage}
                              alt=""
                              className="lazy nft__item_preview"
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${newItem.nftId}`}>
                            <h4>{newItem.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {newItem.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{newItem.likes}</span>
                          </div>
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
        </div>
      </div>
    </section>
  );
};

export default NewItems;
