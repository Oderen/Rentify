import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import Catalog from './pages/Catalog';

const App: React.FC = () => {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='catalog' element={<Catalog />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
