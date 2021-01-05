import React from "react";
import { useStaticQuery } from "gatsby";
import Img from 'gatsby-image';

import SEO from "../components/seo";
import Header from "../components/Header";

import "../index.scss";

const Index = ({location}) => {
  const data = useStaticQuery(querySketch);

  return (
    <>
      <SEO title="Home" />
      <div>
        <Header location={location}/>
        <br/>
        <main className="main-container">
          <div className="simple-item">left</div>
          <div className="simple-item">
            <Img fluid={data.file.childImageSharp.fluid}/>
          </div>
        </main>
      </div>
    </>
  );
};

const querySketch = graphql`
  query {
    file(relativePath: { eq: "danny-sketch.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Index;
