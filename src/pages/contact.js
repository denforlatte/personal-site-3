import React from "react";

import SEO from "../components/seo";
import Header from "../components/Header";

const ContactPage = ({ location }) => {
  return (
    <>
      <SEO title="Contact" />
      <Header location={location} />
      <main style={{ maxWidth: "1080px", padding: "8px", margin: "auto" }}>
        <h1>Coming soon!</h1>
        <p>Sooner than Half Life 3, at least.</p>
      </main>
    </>
  );
};

export default ContactPage;
