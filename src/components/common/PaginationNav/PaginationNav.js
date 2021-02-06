import React from "react";
import PropTypes from "prop-types";

import styles from "./paginationNav.module.scss";

const PaginationNav = ({ numberOfPages, currentPage, setCurrentPage }) => {
  let pageNumbers = [];

  for (let i = 0; i < numberOfPages; i++) {
    pageNumbers.push(
      <li key={i}>
        <button
          onClick={() => setCurrentPage(i)}
          className={
            styles.button + (currentPage === i ? " " + styles.activeNumber : "")
          }
        >
          {i + 1}
        </button>
      </li>
    );
  }

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className={
          styles.button + (currentPage <= 0 ? " " + styles.hidden : "")
        }
      >
        PREV
      </button>
      <ul className={styles.pageNumbers}>{pageNumbers}</ul>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className={
          styles.button +
          (currentPage >= numberOfPages - 1 ? " " + styles.hidden : "")
        }
      >
        NEXT
      </button>
    </nav>
  );
};

PaginationNav.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default PaginationNav;
