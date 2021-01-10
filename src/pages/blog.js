import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Header from "../components/Header";
import IndexCard from "../components/IndexCard";

const blog = ({ data, location }) => {
  console.log("data :>> ", data);

  return (
    <>
      <SEO title="Blog" />
      <Header location={location} />
      <br/>
      <br />
      <main>
        {data.allStrapiProject.nodes.map(node => <IndexCard item={node} key={node.slug}/>)}
      </main>
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
              fluid(maxWidth: 400) {
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
