import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import styles from "./header.module.scss";

import SocialLinks from './SocialLinks';
import MobileNav from '../MobileNav';
import MobileMenu from '../MobileMenu';

const Header = ({ location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const data = useStaticQuery(query);
  const links = ["Home", "Projects", "Blog", "Games", "About", "Contact", "Search"];

  const generateNavLinks = () => (
    links.map(link => {
      const url = link === 'Home' ? '/' : '/' + link.toLowerCase();
      const isActive = location.pathname === url;
      const className = isActive ? styles.navLinkActive : styles.navLink;
      
      return (
      <li key={link}>
        <Link to={url} className={className}>{link}</Link>
      </li>
    )})
  )

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
      <MobileNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
      {isMenuOpen && <MobileMenu  links={links} location={location} isMenuOpen={isMenuOpen}/>}
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
