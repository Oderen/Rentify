import { carData } from '../data/car-data';

export const getData = async () => {
  return new Promise(resolve => {
    const randomNumber: number = Math.round(Math.random() * (2000 - 500) + 500);

    setTimeout(() => {
      resolve(carData);
    }, randomNumber);
  });
};
