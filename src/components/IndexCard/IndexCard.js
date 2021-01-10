import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from './indexCard.module.scss';
import IndexDate from "../IndexDate";

const IndexCard = ({
  item: { title, summary, thumbnail, tags, published_date, slug },
}) => {
  return (
    <article className={styles.article}>
      <IndexDate date={new Date(published_date)}/>

      <div className={styles.container}>
        {thumbnail ? (<Img
          fluid={thumbnail.localFile.childImageSharp.fluid}
          alt={thumbnail.alternativeText}
          className={styles.image}
        />) : <div className={styles.image}>IMAAAAGE</div>}
        
        <div className={styles.textContainer}>
          <Link to={slug}>
            <h2>{title}</h2>
          </Link>
          <p>{summary}</p>
          <Link to={slug} className={styles.readMore}>Read more</Link>
        </div>
      </div>
      
      <div className={styles.tagContainer}>
        {tags.map(tag => (
          <Link to={'/tags/' + tag.slug} className={styles.tag}>{tag.name}</Link>
        ))}
      </div>
    </article>
  );
};

IndexCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IndexCard;
