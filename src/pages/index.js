import React from "react";

import SEO from "../components/seo";
import Header from "../components/Header";

import "../index.scss";

const Index = ({location}) => {
  return (
    <>
      <SEO title="Home" />
      <div className="main-container">
        <Header location={location}/>
        <br/>
        <main style={{backgroundColor: "#F5F1EB"}}>
          <div>left</div>
          <div>right</div>
        </main>
      </div>
    </>
  );
};

export default Index;
