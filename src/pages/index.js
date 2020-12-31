import React from "react";
import SEO from "../components/seo";

import "../index.scss";
import testStyles from "../test.module.scss";

const Index = () => {
  return (
    <>
      <SEO title="Home" />
      <div className="main-container">
        {/* <Header/> */}
        <main style={{backgroundColor: "#F5F1EB"}}>
          <div>left</div>
          <div>right</div>
        </main>
      </div>
    </>
  );
};

export default Index;
