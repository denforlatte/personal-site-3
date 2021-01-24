import React from "react";
import PropTypes from "prop-types";

import styles from "./mobileFilter.module.scss";

const MobileFilter = ({ tags, toggleTag }) => {
  return (
    <div className={styles.overlay}>
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
    </div>
  );
};

MobileFilter.propTypes = {
  tags: PropTypes.array.isRequired,
  toggleTag: PropTypes.func.isRequired,
};

export default MobileFilter;
