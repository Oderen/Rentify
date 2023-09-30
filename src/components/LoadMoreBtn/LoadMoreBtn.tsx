import React from "react";
import css from "./LoadMoreBtn.module.css";

interface Props {
  loadMore: () => void;
}

const LoadMoreBtn: React.FC<Props> = ({ loadMore }) => {
  return (
    <button className={css.loadButton} onClick={loadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
