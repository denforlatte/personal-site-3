import React from "react";
import PropTypes from "prop-types";

import styles from "./shareWidget.module.scss";

const ShareWidget = ({ pageUrl, pageTitle }) => {
  return (
    <div>
      <h4>Share this page</h4>
      <ul className={styles.iconList}>
        <li className={styles.socialIcon}>
          <a
            href={`https://twitter.com/share?url=${pageUrl}&text=${pageTitle}&via=denforlatte`}
            aria-label="Share on Twitter"
          >
            <img
              
              aria-hidden="true"
              title="Share on Twitter"
              alt=""
              src="/images/social/twitter-dark.svg"
            />
          </a>
        </li>
        <li className={styles.socialIcon}>
          <a
            href={`https://www.facebook.com/sharer.php?u=${pageUrl}`}
            aria-label="Share on Facebook"
          >
            <img
              
              aria-hidden="true"
              title="Share on Facebook"
              alt=""
              src="/images/social/facebook-dark.svg"
            />
          </a>
        </li>
        <li className={styles.socialIcon}>
          <a
            href={`mailto:?subject=${pageTitle}&body=${pageUrl}`}
            aria-label="Share via email"
          >
            <img
              
              aria-hidden="true"
              title="Share via email"
              alt=""
              src="/images/social/email-dark.svg"
            />
          </a>
        </li>
        <li className={styles.socialIcon}>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${pageUrl}&title=${pageTitle}`}
            aria-label="Share on LinkedIn"
          >
            <img
              
              aria-hidden="true"
              title="Share on LinkedIn"
              alt=""
              src="/images/social/linkedin-dark.svg"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

ShareWidget.propTypes = {
  pageUrl: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default ShareWidget;
