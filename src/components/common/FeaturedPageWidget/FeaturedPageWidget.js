import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import styles from './featuredPage.module.scss';

const FeaturedPageWidget = () => {
  const data = useStaticQuery(query);

  return (
    <div>
      <h4>Featured Page</h4>
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt={"Probably unrelated Celtic doodle default image"}
        className={styles.image}
      />
      <p className={styles.pageTitle}>My First Blog Post</p>
      <p className={styles.pageSummary} >
        This is where I would write a very short summary about some cool page I
        want to draw special attention to.
      </p>
    </div>
  );
};

const query = graphql`
  query {
    file(relativePath: { eq: "doodlysketch.jpg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default FeaturedPageWidget;
