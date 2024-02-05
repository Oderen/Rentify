import React from 'react';
import css from './CarItem.module.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  addToFavourites,
  removeFavourites,
} from '../../redux/features/cars/carsSlice';

interface CatItemProps {
  setCurrentId: (id: string) => void;
  carData: any[];
}

const CarItem: React.FC<CatItemProps> = ({ setCurrentId, carData }) => {
  const dispatch = useAppDispatch();

  const favourites = useAppSelector(state => state.auto.favourites);

  const addToLiked = async (id: string) => {
    try {
      if (favourites.includes(id)) {
        dispatch(removeFavourites(id));
      } else {
        dispatch(addToFavourites(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {carData.map(
        (
          {
            id,
            make,
            model,
            year,
            rentalPrice,
            img,
            type,
            address,
            rentalCompany,
            mileage,
            accessories,
            photoLink,
          },
          index
        ) => {
          /* eslint-disable */
          const [_, city = '', country = ''] = address.split(',');
          /* eslint-enable */
          const formattedMileage = new Intl.NumberFormat('en-US').format(
            mileage
          );

          const carDetails = [
            city,
            country,
            rentalCompany,
            type,
            model,
            formattedMileage,
            accessories[0],
          ];

          const carPhoto = img ? `${img}` : `${photoLink}`;

          return (
            <li className={css.item} key={`${id}-${index}`}>
              <div className={css.item__imgWrapper}>
                {carPhoto !== '' ? (
                  <img
                    className={css.item__image}
                    src={img ? `${img}` : `${photoLink}`}
                    alt={`${make}`}
                  />
                ) : (
                  <img
                    className={css.imageSkeleton}
                    src={require('../../images/car-sleketon.png')}
                    alt={`${make}`}
                  />
                )}
                <button
                  className={css.likeBtn}
                  onClick={() => {
                    addToLiked(id.toString());
                  }}
                >
                  {favourites.includes(id.toString()) ? (
                    <AiFillHeart
                      className={`${css.item__icon} ${css['item__icon--liked']}`}
                    />
                  ) : (
                    <AiOutlineHeart
                      className={`${css.item__icon} ${css['item__icon--not-liked']}`}
                    />
                  )}
                </button>
              </div>
              <div className={css.title}>
                <p className={css.title__text}>
                  {make}{' '}
                  <span className={css['title__text--accent']}>{model}</span>,{' '}
                  {year}
                </p>
                <p className={css.title__text}>{`${rentalPrice}/hr`}</p>
              </div>

              <ul className={css.info__list}>
                {carDetails.map((detail, index) => {
                  return (
                    <li className={css.info__item} key={`${detail}-${index}`}>
                      <p className={css.info__details}>{`${detail}`}</p>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                className={css.item__button}
                onClick={() => {
                  setCurrentId(id.toString());
                }}
              >
                Learn more
              </button>
            </li>
          );
        }
      )}
    </>
  );
};

export default CarItem;
