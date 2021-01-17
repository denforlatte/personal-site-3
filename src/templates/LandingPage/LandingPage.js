import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';

import Header from "../../components/Header";
import MobileVegvisir from '../../components/MobileVegvisir';

import styles from './landingPage.module.scss';

const LandingPage = ({location, children, noVegvisir}) => {
  const data = useStaticQuery(querySketch);

  return (
    <>
      <Header location={location}/>
      {!noVegvisir && <MobileVegvisir />}
      <main className={styles.mainContainer}>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.image}>
          <Img fluid={data.file.childImageSharp.fluid}/>
        </div>
      </main>
    </>
  )
}

LandingPage.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  noVegvisir: PropTypes.bool,
}

const querySketch = graphql`
  query {
    file(relativePath: { eq: "danny-sketch.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default LandingPage
