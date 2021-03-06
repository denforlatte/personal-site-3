import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// TODO test. Does this load ALLLL the possible images in the browser?
const LocalThumbnail = ({thumbnail, className}) => {
  const data = useStaticQuery(query);

  const i = data.allFile.nodes.findIndex(node => node.id === thumbnail.localFile___NODE);

  console.log('i', i)

  return <Img fluid={data.allFile.nodes[i].childImageSharp.fluid} className={className} />;
}

LocalThumbnail.propTypes = {
  thumbnail: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const query = graphql`
  query {
    allFile {
      nodes {
        id
        url
        publicURL
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

export default LocalThumbnail;