import React from "react";

import styles from './mobileNav.module.scss';

const MobileNav = () => {
  return (
    <div className={styles.mobileNav}>
      <button>Filter</button>
      <button>Menu</button>
    </div>
  );
};

export default MobileNav;
