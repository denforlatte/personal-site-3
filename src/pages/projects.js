import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Seo from "../components/Seo";
import IndexPage from '../templates/IndexPage';

const projects = ({ data, location }) => {

  return (
    <>
      <Seo title="Projects" />
      <IndexPage location={location} nodes={data.allStrapiProject.nodes} />
    </>
  );
};

projects.propTypes = {
  location: PropTypes.object.isRequired,
};

export const projectsQuery = graphql`
  query {
    allStrapiProject(sort: { fields: published_date, order: ASC }) {
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

export default projects;
