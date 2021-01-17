import React from "react";
import PropTypes from "prop-types";

import styles from './desktopIndexFilter.module.scss';

const DesktopIndexFilter = ({ tags, toggleTag }) => {  
  return (
    <div className={styles.tagContainer}>
      {tags.map(tag => (
        <button
          key={tag.name}
          onClick={() => toggleTag(tag.name)}
          className={tag.isActive ? styles.tagActive : styles.tag}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

DesktopIndexFilter.propTypes = {
  tags: PropTypes.array.isRequired,
  toggleTag: PropTypes.func.isRequired,
};

export default DesktopIndexFilter;
