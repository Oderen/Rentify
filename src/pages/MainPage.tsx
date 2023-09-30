import React from "react";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <section className="about">
        <div className="container">
          <h1 className="title">
            Welcome to <span style={{ color: "#3470ff" }}>Rentify</span>
          </h1>
          <p className="about__description">
            Rentify is the best and most affordable car rental service in
            Ukraine. We work every day, and at any time we are ready to provide
            a car, choosing the most suitable model for your purposes.
          </p>

          <div className="info">
            <div className="info__block">
              <h2 className="info__title">Comfot and Simplicity</h2>
              <ul className="info__list">
                <li className="info__item">
                  <p className="info__text">for business purposes</p>
                </li>
                <li className="info__item">
                  <p className="info__text"> for turism</p>
                </li>
                <li className="info__item">
                  <p className="info__text">
                    to provide transportation for guests at a wedding or other
                    event{" "}
                  </p>
                </li>
                <li className="info__item">
                  <p className="info__text">
                    for a trip to the train station or the airport
                  </p>
                </li>
              </ul>
            </div>
            <div className="info__block">
              <h2 className="info__title">100% Garanty with no Hassle </h2>
              <ul className="info__list garanty">
                <li className="info__item">
                  <p className="info__text">
                    Booking without without collateral and debt
                  </p>
                </li>
                <li className="info__item">
                  <p className="info__text">Timely car delivery</p>
                </li>
                <li className="info__item">
                  <p className="info__text">
                    Transmission of a car in a desirable place
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="info">
            <div className="info__block">
              <h2 className="info__title">Additional services</h2>
              <ul className="info__list">
                <li className="info__item">
                  <p className="info__text">GoPro camera rental</p>
                </li>
                <li className="info__item">
                  <p className="info__text">children's chair</p>
                </li>
                <li className="info__item">
                  <p className="info__text">WI-FI router</p>
                </li>
                <li className="info__item">
                  <p className="info__text">Car rental with driver</p>
                </li>
              </ul>
            </div>
            <div className="info__block">
              <h2 className="info__title">Key Metrics</h2>
              <ul className="info__list">
                <li className="info__item">
                  <p className="info__text">1 million+ advertisements</p>
                </li>
                <li className="info__item">
                  <p className="info__text">200k+ visitors per week</p>
                </li>
                <li className="info__item">
                  <p className="info__text">10k+ deals per day</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cars">
        <div className="container">
          <h2 className="title" style={{ color: "#3470ff" }}>
            Enjoy New Cars
          </h2>

          <div className="info">
            <div className="photo__block">
              <img
                className="photo"
                src={require("../images/10-porsche-718-cayman-gt4-rs-top-10.webp")}
                alt="porsche"
              />
            </div>
            <div className="photo__block">
              <img
                className="photo"
                src={require("../images/2022-Bugatti-Chiron-Super-Sport-2-1.avif")}
                alt="porsche"
              />
            </div>
          </div>

          <div className="info">
            <div className="photo__block">
              <img
                className="photo"
                src={require("../images/2023-lucid-air-1.jpg")}
                alt="porsche"
              />
            </div>
            <div className="photo__block">
              <img
                className="photo"
                src={require("../images/2023-tesla-model-x-101-1671475309.jpeg")}
                alt="porsche"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;