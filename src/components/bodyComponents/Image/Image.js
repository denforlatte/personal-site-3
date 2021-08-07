import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const Image = ({ component }) => {
  return (
    <div>
      <GatsbyImage
        image={component.image.localFile.childImageSharp.gatsbyImageData}
        alt={component.image.alternativeText}
      />
    </div>
  );
};

Image.propTypes = {
  component: PropTypes.object.isRequired,
};

export default Image;
