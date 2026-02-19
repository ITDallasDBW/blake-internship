import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown";
import NftCard from "../UI/NftCard";

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
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keenSize, setKeenSize] = useState(4);

  //Axios API call
  async function getNewItems() {
    const response = await axios.get(BASE_URL);
    setNewItems(response.data);
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
    getNewItems();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [newItems, loading, instanceRef]);

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
              {newItems.length === 0
                ? // {loading
                  //Render skeleton slides while loading
                  [...Array(keenSize || 4)].map((_, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <NftCard data={null} />
                    </div>
                  ))
                : //Render actual data when loaded
                  newItems.map((newItem, id) => (
                    <div className="keen-slider__slide" key={id}>
                      <NftCard data={newItem} />
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
