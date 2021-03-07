import React, { useState, useEffect } from "react";
import { Index } from "elasticlunr";
import { parseUrlQuery } from "../utilities";

import SEO from "../components/seo";
import Header from "../components/Header";
import IndexCard from "../components/IndexCard";
import DesktopIndexFilter from "../components/DesktopIndexFilter";

const SearchPage = ({ data, location }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const [types, setTypes] = useState([{ name: "Blog" }, { name: "Project" }]);
  const [tags, setTags] = useState(data.allStrapiTag.nodes);

  console.log("types", types);

  useEffect(() => {
    if (location.search) {
      setQuery(parseUrlQuery(location.search).q);
      search(parseUrlQuery(location.search).q);
    }
  }, [location.search, tags, types]); // TODO This seems like a terrible idea. Jup. Causes reset to url query

  // TODO useEffect?
  const getOrCreateIndex = () => Index.load(data.siteSearchIndex.index);

  const handleToggleTag = name => {
    const tagIndex = tags.findIndex(tag => tag.name === name);

    // Create an array of cloned tags
    let tagsCopy = tags.map(tag => ({ ...tag }));
    tagsCopy[tagIndex].isActive = !tags[tagIndex].isActive;

    setTags(tagsCopy);
  };

  const handleToggleTypes = name => {
    const typeIndex = types.findIndex(type => type.name === name);

    // Create an array of cloned types
    let typesCopy = types.map(type => ({ ...type }));
    typesCopy[typeIndex].isActive = !types[typeIndex].isActive;

    setTypes(typesCopy);
  };

  const search = query => {
    setQuery(query);
    const index = getOrCreateIndex();

    let results = index
      .search(query, {})
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref));

    // TODO extract
    // TODO filter by content
    if (isTypeFilterActive()) results = results.filter(typeFilter);

    // TODO extract
    // filter by tags
    if (isTagFilterActive()) results = results.filter(tagFilter);

    setResults(results);
  };

  const tagFilter = node => {
    for (let i = 0; i < node.tags.length; i++) {
      const tagName = node.tags[i].name;

      if (tags.find(tag => tag.name === tagName).isActive) {
        return true;
      }
    }
    return false;
  };

  const typeFilter = node => {
    for (let i = 0; i < types.length; i++) {
      if (types[i].isActive) {
        if (node.id.includes(types[i].name)) {
          return true;
        }
      }
    }
    return false;
  };

  const isTagFilterActive = () => {
    let isFilterActive = false;

    tags.forEach(tag => {
      if (tag.isActive) isFilterActive = true;
    });

    return isFilterActive;
  };

  const isTypeFilterActive = () => {
    let isFilterActive = false;

    types.forEach(type => {
      if (type.isActive) isFilterActive = true;
    });

    return isFilterActive;
  };

  console.log("results", results);
  console.log("types", types);

  // TODO refact search filters and input?
  return (
    <>
      <SEO title="Search" />
      <Header location={location} />
      <main style={{ marginBottom: "50px" }}>
        <div>
          <label>
            Search:
            <input
              type="text"
              aria-label="search input"
              value={query}
              onChange={e => search(e.target.value)}
            ></input>
          </label>
          <div>
            <div>Refine your search</div>
            <div>
              <div>Content:</div>
              <DesktopIndexFilter tags={types} toggleTag={handleToggleTypes} />
            </div>
            <div>
              <div>Tags:</div>
              <DesktopIndexFilter tags={tags} toggleTag={handleToggleTag} />
            </div>
          </div>
        </div>

        {results.map(item => (
          <IndexCard key={item.id} item={item} />
        ))}
      </main>
    </>
  );
};

export const SearchPageQuery = graphql`
  query {
    siteSearchIndex {
      index
    }
    allStrapiTag {
      nodes {
        name
        totalCount
      }
    }
  }
`;

export default SearchPage;
