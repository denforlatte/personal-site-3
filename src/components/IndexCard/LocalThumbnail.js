import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

// TODO test. Does this load ALLLL the possible images in the browser?
const LocalThumbnail = ({thumbnail, className}) => {
  const data = useStaticQuery(query);

  const i = data.allFile.nodes.findIndex(node => node.id === thumbnail.localFile___NODE);

  return (
    <GatsbyImage
      image={data.allFile.nodes[i].childImageSharp.gatsbyImageData}
      className={className} />
  );
}

LocalThumbnail.propTypes = {
  thumbnail: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const query = graphql`{
  allFile {
    nodes {
      id
      url
      publicURL
      childImageSharp {
        gatsbyImageData(width: 600, layout: FULL_WIDTH, aspectRatio: 1.33)
      }
    }
  }
}
`;

export default LocalThumbnail;