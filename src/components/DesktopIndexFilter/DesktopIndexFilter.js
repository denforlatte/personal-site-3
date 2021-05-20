import React from "react";
import PropTypes from "prop-types";

import * as styles from "./desktopIndexFilter.module.scss";

const DesktopIndexFilter = ({ tags, toggleTag }) => {
  return (
    <ul className={styles.tagContainer}>
      {tags.map(tag => (
        <li key={tag.name}>
          <button
            onClick={() => toggleTag(tag.name)}
            className={tag.isActive ? styles.tagActive : styles.tag}
          >
            {tag.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

DesktopIndexFilter.propTypes = {
  tags: PropTypes.array.isRequired,
  toggleTag: PropTypes.func.isRequired,
};

export default DesktopIndexFilter;
