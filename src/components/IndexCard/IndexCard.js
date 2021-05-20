import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import * as styles from "./indexCard.module.scss";

import IndexDate from "../IndexDate";
import DefaultImage from "../DefaultImage";
import LocalThumbnail from "./LocalThumbnail";
import MobileVegvisir from "../../components/MobileVegvisir";
import Tags from "../common/Tags";

const IndexCard = ({
  item: { title, summary, thumbnail, tags, published_date, slug, path },
}) => {
  published_date = new Date(published_date);

  const displayThumbnail = () => {
    if (!thumbnail) {
      return <DefaultImage />;
    }
    if (thumbnail.localFile) {
      return (
        <Img
          fluid={thumbnail.localFile.childImageSharp.fluid}
          alt={thumbnail.alternativeText}
        />
      );
    }
    if (!thumbnail.localFile) { // Indicates this is from the search index
      return <LocalThumbnail thumbnail={thumbnail} />;
    }
  };

  return (
    <>
      <MobileVegvisir />
      <article className={styles.article}>
        <IndexDate date={published_date} className={styles.sideDate} />

        <div className={styles.container}>
          {displayThumbnail()}

          <div className={styles.textContainer}>
            <Link to={path ? path : slug}>
              <h2>{title}</h2>
            </Link>
            <p>{summary}</p>
            <Link to={path ? path : slug} className={styles.readMore}>
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
                <span>{published_date.getDate()}</span>{" "}
                {published_date.toLocaleDateString("default", {
                  month: "short",
                })}{" "}
                {published_date.getFullYear()}
              </p>
            </div>
          </div>
        </div>

        <Tags tags={tags} className={styles.sideTags} />
      </article>
    </>
  );
};

IndexCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IndexCard;
