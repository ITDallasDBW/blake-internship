import React from "react";
import { Link } from "react-router-dom";
import CountDown from "../CountDown";
import Skeleton from "./Skeleton";

const NftCard = ({ data }) => {
  const isSkeleton = String(data.id).startsWith('skeleton');

  return (
    <>
      {!isSkeleton ? (
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to={`/author/${data.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <img className="lazy" src={data.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {data.expiryDate && <CountDown expiryDate={data.expiryDate} />}

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Link to={`/item-details/${data.nftId}`}>
              <img
                src={data.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to={`/item-details/${data.nftId}`}>
              <h4>{data.title}</h4>
            </Link>
            <div className="nft__item_price">{data.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{data.likes}</span>
            </div>
          </div>
        </div>
      ) : (
        //Render skeleton slides while loading
        // [...Array(4)].map((_, id) => (
        //   <div className="keen-slider__slide" key={id}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Creator: Monica Lucas"
                >
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
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
          /* </div>
        )) */
      )}
    </>
  );
};

export default NftCard;
