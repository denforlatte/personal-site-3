import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery } from 'gatsby';

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";
import DesktopIndexFilter from "../../components/DesktopIndexFilter";

// TODO filter posts
const IndexPage = ({ location, nodes }) => {
  const data = useStaticQuery(query);
  const [tags, setTags] = useState(data.allStrapiTag.nodes);

  const handleToggleTag = name => {
    const tagIndex = tags.findIndex(tag => tag.name === name);

    let tagsCopy = [...tags];
    tagsCopy[tagIndex].isActive = !tags[tagIndex].isActive;

    setTags(tagsCopy);
  };

  return (
    <>
      <Header location={location} />
      <DesktopIndexFilter tags={tags} toggleTag={handleToggleTag} />
      <main style={{ marginBottom: "50px" }}>
        {nodes.map(node => (
          <IndexCard item={node} key={node.slug} />
        ))}
      </main>
    </>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
};

const query = graphql`
  query {
    allStrapiTag {
      nodes {
        name
        slug
        id
        projectCount
        blogPostCount
      }
    }
  }
`;

export default IndexPage;
