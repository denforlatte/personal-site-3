import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../../components/Header";
import MobileVegvisir from '../../components/MobileVegvisir';

import styles from './landingPage.module.scss';

const LandingPage = ({location, children, noVegvisir}) => {
  const data = useStaticQuery(querySketch);

  return <>
    <Header location={location}/>
    {!noVegvisir && <MobileVegvisir />}
    <main className={styles.mainContainer}>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.image}>
        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} loading={'eager'} />
      </div>
    </main>
  </>;
}

LandingPage.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  noVegvisir: PropTypes.bool,
}

const querySketch = graphql`{
  file(relativePath: {eq: "danny-sketch.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, placeholder: NONE, layout: FULL_WIDTH)
    }
  }
}
`;

export default LandingPage
