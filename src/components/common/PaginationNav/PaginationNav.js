import React from "react";
import PropTypes from "prop-types";

import * as styles from "./paginationNav.module.scss";

const PaginationNav = ({ numberOfPages, currentPage, switchToPage }) => {
  let pageNumbers = [];

  for (let i = 0; i < numberOfPages; i++) {
    pageNumbers.push(
      <li key={i}>
        <button
          onClick={() => switchToPage(i)}
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
        onClick={() => switchToPage(currentPage - 1)}
        className={
          styles.button + (currentPage <= 0 ? " " + styles.hidden : "")
        }
      >
        PREV
      </button>
      <ul className={styles.pageNumbers}>{pageNumbers}</ul>
      <button
        onClick={() => switchToPage(currentPage + 1)}
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
  switchToPage: PropTypes.func.isRequired,
};

export default PaginationNav;
