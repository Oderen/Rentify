import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../FakeApi/getData';
import { Car } from '../types/Car';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData();

      return data as Car[];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
