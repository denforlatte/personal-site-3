import React from "react";
import { Link } from "gatsby";
import styles from "./header.module.scss";

const SocialLinks = () => {
  return (
    <ul className={styles.socialContainer}>
      <li className={styles.socialTag}>
        <Link to="https://twitter.com/denforlatte" aria-label="My Twitter">
          <img
            aria-hidden="true"
            title="My Twitter"
            alt=""
            src="/images/social/twitter.svg"
          />
        </Link>
      </li>
      <li className={styles.socialTag}>
        <Link to="/contact" aria-label="Contact me">
          <img
            aria-hidden="true"
            title="Contact me"
            alt=""
            src="/images/social/email.svg"
          />
        </Link>
      </li>
      <li className={styles.socialTag}>
        <Link to="https://www.linkedin.com/in/danny-wilkins" aria-label="My Linkedin">
          <img
            aria-hidden="true"
            title="My Linkedin"
            alt=""
            src="/images/social/linkedin.svg"
          />
        </Link>
      </li>
      <li className={styles.socialTag}>
        <Link to="https://github.com/denforlatte" aria-label="My Github">
          <img
            aria-hidden="true"
            title="My Github"
            alt=""
            src="/images/social/github.svg"
          />
        </Link>
      </li>
      <li className={styles.socialTag}>
        <Link to="https://www.facebook.com/danny.t.wilkins" aria-label="My Facebook">
          <img
            aria-hidden="true"
            title="My Facebook"
            alt=""
            src="/images/social/facebook.svg"
          />
        </Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
