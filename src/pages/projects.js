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

export const projectsQuery = graphql`{
  allStrapiProject(sort: {fields: published_date, order: DESC}) {
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

export default projects;
