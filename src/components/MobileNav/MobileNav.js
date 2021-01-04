import React from "react";
import PropTypes from "prop-types";

import styles from "./mobileNav.module.scss";

const MobileNav = ({ setIsMenuOpen, isMenuOpen }) => {
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className={styles.mobileNav}>
      <button>Filter</button>
      <button onClick={handleMenuClick}>Menu</button>
    </div>
  );
};

MobileNav.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
}

export default MobileNav;
