import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown";
import NftCard from "../UI/NftCard";

//Explore Items task

//1. Load dynamic data from API
//2. USE <NFTCARD> for as reusable component!!
//2. Same countdown timer as NewItems
//3. Load More button loads 4 more at a time, then disappears

const BASE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

// https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low

const ExploreItems = () => {
  //USE STATE
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliceNum, setSliceNum] = useState(8);

  //Axios API call
  async function getNewItems() {
    const response = await axios.get(BASE_URL);
    setNewItems(response.data);
    setLoading(false);
    console.log(response.data);
  }

  //USE EFFECT
  useEffect(() => {
    setLoading(true);
    getNewItems();
    // console.log(`useEffect sliceNum is ${sliceNum}`);
  }, []);

  function loadMore() {
    if (sliceNum < 16) setSliceNum(sliceNum + 4);
  }

  return (
    <>
      {/* <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div> */}
      {new Array(16)
        .slice(0, sliceNum)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={AuthorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">5h 30m 32s</div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img
                    src={nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>Pinky Ocean</h4>
                </Link>
                <div className="nft__item_price">1.74 ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>69</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="col-md-12 text-center">
        {sliceNum<16 &&(
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore} >
          Load more
        </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
