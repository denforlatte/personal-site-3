import React from "react";
import PropTypes from "prop-types";

import styles from "./mobileNav.module.scss";

const MobileNav = ({ setIsMenuOpen, isMenuOpen, tags, toggleTag }) => {
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className={styles.mobileNav}>
      {tags && <button>Filter</button>}
      <button onClick={handleMenuClick}>Menu</button>
    </div>
  );
};

MobileNav.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  tags: PropTypes.array,
  toggleTag: PropTypes.func,
}

export default MobileNav;
