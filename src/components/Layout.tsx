import React, { Suspense }from 'react'
import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
        </header>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    );
}

export default Layout
