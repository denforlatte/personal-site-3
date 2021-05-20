import React, { useState } from "react";
import PropTypes from "prop-types";

import Seo from "../components/Seo";
import LandingPage from "../templates/LandingPage";

import styles from "../templates/LandingPage/landingPage.module.scss";

const ContactPage = ({ location }) => {
  const [name, setName] = useState(null);

  const handleFormSubmission = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setName(formData.get("name"));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Seo title="Contact" />
      <LandingPage location={location}>
        <h2>Say hello</h2>
        <form
          id="contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleFormSubmission}
        >
          <input type="hidden" name="form-name" value="contact" />

          <label className={styles.hidden} htmlFor="bot-field">Don’t fill this out if you’re human:</label>
          <input className={styles.hidden} type="text" name="bot-field" />

          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="(optional)" />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="(optional)"
          />

          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            className={styles.multilineInput}
            required
          />

          {name == null ? (
            <input type="submit" value="Submit" className={styles.button} />
          ) : (
            <p className={styles.messageReceived}>
              Thanks for your message{name ? ", " + name : ""}!
            </p>
          )}
        </form>
      </LandingPage>
    </>
  );
};

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ContactPage;
