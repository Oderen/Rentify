import React, { Suspense }from 'react'
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
      <div>
        <header>
          <h1>Smth</h1>
        </header>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    );
}

export default Layout
