import React from "react";
import PropTypes from "prop-types";

import SEO from "../components/seo";
import LandingPage from "../templates/LandingPage";

import styles from "../templates/LandingPage/landingPage.module.scss";

const ContactPage = ({ location }) => {
  // const [name, setName] = useState(null);

  // const handleFormSubmission = e => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   setName(data.get("name"));
  // };

  return (
    <>
      <SEO title="Contact" />
      <LandingPage location={location}>
        <h2>Say hello</h2>
        <form name="contact" method="POST" data-netlify="true">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="(optional)"/>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="(optional)"/>

          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            className={styles.multilineInput}
            required
          />

          {/* {name == null ? ( */}
            <input type="submit" value="Submit" className={styles.button} />
          {/* ) : (
            <p className={styles.messageReceived}>
              Thanks for your message{name ? ", " + name : ""}!
            </p>
          )} */}
        </form>
      </LandingPage>
    </>
  );
};

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ContactPage;
