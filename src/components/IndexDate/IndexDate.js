import React from "react";
import PropTypes from "prop-types";

import styles from "./indexDate.module.scss";

const IndexDate = ({ date }) => (
  <div className={styles.date}>
    <div>
      <p className={styles.day}>{date.getDay()}</p>
      <p className={styles.month}>
        {date.toLocaleDateString("default", { month: "short" })}
      </p>
    </div>
    <p className={styles.year}>{date.getFullYear()}</p>
  </div>
);

IndexDate.propTypes = {
  date: PropTypes.object.isRequired,
};

export default IndexDate;
