import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import IndexCard from "../../components/IndexCard";
import MobileVegvisir from '../../components/MobileVegvisir';
import DesktopIndexFilter from "../../components/DesktopIndexFilter";

// TODO harvest tags list from posts
// TODO make separate array of active tags.
// TODO filter posts
const IndexPage = ({ location, nodes }) => {
  const [tags, setTags] = useState(nodes[0].tags);

  const handleToggleTag = (name) => {
    const tagIndex = tags.findIndex(tag => tag.name === name);

    let tagsCopy = [...tags];
    tagsCopy[tagIndex].isActive = !tags[tagIndex].isActive;

    console.log('prev Tags :>> ', tags);
    console.log('toggle fired :>> ', tagsCopy);

    setTags(tagsCopy);
  }

  console.log('tagooos :>> ', tags);

  return (
    <>
      <Header location={location} />
      <DesktopIndexFilter tags={tags} toggleTag={handleToggleTag} />
      <main style={{marginBottom: '50px'}}>
        {nodes.map(node => (
          <>
            <MobileVegvisir />
            <IndexCard item={node} key={node.slug}/>
          </>
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
