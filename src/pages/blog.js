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

export const blogPostsQuery = graphql`
  query {
    allStrapiBlogPost(sort: { fields: published_date, order: ASC }) {
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
              fluid(maxWidth: 400, maxHeight: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default blog;
