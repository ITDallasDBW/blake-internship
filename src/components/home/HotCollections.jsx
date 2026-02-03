import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";


//HotCollections Task List:
//1. Fetch slides w/axios from
// https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections
//2. map array into HotCollections
//3. Use owl, keen or react slick slider to carousel images
//4. Push nftId to url on image click

const BASE_URL="https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"

const HotCollections = () => {

  //USE STATE
  const [hotCo, setHotCo]=useState([]);


  //USE EFFECT
  useEffect(() => {
    getHotCo()
  }, [])

  async function getHotCo() {
    const response=await axios.get(BASE_URL);
    setHotCo(response.data)
    console.log(response.data)    
  }

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
          {/* {new Array(4).fill(0).map((_, index) => ( */}
          {hotCo.map((hotColl, id) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={hotColl.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={hotColl.authorImage} alt="" />
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
  );
};

export default HotCollections;
