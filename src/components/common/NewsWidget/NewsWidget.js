import React from 'react';
import { Link } from 'gatsby'

import styles from './newsWidget.module.scss';

const NewsWidget = () => {
  return (
    <div>
      <h4>News</h4>
      <p>
        Website 3.0 is here! More than just a fresh look, this new site takes a
        new direction. Read about it in{" "}
        <Link to="/blog/welcome-to-my-website" className={styles.link}>
          my first blog post!
        </Link>
      </p>
    </div>
  );
};

export default NewsWidget;
