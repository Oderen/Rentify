import React, { MouseEventHandler, useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../redux/hook';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

interface ModalProps {
  currentId: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ currentId, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  const cars = useAppSelector(state => state.auto.cars);
  const carInfo = cars.find(item => item.id.toString() === currentId);

  if (carInfo === undefined) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const onRentalClick = () => {
    toast('Fake massage: The application was sent successfully :)');
  };

  /* eslint-disable */
  const [_, city = '', country = ''] = carInfo.address.split(',');
  /* eslint-enable */

  const [minAge, driverLIC, deposit] = carInfo?.rentalConditions.split('\n');
  const age = minAge.slice(minAge.indexOf(': ') + 2, minAge.length);
  const formattedPrice = carInfo?.rentalPrice.slice(1) + '$';
  const formattedMileage = new Intl.NumberFormat('en-US').format(
    carInfo?.mileage
  );

  const carDetails = [
    city,
    country,
    formattedMileage,
    `Year: ${String(carInfo.year)}`,
    `Type: ${carInfo.type}`,
    `Fuel Consumption: ${carInfo.fuelConsumption}`,
    `Engine Size: ${carInfo.engineSize}`,
  ];

  const accAndFunc = [...carInfo.accessories, ...carInfo.functionalities];

  //@ts-ignore
  const src = carInfo.img !== undefined ? carInfo.img : carInfo.photoLink;

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.modal__button} onClick={closeModal}>
          <AiOutlineClose className={css.modal__icon} />
        </button>
        <div className={css.scrollContainer}>
          <div className={css.photoContainer}>
            <img
              className={css.photoContainer__photo}
              src={src}
              alt={`${carInfo.model}`}
            />
          </div>
          <div className={css.info}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p className={css.info__title}>
                {`${carInfo.make}`}{' '}
                <span
                  className={css['info__title--accent']}
                >{`${carInfo.model}`}</span>
                , {`${carInfo.year}`}
              </p>
              <p className={css.info__title}>
                <span style={{ color: 'var(--button-bg-color)' }}>
                  {carInfo.rentalPrice}
                </span>
                /hr
              </p>
            </div>

            <div>
              <h4 className={css.smallTitle}>Features</h4>
              <ul className={css.info__list}>
                {carDetails.map(detail => {
                  return (
                    <li className={css.info__item} key={`${detail}`}>
                      <p className={css.info__details}>{`${detail}`}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className={css.smallTitle}>Description</h4>
              <p
                className={css.info__description}
              >{`${carInfo.description}`}</p>
            </div>
          </div>
          <div className={css.accessories}>
            <h4 className={css.smallTitle}>Accessories and functionalities</h4>
            <ul className={css.accessories__list}>
              {accAndFunc?.map(item => {
                return (
                  <li className={css.accessories__item} key={`${item}`}>
                    <p className={css.accessories__details}>{`- ${item}`}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={css.rentalConditions}>
            <h4 className={css.smallTitle}>Rental Conditions</h4>
            <ul className={css.rentalConditions__list}>
              <li className={css.rentalConditions__item}>
                <p className={css.rentalConditions__text}>
                  Minimum age :
                  <span className={css['rentalConditions__text--accent']}>
                    {' '}
                    {`${age}`}
                  </span>
                </p>
              </li>
              <li className={css.rentalConditions__item}>
                <p className={css.rentalConditions__text}>{`${driverLIC}`}</p>
              </li>
              <li className={css.rentalConditions__item}>
                <p className={css.rentalConditions__text}>{`${deposit}`}</p>
              </li>
              <li className={css.rentalConditions__item}>
                <p className={css.rentalConditions__text}>
                  Mileage :
                  <span className={css['rentalConditions__text--accent']}>
                    {' '}
                    {`${formattedMileage}`}
                  </span>
                </p>
              </li>
              <li className={css.rentalConditions__item}>
                <p className={css.rentalConditions__text}>
                  Price :
                  <span className={css['rentalConditions__text--accent']}>
                    {' '}
                    {`${formattedPrice}`}
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <button className={css.rental__btn} onClick={onRentalClick}>
            Rental car
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
