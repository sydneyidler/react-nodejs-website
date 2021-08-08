import React from "react";
import iconDesign from "../../images/Shape.svg";
import iconSecure from "../../images/Shape2.svg";
import iconRetina from "../../images/Shape3.svg";
import iconBackground from "../../images/Vector.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="container-fluid main pt-1 px-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,32L48,74.7C96,117,192,203,288,229.3C384,256,480,224,576,186.7C672,149,768,107,864,90.7C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="wrapper mx-auto">
          <p className="fs-3 text-center text-md-start">AppCo</p>
          <div className="row">
            <div className="col-12 col-md-7 text-center text-md-start">
              <p className="fs-2">
                <span className="fw-bold">Brainstorming</span> for desired
                perfect Usability
              </p>
              <p>
                Our design projects are fresh and simple and will benefit your
                business greatly. Learn more about our work!
              </p>
              <Link to="/stats">
                <button type="button" className="btn-view-stats mb-2 rounded">
                  View Stats
                </button>
              </Link>
            </div>
            <div className="col-12 col-md-5">
              <div className="phone mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4 mb-4 px-0 about text-center">
        <div className="wrapper mx-auto">
          <p className="fs-3 w-50 mx-auto">
            Why <span className="fw-bold">small business owners love</span>{" "}
            AppCo?
          </p>
          <p className="font-grey w-75 mx-auto mb-5">
            Our design projects are fresh and simple and will benefit your
            business greatly. Learn more about our work!
          </p>
          <div className="row">
            <div className="col-sm-4 box-shadow px-1 mb-2 rounded">
              <div>
                <div
                  className="container-icon"
                  style={{ backgroundImage: `url(${iconBackground})` }}
                >
                  <img src={iconDesign} />
                </div>
                <h5>Clean Design</h5>
                <p className="font-grey w-75 mx-auto">
                  Increase sales by showing true dynamics of your website.
                </p>
              </div>
            </div>
            <div className="col-sm-4 box-shadow px-1 mb-2 rounded">
              <div>
                <div
                  className="container-icon"
                  style={{ backgroundImage: `url(${iconBackground})` }}
                >
                  <img src={iconSecure} />
                </div>
                <h5>Secure Data</h5>
                <p className="font-grey w-75 mx-auto">
                  Build your online sotre's trust using Social Proof & Urgency.
                </p>
              </div>
            </div>
            <div className="col-sm-4 box-shadow px-1 mb-2 rounded">
              <div>
                <div
                  className="container-icon"
                  style={{ backgroundImage: `url(${iconBackground})` }}
                >
                  <img src={iconRetina} />
                </div>
                <h5>Retina Ready</h5>
                <p className="font-grey w-75 mx-auto">
                  Realize importance of social proof in customer's purchase
                  decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-0 pb-1 footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div className="wrapper mx-auto pt-5">
          <div className="input-group w-50 mx-auto mt-4 mb-3 rounded border border-3 border-white">
            <input
              type="text"
              className="form-control border-0 rounded-0"
              placeholder="Enter your email"
              aria-label="Enter your email"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append rounded-start">
              <button className="btn-subscribe rounded" type="button">
                Subscribe
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="fs-5 text-start m-0">AppCo</p>
            </div>
            <div>
              <p className="text-center m-0">
                All rights reserved by ThemeTags
              </p>
            </div>
            <div>
              <p className="text-end m-0">Copyrights &copy; 2021.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
