import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";

import styles from './featuredPage.module.scss';

const FeaturedPageWidget = () => {
  const data = useStaticQuery(query);

  return (
    <div>
      <h4>Featured Page</h4>
      <Link to='/blog/welcome-to-my-website'>
        <Img
          fluid={data.strapiBlogPost.thumbnail.localFile.childImageSharp.fluid}
          alt={"Probably unrelated Celtic doodle default image"}
          className={styles.image}
        />
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
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default FeaturedPageWidget;
