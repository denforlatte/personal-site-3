import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";
import styles from './tagPage.module.scss';

const TagPage = ({ data, location, pageContext }) => {
  let nodes = [...data.allStrapiProject.nodes, ...data.allStrapiBlogPost.nodes];
  nodes = nodes.sort(
    (a, b) => new Date(b.published_date) - new Date(a.published_date)
  );

  return (
    <>
      <Header location={location} />
      <main style={{ marginBottom: "50px" }}>
        <h2 className={styles.title}>{pageContext.name} posts</h2>
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
