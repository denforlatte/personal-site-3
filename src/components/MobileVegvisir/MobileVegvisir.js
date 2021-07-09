import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

import styles from "./mobileVegvisir.module.scss";

const MobileVegvisir = () => {
  const data = useStaticQuery(queryVegvisir);

  return (
    <div className={styles.mobileVegvisir}>
      <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} />
    </div>
  );
};

const queryVegvisir = graphql`{
  file(relativePath: {eq: "vegvisir.png"}) {
    childImageSharp {
      gatsbyImageData(width: 80, layout: FIXED)
    }
  }
}
`;

export default MobileVegvisir;
