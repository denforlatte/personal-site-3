import React from "react";
import PropTypes from "prop-types";

import SEO from "../components/seo";
import LandingPage from "../templates/LandingPage";

const ContactPage = ({ location }) => {
  return (
    <>
      <SEO title="Contact" />
      <LandingPage location={location}>
        <form netlify>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" />

          <label for="email">Email</label>
          <input type="email" id="email" name="email" />

          <label for="message">Message</label>
          <input type="text" id="message" name="message" />

          <input type="submit" value="Submit" />
        </form>
      </LandingPage>
    </>
  );
};

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ContactPage;
