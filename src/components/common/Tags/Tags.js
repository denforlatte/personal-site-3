import React from "react";
import PropTypes from "prop-types";
import { Link } from 'gatsby';

import * as styles from './tags.module.scss';

const Tags = ({tags, className}) => {
  return (
    <div className={styles.tagContainer + (className ? ' ' + className : '')}>
      {tags.map(tag => (
        <Link to={"/tags/" + tag.slug} className={styles.tag} key={tag.name}>
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Tags;
