import React from "react";
import styles from "./header.module.scss";

const SocialLinks = () => {
  return (
    <ul className={styles.socialContainer}>
      <li className={styles.socialTag}>
        <a href="https://twitter.com/denforlatte" aria-label="My Twitter">
          <img
            aria-hidden="true"
            title="My Twitter"
            alt=""
            src="/images/social/twitter.svg"
          />
        </a>
      </li>
      <li className={styles.socialTag}>
        <a href="/contact" aria-label="Contact me">
          <img
            aria-hidden="true"
            title="Contact me"
            alt=""
            src="/images/social/email.svg"
          />
        </a>
      </li>
      <li className={styles.socialTag}>
        <a href="https://www.linkedin.com/in/danny-wilkins" aria-label="My Linkedin">
          <img
            aria-hidden="true"
            title="My Linkedin"
            alt=""
            src="/images/social/linkedin.svg"
          />
        </a>
      </li>
      <li className={styles.socialTag}>
        <a href="https://github.com/denforlatte" aria-label="My Github">
          <img
            aria-hidden="true"
            title="My Github"
            alt=""
            src="/images/social/github.svg"
          />
        </a>
      </li>
      <li className={styles.socialTag}>
        <a href="https://www.facebook.com/danny.t.wilkins" aria-label="My Facebook">
          <img
            aria-hidden="true"
            title="My Facebook"
            alt=""
            src="/images/social/facebook.svg"
          />
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
