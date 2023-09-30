import React from "react";
import { GiCheckeredFlag } from "react-icons/gi";
import css from "./Flags.module.css";

const Flags: React.FC = () => {
  return (
    <div className={css.lines}>
      <GiCheckeredFlag className={css["flag-icon"]} />
      <GiCheckeredFlag className={css["flag-icon"]} />
    </div>
  );
};

export default Flags;
