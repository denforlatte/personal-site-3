import React from "react";

import SEO from "../components/seo";
import Header from "../components/Header";

const NotFoundPage = ({ location }) => {
  return (
    <>
      <SEO title="404: Not Found" />
      <Header location={location} />
      <main style={{ maxWidth: "1080px", padding: "8px", margin: "auto" }}>
        <h2>{"404 :("}</h2>
        <p>This page does not exist.</p>
      </main>
    </>
  );
};

export default NotFoundPage;
