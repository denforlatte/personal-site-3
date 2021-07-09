import React from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const DefaultImage = ({ className }) => {
  const data = useStaticQuery(query);

  return (
    <GatsbyImage
      image={data.file.childImageSharp.gatsbyImageData}
      alt={"Probably unrelated Celtic doodle default image"}
      className={className} />
  );
};

const query = graphql`{
  file(relativePath: {eq: "doodlysketch.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, layout: FULL_WIDTH)
    }
  }
}
`;

export default DefaultImage;
