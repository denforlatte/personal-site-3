import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./indexCard.module.scss";
import IndexDate from "../IndexDate";
import MobileVegvisir from '../../components/MobileVegvisir';

const IndexCard = ({
  item: { title, summary, thumbnail, tags, published_date, slug },
}) => {
  published_date = new Date(published_date);

  return (
    <>
      <MobileVegvisir />
      <article className={styles.article}>
        <IndexDate date={published_date} />

        <div className={styles.container}>
          {thumbnail ? (
            <Img
              fluid={thumbnail.localFile.childImageSharp.fluid}
              alt={thumbnail.alternativeText}
              className={styles.image}
            />
          ) : (
            <div className={styles.image}>IMAAAAGE</div>
          )}

          <div className={styles.textContainer}>
            <Link to={slug}>
              <h2>{title}</h2>
            </Link>
            <p>{summary}</p>
            <Link to={slug} className={styles.readMore}>
              Read more
            </Link>
            <div className={styles.tagsAndDate}>
              <div>
                {tags.map(tag => (
                  <Link
                    to={"/tags/" + tag.slug}
                    className={styles.tag}
                    key={tag.name}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
              <p className={styles.mobileDate}>
                <span>{published_date.getDay()}</span>{" "}
                {published_date.toLocaleDateString("default", {
                  month: "short",
                })}{" "}
                {published_date.getFullYear()}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.tagContainer}>
          {tags.map(tag => (
            <Link
              to={"/tags/" + tag.slug}
              className={styles.tag}
              key={tag.name}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </article>
    </>
  );
};

IndexCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IndexCard;
