import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CarList from '../components/CarList';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import LoadMoreBtn from '../components/LoadMoreBtn';
import Flags from '../components/Flags';

import { fetchCars } from '../redux/api-operations';
import { useAppDispatch, useAppSelector } from '../redux/hook';

import { Car } from '../types/Car';
import { FilterSettings } from '../types/Car';

const CatalogPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentId, setCurrentId] = useState<string>('');
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    carBrand: '',
    price: '',
    minMileage: '',
    maxMileage: '',
  });
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [numOfElemts, setNumOfElements] = useState<number>(8);

  const isLoading = useAppSelector(state => state.auto.isLoading);
  const cars = useAppSelector(state => state.auto.cars);

  const loadMore = () => {
    setNumOfElements(prevState => prevState + 8);
  };

  const filterCars = (filterSettings: FilterSettings, cars: Car[]) => {
    if (cars?.length === 0) {
      return [];
    }
    const { carBrand, price, minMileage, maxMileage } = filterSettings;

    const minMil = minMileage === '' ? 0 : Number(minMileage);
    const highestMileage = [...cars].sort((a, b) => b.mileage - a.mileage)[0]
      .mileage;
    const maxMil = maxMileage === '' ? highestMileage : Number(maxMileage);

    const filteredCars = cars
      .filter(car => car.make.toLowerCase().includes(carBrand.toLowerCase()))
      .filter(car => car.rentalPrice.includes(`${'$' + price}`))
      .filter(car => car.mileage >= minMil)
      .filter(car => car.mileage <= maxMil);

    return filteredCars;
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    const filteredCars = filterCars(filterSettings, cars);
    setFilteredCars(filteredCars);
    
    setNumOfElements(8);
  }, [filterSettings, cars]);

  const pieceOfFilteredCars = filteredCars?.slice(0, numOfElemts);
  const shouldRenderComponent =
    !isLoading && numOfElemts < filteredCars?.length;
  const shouldRenderFlags = !isLoading && numOfElemts >= filteredCars?.length;

  return (
    <div className="container">
      <section className="catalog">
        <SearchBar
          filterSettings={filterSettings}
          setFilterSettings={setFilterSettings}
          setNumOfElements={setNumOfElements}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <CarList setCurrentId={setCurrentId} carData={pieceOfFilteredCars} />
        )}
        {shouldRenderComponent && <LoadMoreBtn loadMore={loadMore} />}
        {shouldRenderFlags && <Flags />}

        {currentId !== '' && (
          <Modal currentId={currentId} closeModal={() => setCurrentId('')} />
        )}
      </section>
    </div>
  );
};

export default CatalogPage;
