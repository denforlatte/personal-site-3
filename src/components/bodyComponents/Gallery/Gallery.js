import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import styles from "./gallery.module.scss";

/* eslint-disable */
// TODO refactor this.
// TODO only disable ESLINT for the focus mode
const Gallery = ({ component }) => {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    document.addEventListener("keyup", keyboardInputHandler);
    return () => {
      document.removeEventListener("keyup", keyboardInputHandler);
    };
  }, [keyboardInputHandler]);

  const navigateLeft = () => {
    if (activeImage !== null) {
      setActiveImage(i => (i <= 0 ? component.image.length - 1 : i - 1));
    }
  };

  const navigateRight = () => {
    if (activeImage !== null) {
      setActiveImage(i => (i >= component.image.length - 1 ? 0 : i + 1));
    }
  };

  const keyboardInputHandler = e => {
    if (e.key === "ArrowLeft") {
      setActiveImage(i => {
        if (i === null) return null;
        return i <= 0 ? component.image.length - 1 : i - 1;
      });
    }
    if (e.key === "ArrowRight") {
      setActiveImage(i => {
        if (i === null) return null;
        return i >= component.image.length - 1 ? 0 : i + 1;
      });
    }
  };

  return (
    <div className={styles.container}>
      {component.image.map((image, i) => (
        <div key={image.image.id}>
          <div
            className={styles.imageWrapper}
            onClick={() => setActiveImage(i)}
          >
            <Img
              fluid={image.image.localFile.childImageSharp.fluid}
              alt={image.image.alternativeText}
            />
          </div>
          {image.title && <h3 className={styles.imageTitle}>{image.title}</h3>}
        </div>
      ))}
      {activeImage !== null && (
        <>
          <div
            className={styles.imageFocusBackground}
            onClick={() => setActiveImage(null)}
          >
            <div>Close [x]</div>
          </div>
          <div className={styles.imageFocusInnerWrapper}>
            <div className={styles.navArrow} onClick={() => navigateLeft()}>
              &lt;
            </div>
            <div className={styles.imageFocus}>
              <div onClick={() => navigateRight()}>
                <Img
                  fluid={
                    component.image[activeImage].image.localFile.childImageSharp
                      .fluid
                  }
                />
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
};

export default Gallery;
