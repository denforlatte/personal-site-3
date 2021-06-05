import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import styles from "./mobileMenu.module.scss";

const MobileMenu = ({ links, location }) => {
  const generateNavLinks = () => {
    const currentLocation = "/" + location.pathname.split("/")[1];

    return links.map(link => {
      const url = link === "Home" ? "/" : "/" + link.toLowerCase();
      const isActive = url === currentLocation;
      const className = isActive
        ? styles.navLink + " " + styles.navLinkActive
        : styles.navLink;

      return (
        <li key={link} className={styles.navListItem}>
          <Link to={url} className={className}>
            {link}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav className={styles.overlay}>
      <ul className={styles.navList}>{generateNavLinks()}</ul>
    </nav>
  );
};

MobileMenu.propTypes = {
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default MobileMenu;
