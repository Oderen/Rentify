import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";
import { AiFillCar } from 'react-icons/ai';

const activeStyles = {
  borderWidth: '1px',
  borderColor: '#FFF',
  borderStyle: 'solid',
};

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo}>
          <AiFillCar className={styles.logo__icon} />
          <a href="/" className={styles.logo__link}>
            Rentify
          </a>
        </div>
        <ul className={styles.header__list}>
          <li>
            <NavLink
              to="/"
              className={styles.header__link}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={styles.header__link}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favourites"
              className={styles.header__link}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
