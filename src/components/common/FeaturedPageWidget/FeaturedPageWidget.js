import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import styles from './featuredPage.module.scss';

const FeaturedPageWidget = () => {
  const data = useStaticQuery(query);

  return (
    <div>
      <h4>Featured Page</h4>
      <Link to='/blog/welcome-to-my-website'>
        <GatsbyImage
          image={data.strapiBlogPost.thumbnail.localFile.childImageSharp.gatsbyImageData}
          alt={"Vegvisir"}
          className={styles.image} />
      </Link>
      
      <Link to='/blog/welcome-to-my-website'>
        <p className={styles.pageTitle}>My First Blog Post</p>
      </Link>
      <p className={styles.pageSummary}>
        The first blog post on my new website, hopefully the first of many. In
        this post I talk about the technologies I used to build this site as
        well as where I hope to take it. Join me for the adventure!
      </p>
    </div>
  );
};

const query = graphql`
  query {
    strapiBlogPost(slug: {eq: "welcome-to-my-website"}) {
      thumbnail {
        localFile {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;

export default FeaturedPageWidget;
