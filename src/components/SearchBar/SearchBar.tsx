import React, { useState } from "react";
import css from "./SearchBar.module.css";
import { useAppSelector } from "../../redux/hook";
import { FaChevronDown } from "react-icons/fa";

import { FilterSettings } from "../../types/Car";
interface IIProps {
  filterSettings: {},
  setFilterSettings: (searchOptions: FilterSettings) => void,
  setNumOfElements: (num: number) => void,
}

const SearchBar: React.FC<IIProps> = ({ filterSettings, setFilterSettings, setNumOfElements }) => {
  const [searchOptions, setSearchOptions] = useState({
    carBrand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });

  const [isBrdBtnActive, setIsBrdBtnActive] = useState(false);
  const [isPriceBtnActive, setIsPriceBtnActive] = useState(false);
  const cars = useAppSelector((state) => state.auto.cars);

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setSearchOptions({
      ...searchOptions,
      [name]: name === "carBrand" ? value : value.trim(),
    });
  };

  const shouldRenderResetBtn = Object.values(searchOptions).some(
    (option) => option !== "" && filterSettings
  );

  const setSelectedBrand = (selectedBrand: string) => {
    setSearchOptions({
      ...searchOptions,
      carBrand: selectedBrand,
    });
  };

  const setSelectedPrice = (selectedPrice: string) => {
    setSearchOptions({
      ...searchOptions,
      price: selectedPrice,
    });
  };

  const clearForm = () => {
    setSearchOptions({
      carBrand: "",
      price: "",
      minMileage: "",
      maxMileage: "",
    });
    setNumOfElements(8);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFilterSettings(searchOptions);
  };

  const menuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === "brand__button") {
      setIsBrdBtnActive(!isBrdBtnActive);
    } else if (e.currentTarget.id === "price__button") {
      setIsPriceBtnActive(!isPriceBtnActive);
    }
  };

  // @ts-ignore
  const brands = [...new Set(cars?.map((car) => car.make))];
  const sortedBrans = brands.sort((a, b) => a.localeCompare(b));
  
  const prices = [
    // @ts-ignore
    ...new Set(
      cars?.map((car) => car.rentalPrice.slice(1, car.rentalPrice.length))
    ),
  ];
  const sortedPrices = prices.sort((a, b) => {
    return a - b;
  });

  return (
    <form className={css.form} onSubmit={onSubmit}>
      {shouldRenderResetBtn && (
        <button className={css.resetBtn} onClick={clearForm}>
          Reset filter
        </button>
      )}

      <label htmlFor="carBrand" className={css.form__label}>
        Car brand
        <div className={`${css.inputContainer} ${css.carBrand}`}>
          <input
            type="text"
            className={`${css.inputContainer__input} ${css.carBrand__input}`}
            placeholder="Enter the text"
            value={searchOptions.carBrand}
            onChange={onHandleInputChange}
            name="carBrand"
            id="carBrand"
          />
          <button
            type="button"
            className={css.inputContainer__button}
            id="brand__button"
            onClick={menuHandler}
          >
            <FaChevronDown
              className={`${css.inputContainer__icon} ${
                isBrdBtnActive && css.inputContainer__rotatedIcon
              }`}
            />
          </button>
        </div>
        <div
          className={`${css.menu} ${css.menuBrd} ${
            isBrdBtnActive && css.active
          }`}
        >
          <ul>
            {sortedBrans?.map((brand) => {
              return (
                <li className={css.menu__item} key={`${brand}`}>
                  <button
                    className={css.menu__button}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <p className={css.menu__text}>{brand}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </label>

      <label htmlFor="price" className={css.form__label}>
        Price/1 hour
        <div className={`${css.inputContainer} ${css.price}`}>
          <input
            type="text"
            className={`${css.inputContainer__input} ${css.price__input}`}
            placeholder="To $"
            value={searchOptions.price}
            onChange={onHandleInputChange}
            name="price"
            id="price"
          />
          <button
            type="button"
            className={css.inputContainer__button}
            id="price__button"
            onClick={menuHandler}
          >
            <FaChevronDown
              className={`${css.inputContainer__icon} ${
                isPriceBtnActive && css.inputContainer__rotatedIcon
              }`}
            />
          </button>
        </div>
        <div
          className={`${css.menu} ${css.menuPrc} ${
            isPriceBtnActive && css.active
          }`}
        >
          <ul>
            {sortedPrices?.map((price) => {
              return (
                <li className={css.menu__item} key={`${price}`}>
                  <button
                    className={css.menu__button}
                    onClick={() => setSelectedPrice(price)}
                  >
                    <p className={css.menu__text}>{price}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </label>

      <div className={css.mileage}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: 18,
          }}
        >
          <label className={css.form__label}>Сar mileage / km</label>
          <div style={{ marginTop: 8 }}>
            <input
              type="numbers"
              placeholder="From"
              className={`${css.mileage__inputs} ${css.mileage__inputs__from}`}
              value={searchOptions.minMileage}
              onChange={onHandleInputChange}
              name="minMileage"
            />
            <input
              type="numbers"
              placeholder="To"
              className={`${css.mileage__inputs} ${css.mileage__inputs__to}`}
              value={searchOptions.maxMileage}
              onChange={onHandleInputChange}
              name="maxMileage"
            />
          </div>
        </div>
        <button type="submit" className={css.form__button}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

