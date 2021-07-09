import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

import { parseUrlQuery } from '../../../utilities';

import styles from "./gallery.module.scss";

/* eslint-disable */
// TODO rewrite this bollocks
// TODO refactor this navigation to a util
// TODO only disable ESLINT for the focus mode
const Gallery = ({ component, location }) => {
  const [activeImage, setActiveImage] = useState(null);

  // TODO can I key this to the gallery?
  useEffect(() => {
    const jumpToImage = Number(parseUrlQuery(location.search).image - 1);
    if (jumpToImage) {
      setActiveImage(jumpToImage);
    }
  }, [location.search]);

  const keyboardInputHandler = e => {
    if (e.key === "ArrowLeft") {
      navigateLeft();
    }
    if (e.key === "ArrowRight") {
      navigateRight();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", keyboardInputHandler);
    return () => {
      document.removeEventListener("keyup", keyboardInputHandler);
    };
  }, [keyboardInputHandler]);

  const navigateLeft = () => {
    if (activeImage !== null) {
      const newPos = activeImage <= 0 ? component.image.length - 1 : activeImage - 1;
      setFocus(newPos);
    }
  };

  const navigateRight = () => {
    if (activeImage !== null) {
      const newPos = activeImage >= component.image.length - 1 ? 0 : activeImage + 1;
      setFocus(newPos);
    }
  };

  const setFocus = (target) => {
    window.history.pushState({}, '', location.pathname + '?image=' + (target + 1));
    setActiveImage(target);
  }

  const closeFocus = () => {
    window.history.pushState({}, '', location.pathname);
    setActiveImage(null);
  }

  return (
    <div className={styles.container}>
      {component.image.map((image, i) => (
        <div key={image.image.id}>
          <div
            className={styles.imageWrapper}
            onClick={() => setFocus(i)}
          >
            <GatsbyImage
              image={image.image.localFile.childImageSharp.gatsbyImageData}
              alt={image.image.alternativeText} />
          </div>
          {image.title && <h3 className={styles.imageTitle}>{image.title}</h3>}
        </div>
      ))}
      {activeImage !== null && (
        <>
          <div
            className={styles.imageFocusBackground}
            onClick={() => closeFocus()}
          >
            <div className={styles.closeButton}>Close [x]</div>
          </div>
          <div className={styles.imageFocusInnerWrapper}>
            <div className={styles.navArrow} onClick={() => navigateLeft()}>
              &lt;
            </div>
            <div className={styles.imageFocus}>
              <div onClick={() => navigateRight()}>
                <GatsbyImage
                  image={component.image[activeImage].image.localFile.childImageSharp.gatsbyImageData} />
                {component.image[activeImage].title && (
                  <h3 className={styles.imageTitleFocus}>
                    {component.image[activeImage].title}
                  </h3>
                )}
              </div>
            </div>
            <div className={styles.navArrow} onClick={() => navigateRight()}>
              &gt;
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Gallery.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Gallery;
