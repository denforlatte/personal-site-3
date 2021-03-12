import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";

const TagPage = ({ data, location, pageContext }) => {
  console.log('pageContext', pageContext);
  console.log("data :>> ", data);

  let nodes = [...data.allStrapiProject.nodes, ...data.allStrapiBlogPost.nodes];
  nodes = nodes.sort(
    (a, b) => new Date(b.published_date) - new Date(a.published_date)
  );

  return (
    <>
      <Header location={location} />
      <main style={{ marginBottom: "50px" }}>
        {nodes.map(node => (
          <IndexCard item={node} key={node.slug} />
        ))}
      </main>
    </>
  );
};

TagPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query PostsByTag($slug: String!) {
    allStrapiProject(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: published_date, order: ASC }
    ) {
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
    allStrapiBlogPost(
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: published_date, order: ASC }
    ) {
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

export default TagPage;
