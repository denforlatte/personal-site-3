import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from 'gatsby';

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";
import DesktopIndexFilter from "../../components/DesktopIndexFilter";

const IndexPage = ({ location, nodes }) => {
  const data = useStaticQuery(query);
  const [tags, setTags] = useState(data.allStrapiTag.nodes);

  const handleToggleTag = name => {
    const tagIndex = tags.findIndex(tag => tag.name === name);

    // Create an array of cloned tags
    let tagsCopy = tags.map(tag => ({...tag}));
    tagsCopy[tagIndex].isActive = !tags[tagIndex].isActive;

    setTags(tagsCopy);
  };

  const nodeFilter = (node) => {    
    for (let i = 0; i < node.tags.length; i++) {
      const tagName = node.tags[i].name;

      if (tags.find(tag => tag.name === tagName).isActive) {
        return true;
      }
    }
    return false;
  }

  const isFilterActive = () => {
    let isFilterActive = false;

    tags.forEach(tag => {
      if (tag.isActive)
        isFilterActive = true;
    })

    return isFilterActive;
  }

  const generateIndexCards = () => {
    let nodesCopy = [...nodes];

    if (isFilterActive())
      nodesCopy = nodesCopy.filter(nodeFilter);

    return nodesCopy.map(node => (
      <IndexCard item={node} key={node.slug}/>
    ))
  }

  return (
    <>
      <Header location={location} tags={tags} toggleTag={handleToggleTag}/>
      <DesktopIndexFilter tags={tags} toggleTag={handleToggleTag} />
      <main style={{ marginBottom: "50px" }}>
        {generateIndexCards()}
        <br/>
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
