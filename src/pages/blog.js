import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Seo from "../components/Seo";
import IndexPage from '../templates/IndexPage';

const blog = ({ data, location }) => {

  return (
    <>
      <Seo title="Blog" />
      <IndexPage location={location} nodes={data.allStrapiBlogPost.nodes} />
    </>
  );
};

blog.propTypes = {
  location: PropTypes.object.isRequired,
};

export const blogPostsQuery = graphql`{
  allStrapiBlogPost(sort: {fields: published_date, order: DESC}) {
    nodes {
      published_date
      slug
      summary
      title
      tags {
        name
        slug
      }
      thumbnail {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(width: 600, layout: FULL_WIDTH, aspectRatio: 1.33)
          }
        }
      }
    }
  }
}
`;

export default blog;
