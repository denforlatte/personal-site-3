import React from "react";

import Seo from "../components/Seo";
import Header from "../components/Header";

const GamesIndexPage = ({ location }) => {
  return (
    <>
      <Seo title="Games" />
      <Header location={location} />
      <main style={{ maxWidth: "1080px", padding: "8px", margin: "auto" }}>
        <h1>Coming soon!</h1>
        <p>Sooner than Half Life 3, at least.</p>
      </main>
    </>
  );
};

export default GamesIndexPage;
