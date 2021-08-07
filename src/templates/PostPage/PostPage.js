import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styles from "./postPage.module.scss";
import { parseComponent } from "../../utilities";

import Header from "../../components/Header";
import MobileVegvisir from "../../components/MobileVegvisir";
import Seo from "../../components/Seo";
import IndexDate from "../../components/IndexDate";
import Tags from "../../components/common/Tags";
import ShareWidget from "../../components/common/ShareWidget";
import AboutWidget from "../../components/common/AboutWidget";
import NewsWidget from "../../components/common/NewsWidget";
import SearchWidget from "../../components/common/SearchWidget";
import FeaturedPageWidget from "../../components/common/FeaturedPageWidget";

const PostPage = ({ data, location, pageContext }) => {
  const post = data.strapiBlogPost ?? data.strapiProject;
  const { previous, next } = pageContext;

  // If the updateAt is more than 24 hours after publish, show the updated date
  const hasBeenUpdated =
    new Date(post.updatedAt) - new Date(post.published_date) > new Date(24 * 60 * 60 * 1000);
  const readablePublishDate = new Date(
    post.published_date
  ).toLocaleString("en-GB", { dateStyle: "long" });
  const readableUpdatedDate = new Date(post.updatedAt).toLocaleString("en-GB", {
    dateStyle: "long",
  });

  return (
    <>
      <Seo title={post.title} />
      <Header location={location} />
      <MobileVegvisir />
      <main className={styles.outerContainer}>
        <IndexDate
          date={new Date(post.published_date)}
          className={styles.sideDate}
        />
        <div className={styles.mainContainer}>
          <article className={styles.article}>
            <h1 className={styles.title}>{post.title}</h1>

            <p className={styles.inBodyDate}>
              Published: {readablePublishDate}
              {hasBeenUpdated && " | updated: " + readableUpdatedDate}
            </p>
            {hasBeenUpdated && <p className={styles.inBodyUpdateDate}>updated: {readableUpdatedDate}</p>}

            <div className={styles.tagContainer}>
                {post.tags.map(tag => (
                  <Link
                    to={"/tags/" + tag.slug}
                    className={styles.tag}
                    key={tag.name}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>

            {post.body.map(item => (
              <div key={item.id} className={styles.component}>
                {parseComponent(item, location)}
              </div>
            ))}

            <div className={styles.adjacentPosts}>
              {previous ? (
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
              ) : <div/>}
              {next ? (
                <Link to={`/${location.pathname.split("/")[1]}/` + next.slug}>
                  <p>Next: {next.title}</p>
                  <img
                    aria-hidden="true"
                    title="previous post"
                    alt=""
                    src="/images/arrow.png"
                  />
                </Link>
              ) : <div/>}
            </div>
          </article>
          <div className={styles.sidebar}>
            <ShareWidget pageUrl={location.href} pageTitle={post.title} />
            <AboutWidget />
            <NewsWidget />
            <SearchWidget />
            {/* TODO SUBSCRIBE */}
            <FeaturedPageWidget />
            <p>&copy; Danny Thorbjørn Wilkins</p>
          </div>
        </div>

        <Tags tags={post.tags} className={styles.sideTags} />
      </main>
    </>
  );
};

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`query postById($id: String!) {
  strapiBlogPost(id: {eq: $id}) {
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
      id
      strapi_component
      text
      page {
        title
        text
      }
      image {
        id
        name
        alternativeText
        caption
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
  strapiProject(id: {eq: $id}) {
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
      id
      strapi_component
      text
      page {
        text
        title
      }
      galleryImage {
        title
        image {
          id
          name
          alternativeText
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`;

export default PostPage;
