import React from "react";

import SEO from "../components/seo";
import Header from "../components/Header";

const NotFoundPage = ({ location }) => {
  return (
    <>
      <SEO title="404: Not Found" />
      <Header location={location} />
      <main style={{ maxWidth: "1080px", padding: "8px", margin: "auto" }}>
        <h1>{"404 :("}</h1>
        <p>This page does not exist.</p>
      </main>
    </>
  );
};

export default NotFoundPage;
