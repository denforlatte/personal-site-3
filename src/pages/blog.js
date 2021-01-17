import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import IndexPage from '../templates/IndexPage';

const blog = ({ data, location }) => {

  return (
    <>
      <SEO title="Blog" />
      <IndexPage location={location} nodes={data.allStrapiProject.nodes} />
    </>
  );
};

blog.propTypes = {
  location: PropTypes.object.isRequired,
};

// TODO switch to blog
export const blogPostsQuery = graphql`
  query {
    allStrapiProject {
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
