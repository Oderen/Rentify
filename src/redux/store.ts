import { configureStore } from '@reduxjs/toolkit';
import { carsSlice } from './features/cars/carsSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


const FavouritesPersistConfig = {
  key: 'favourites',
  storage,
  whitelist: ['favourites'],
};

const persistedFavouritesReducer = persistReducer(
  FavouritesPersistConfig,
  carsSlice.reducer
);

export const store = configureStore({
  reducer: {
    auto: persistedFavouritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
