import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import styles from "./header.module.scss";

import SocialLinks from './SocialLinks';
import MobileNav from '../MobileNav';

const Header = ({ location }) => {
  const data = useStaticQuery(query);

  const generateNavLinks = () => {
    const items = ["Home", "Projects", "Blog", "Games", "About", "Contact", "Search"];

    return items.map(item => {
      const url = item === 'Home' ? '/' : '/' + item.toLowerCase();
      const isActive = location.pathname === url;
      const className = isActive ? styles.navItemActive : styles.navItem;
      
      return (
      <li key={item}>
        <Link to={url} className={className}>{item}</Link>
      </li>
    )})
  }

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <Img className={styles.logo} fluid={data.file.childImageSharp.fluid} />
        <div className={styles.primaryContainer}>
          <h1 className={styles.title}>Danny Thorbjørn Wilkins</h1>
          <p className={styles.tagline}>My journal. My corner of the Internet.</p>
          <SocialLinks />
        </div>
      </div>
      <nav className={styles.navbar}>
        {generateNavLinks()}
      </nav>
      <MobileNav />
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

const query = graphql`
  query {
    file(relativePath: { eq: "vegvisir.png" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Header;
