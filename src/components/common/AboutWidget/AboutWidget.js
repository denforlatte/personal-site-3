import React from "react";

import styles from "./aboutWidget.module.scss";

const AboutWidget = props => {
  return (
    <div>
      <h4>About Danny</h4>
      <div className={styles.body}>
        <p>
          Software engineer from the UK. Creative nerd determined to learn and
          explore life.
        </p>
        <img src="/images/meee.png" alt="Author"/>
      </div>
    </div>
  );
};

export default AboutWidget;
