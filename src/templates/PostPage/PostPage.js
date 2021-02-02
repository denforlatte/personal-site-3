import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styles from "./postPage.module.scss";

import Header from "../../components/Header";
import MobileVegvisir from "../../components/MobileVegvisir";

const PostPage = ({ data, location, pageContext }) => {
  const post = data.strapiBlogPost ?? data.strapiProject;
  const { previous, next } = pageContext;

  const hasBeenUpdated = new Date(post.updatedAt) > new Date(post.published_date);
  const readablePublishDate = new Date(post.published_date).toLocaleString("en-GB", { dateStyle: "long"});
  const readableUpdatedDate = new Date(post.updatedAt).toLocaleString("en-GB", { dateStyle: "long"});

  return (
    <>
      <Header location={location} />
      <MobileVegvisir />
      <main className={styles.mainContainer}>
        <article>
          <h1 className={styles.title}>{post.title}</h1>
          <p>Published: {readablePublishDate}{hasBeenUpdated && (' | updated: ' + readableUpdatedDate)}</p>
          {post.body.map(item => )}
          {/* <Link to={'/TODO check if project or blog/' + previous.slug}>Prev: {previous.title}</Link> */}
        </article>
        <div>sidebar</div>
      </main>
    </>
  );
};

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query blogPostById($id: String!) {
    strapiBlogPost(id: { eq: $id }) {
      title
      slug
      published_date
      updatedAt
      meta_description
      tags {
        name
        slug
      }
      body {
        strapi_component
        text
        page {
          text
        }
      }
    }

    strapiProject(id: { eq: $id }) {
      title
      slug
      published_date
      updatedAt
      meta_description
      tags {
        name
        slug
      }
      body {
        strapi_component
        text
        page {
          text
          title
        }
        image {
          image {
            name
            alternativeText
            caption
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
  }
`;

export default PostPage;
