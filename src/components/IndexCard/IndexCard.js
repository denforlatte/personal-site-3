import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from './indexCard.module.scss';

const IndexCard = ({
  item: { title, summary, thumbnail, tags, published_date, slug },
}) => {
  return (
    <article className={styles.container}>
      {thumbnail ? (<Img
        fluid={thumbnail.localFile.childImageSharp.fluid}
        alt={thumbnail.alternativeText}
        style={{width: "400px"}}
      />) : <div>IMAAAAGE</div>}
      
      <div>
        <Link to={slug}>
          <h2>{title}</h2>
        </Link>
        <p>{summary}</p>
        <Link to={slug}>Read more</Link>
      </div>
    </article>
  );
};

IndexCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IndexCard;
