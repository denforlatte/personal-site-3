import React from "react";
import PropTypes from "prop-types";
import { richTextToProse } from "../../../utilities";

const ProseText = ({ component }) => <>{richTextToProse(component.text)}</>;

ProseText.propTypes = {
  component: PropTypes.object.isRequired,
};

export default ProseText;
