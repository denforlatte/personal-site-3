import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styles from "./postPage.module.scss";
import { parseComponent } from "../../utilities";

import Header from "../../components/Header";
import MobileVegvisir from "../../components/MobileVegvisir";
import SEO from "../../components/seo";
import ShareWidget from '../../components/common/ShareWidget';
import AboutWidget from "../../components/common/AboutWidget";
import NewsWidget from "../../components/common/NewsWidget";

const PostPage = ({ data, location, pageContext }) => {
  const post = data.strapiBlogPost ?? data.strapiProject;
  const { previous, next } = pageContext;

  const hasBeenUpdated =
    new Date(post.updatedAt) > new Date(post.published_date);
  const readablePublishDate = new Date(
    post.published_date
  ).toLocaleString("en-GB", { dateStyle: "long" });
  const readableUpdatedDate = new Date(post.updatedAt).toLocaleString("en-GB", {
    dateStyle: "long",
  });

  return (
    <>
      <SEO title={post.title} />
      <Header location={location} />
      <MobileVegvisir />
      <main className={styles.mainContainer}>
        <article className={styles.article}>
          <h1 className={styles.title}>{post.title}</h1>
          <p>
            Published: {readablePublishDate}
            {hasBeenUpdated && " | updated: " + readableUpdatedDate}
          </p>
          {post.body.map(item => parseComponent(item))}
          <div className={styles.adjacentPosts}>
            {previous && (
                <Link
                  to={`/${location.pathname.split("/")[1]}/` + previous.slug}
                >
                  <img
                    aria-hidden="true"
                    title="previous post"
                    alt=""
                    src="/images/arrow.png"
                    className={styles.rotateimg180}
                  />
                  <p>Previous: {previous.title}</p>
                </Link>
            )}
            {next && (
                <Link to={`/${location.pathname.split("/")[1]}/` + next.slug}>
                  <p>Next: {next.title}</p>
                  <img
                    aria-hidden="true"
                    title="previous post"
                    alt=""
                    src="/images/arrow.png"
                  />
                </Link>
            )}
          </div>
        </article>
        <div className={styles.sidebar}>
          <ShareWidget pageUrl={location.href} pageTitle={post.title}/>
          <AboutWidget />
          <NewsWidget />
          {/* TODO SEARCH */}
          {/* TODO SUBSCRIBE */}
          {/* TODO FEATURED PAGE */}
          <p>&copy; Danny Thorbjørn Wilkins</p>
        </div>
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
