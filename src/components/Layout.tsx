import React, { Suspense }from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout: React.FC = () => {
    return (
      <div>
        <header>
          <Header />
        </header>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    );
}

export default Layout
