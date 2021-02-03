import React from "react";
import PropTypes from "prop-types";

import { richTextToPTags } from "../../../utilities";

const RichText = ({component}) => <p>{richTextToPTags(component.text)}</p>;

RichText.propTypes = {
  component: PropTypes.object.isRequired,
};

export default RichText;
