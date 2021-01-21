import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";
import DesktopIndexFilter from "../../components/DesktopIndexFilter";

// TODO make separate array of active tags.
// TODO filter posts
const IndexPage = ({ location, nodes }) => {
  const [tags, setTags] = useState([]);

  // Harvest tags in order of use
  // TODO refactor this to the build step and query it
  useEffect(() => {
    let orderedTags = [];

    nodes.forEach(node => {
      node.tags.forEach(tag => {
        const tagIndex = orderedTags.findIndex(t => t.name === tag.name);

        if (tagIndex > 0) {
          orderedTags[tagIndex].count++
        } else {
          const tagClone = {...tag};
          tagClone.count = 1
          orderedTags.push(tagClone)
        }
      })
    })

    orderedTags = orderedTags.sort((a, b) => b.count - a.count);
    setTags(orderedTags);
  }, [nodes])

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

export default IndexPage;
