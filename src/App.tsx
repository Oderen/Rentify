import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';

const MainPage = lazy(() => import('./pages/MainPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
