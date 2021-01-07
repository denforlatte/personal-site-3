import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import SEO from "../components/seo";
import LandingPage from "../templates/LandingPage";

import {richTextToPTags} from '../utilities';

const about = ({ data, location }) => {
  console.log('data.strapiAbout.body :>> ', data.strapiAbout.body);

  return (
    <>
      <SEO title="About" />
      <LandingPage location={location}>
        {richTextToPTags(data.strapiAbout.body)}
      </LandingPage>
    </>
  );
};

about.propTypes = {
  location: PropTypes.object.isRequired,
};

export const queryAbout = graphql`
  query {
    strapiAbout {
      body
    }
  }
`;

export default about;
