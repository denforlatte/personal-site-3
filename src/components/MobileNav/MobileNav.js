import React from "react";
import PropTypes from "prop-types";

import * as styles from "./mobileNav.module.scss";

const MobileNav = ({ toggleMenuOpen, toggleFilterOpen, showFilter }) => {
  return (
    <div className={styles.mobileNav}>
      {showFilter && <button onClick={toggleFilterOpen}>Filter</button>}
      <button onClick={toggleMenuOpen}>Menu</button>
    </div>
  );
};

MobileNav.propTypes = {
  toggleMenuOpen: PropTypes.func.isRequired,
  toggleFilterOpen: PropTypes.func.isRequired,
  showFilter: PropTypes.bool,
}

export default MobileNav;
