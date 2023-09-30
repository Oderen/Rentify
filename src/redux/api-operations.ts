import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Car } from "../types/Car";

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(
        'https://650752903a38daf4803f6b11.mockapi.io/rentify/advert'
      );
      
      return data as Car[];
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });
