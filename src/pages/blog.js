import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Header from "../components/Header";
import IndexCard from "../components/IndexCard";
import MobileVegvisir from '../components/MobileVegvisir';

const blog = ({ data, location }) => {
  return (
    <>
      <SEO title="Blog" />
      <Header location={location} />
      <main style={{marginBottom: '50px'}}>
        {data.allStrapiProject.nodes.map(node => (
          <>
            <MobileVegvisir />
            <IndexCard item={node} key={node.slug}/>
          </>
        ))}
      </main>
      <br/>
      <br/>
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
