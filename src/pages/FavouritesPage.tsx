import React, { useEffect, useState } from "react";
import CarList from "../components/CarList";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchCars } from "../redux/api-operations";
import Modal from "../components/Modal";

import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import Flags from "../components/Flags/Flags";

const FavouritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentId, setCurrentId] = useState("");
  const [numOfElemts, setNumOfElements] = useState(8);

  const isLoading = useAppSelector((state) => state.auto.isLoading);
  const cars = useAppSelector((state) => state.auto.cars);
  const favourites = useAppSelector((state) => state.auto.favourites);
  const filteredCars = cars.filter((car) => favourites.includes(car.id.toString()));
  const pieceOfCars = filteredCars.slice(0, numOfElemts);

  
  const shouldRenderComponent =
    !isLoading && numOfElemts < filteredCars?.length;
  const shouldRenderFlags = !isLoading && numOfElemts >= filteredCars?.length;

  const loadMore = () => {
    setNumOfElements(prevState => prevState + 8);
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="korobka">
        <h1>Favourite cars</h1>

        {filteredCars.length > 0 ? (
          <>
            <CarList setCurrentId={setCurrentId} carData={pieceOfCars} />
            {shouldRenderComponent && <LoadMoreBtn loadMore={loadMore} />}
            {shouldRenderFlags && <Flags />}
          </>
        ) : (
          <div className="list">
            <div className="inner">
              <p className="text">There are no cars yet</p>
            </div>
          </div>
        )}
        {currentId !== "" && (
          <Modal currentId={currentId} closeModal={() => setCurrentId("")} />
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
