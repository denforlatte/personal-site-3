import React from "react";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

import styles from "./mobileVegvisir.module.scss";

const MobileVegvisir = () => {
  const data = useStaticQuery(queryVegvisir);

  return (
    <div className={styles.mobileVegvisir}>
      <Img fixed={data.file.childImageSharp.fixed} />
    </div>
  );
};

const queryVegvisir = graphql`
  query {
    file(relativePath: { eq: "vegvisir.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default MobileVegvisir;
