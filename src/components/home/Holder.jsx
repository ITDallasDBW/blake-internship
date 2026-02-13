import React, { useEffect, useState } from "react";
import NftCard from "../UI/NftCard";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

// Helper function to calculate slides based on width
const getKeenSize = (width) => {
  if (width >= 1200) return 4;
  if (width >= 900) return 3;
  if (width >= 600) return 2;
  return 1;
};

const Holder = () => {
  const [newItems, setNewItems] = useState([{ id: "skeleton" }]);
  const [loading, setLoading] = useState(true);
  const [keenSize, setKeenSize] = useState(() =>
    getKeenSize(window.innerWidth),
  );
  // console.log(keenSize);

  //Defines how many skeleton slides will appear (matching Keen) based on screen size
  useEffect(() => {
    const handleResize = () => {
      setKeenSize(getKeenSize(window.innerWidth));
    };
    //Event listener
    window.addEventListener("resize", handleResize);
    //Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create skeleton array based on keenSize
  useEffect(() => {
    if (loading) {
      setNewItems(
        Array.from({ length: keenSize }, (_, i) => ({
          id: `skeleton-${i}`,
        })),
      );
    }
  }, [keenSize, loading]);

  //Axios API call
  async function getNewItems() {
    const response = await axios.get(BASE_URL);
    setNewItems(response.data);
    setLoading(false);
    // console.log(response.data);
  }

  //KEEN SLIDER details
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

  //Activates API request
  useEffect(() => {
    // setLoading(true);
    getNewItems();
  }, []);

  //Update/Recalculate when data changes
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [newItems, loading, instanceRef]);

  // console.log(loading);
  return (
    <>
      <div>
        <h1>NftCard Holder</h1>
      </div>
      <section className="no-bottom" id="section-items">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New NFT Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="navigation-wrapper">
              <div className="keen-slider" ref={sliderRef}>
                {newItems.map((item) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <NftCard data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Holder;
