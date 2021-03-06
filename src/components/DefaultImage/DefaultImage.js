import React from "react";
import { useStaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image";

const DefaultImage = ({ className }) => {
  const data = useStaticQuery(query);

  return (
    <Img
      fluid={data.file.childImageSharp.fluid}
      alt={"Probably unrelated Celtic doodle default image"}
      className={className}
    />
  );
};

const query = graphql`
  query {
    file(relativePath: { eq: "doodlysketch.jpg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default DefaultImage;
