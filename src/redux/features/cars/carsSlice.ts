import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCars } from '../../api-operations';

type Car = {
  id: number;
  year: number;
  make: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string;
  mileage: number;
};

interface CarsState {
  cars: Car[] | [];
  favourites: string[];
  isLoading: boolean,
  error: null | string,
}

const initialState: CarsState = {
  cars: [],
  favourites: [],
  isLoading: false,
  error: null,
};

export const carsSlice = createSlice({
  name: 'autos',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<string>) => {
      state.favourites = [...state.favourites, action.payload];
    },
    removeFavourites: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(id => id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCars.pending, state => {
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      return {
        cars: action.payload,
        favourites: state.favourites,
        isLoading: false,
        error: null,
      };
    })
    builder.addCase(fetchCars.rejected, (state, action) => {
      if (typeof action.payload === "string") { 
       state.error = action.payload;
      } 
    })
  },
});

export const { addToFavourites, removeFavourites } = carsSlice.actions;
