import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styles from "./header.module.scss";

import SocialLinks from "./SocialLinks";
import MobileNav from "../MobileNav";
import MobileMenu from "../MobileMenu";
import MobileFilter from "../MobileFilter";

const Header = ({ location, tags, toggleTag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const data = useStaticQuery(query);
  const links = ["Home", "Projects", "Blog", "Games", "About", "Search"];

  const generateNavLinks = () => {
    const currentLocation = "/" + location.pathname.split("/")[1];
    return links.map(link => {
      const url = link === "Home" ? "/" : "/" + link.toLowerCase();
      const isActive = url === currentLocation;
      const className = isActive ? styles.navLinkActive : styles.navLink;

      return (
        <li key={link}>
          <Link to={url} className={className}>
            {link}
          </Link>
        </li>
      );
    });
  };

  const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen);
  const toggleFilterOpen = () => setIsFilterOpen(!isFilterOpen);

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <GatsbyImage
          image={data.file.childImageSharp.gatsbyImageData}
          className={styles.logo}
          loading={'lazy'} />
        <div className={styles.primaryContainer}>
          <h1 className={styles.title}>Danny Thorbjørn Wilkins</h1>
          <p className={styles.tagline}>
            My journal. My corner of the Internet.
          </p>
          <SocialLinks />
        </div>
      </div>
      <nav>
        <ul className={styles.navbar}>
          {generateNavLinks()}
        </ul>
      </nav>
      <MobileNav
        toggleMenuOpen={toggleMenuOpen}
        toggleFilterOpen={toggleFilterOpen}
        showFilter={tags !== undefined}
      />
      {isMenuOpen && <MobileMenu links={links} location={location} />}
      {isFilterOpen && <MobileFilter tags={tags} toggleTag={toggleTag} />}
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  tags: PropTypes.array,
  toggleTag: PropTypes.func,
};

const query = graphql`{
  file(relativePath: {eq: "vegvisir.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 100, placeholder: NONE, layout: FULL_WIDTH)
    }
  }
}
`;

export default Header;
