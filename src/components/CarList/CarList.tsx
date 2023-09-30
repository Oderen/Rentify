import React from "react";
import CarItem from "../CarItem";
import css from "./CarList.module.css";

interface CarsListProps {
  setCurrentId: (id: string) => void;
  carData: any[];
}

const CarsList: React.FC<CarsListProps> = ({ setCurrentId, carData }) => {
  return carData?.length > 0 ? (
    <section className={css.catalog}>
      <ul className={css.catalog__list}>
        <CarItem setCurrentId={setCurrentId} carData={carData} />
      </ul>
    </section>
  ) : (
    <div>
      <h2>Sorry, there are no cars matching your search request</h2>
    </div>
  );
};

export default CarsList;

