import React from "react";
import PropTypes from "prop-types";

import styles from "./indexDate.module.scss";

const IndexDate = ({ date, className }) => (
  <div className={styles.date + (className ? ' ' + className : '')}>
    <div>
      <p className={styles.day}>{date.getDate()}</p>
      <p className={styles.month}>
        {date.toLocaleDateString("default", { month: "short" })}
      </p>
    </div>
    <p className={styles.year}>{date.getFullYear()}</p>
  </div>
);

IndexDate.propTypes = {
  date: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default IndexDate;
