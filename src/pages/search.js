import React, { useState, useEffect } from "react";
import { Index } from "elasticlunr";
import { parseUrlQuery } from "../utilities";

import SEO from "../components/seo";
import Header from "../components/Header";
import IndexCard from "../components/IndexCard";
import DesktopIndexFilter from "../components/DesktopIndexFilter";

const SearchPage = ({ data, location }) => {
  const [index, setIndex] = useState(Index.load(data.siteSearchIndex.index));
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);
  const [types, setTypes] = useState([{ name: "Blog" }, { name: "Project" }]);
  const [tags, setTags] = useState(data.allStrapiTag.nodes);

  useEffect(() => {
    if (location.search) {
      search(parseUrlQuery(location.search).q);
    }
  }, [location.search]);

  const handleToggle = (items, setItems, name) => {
    const itemIndex = items.findIndex(item => item.name === name);
    let itemsCopy = items.map(item => ({ ...item }));
    itemsCopy[itemIndex].isActive = !items[itemIndex].isActive;
    setItems(itemsCopy);
  };

  const handleToggleTag = name => handleToggle(tags, setTags, name);
  const handleToggleTypes = name => handleToggle(types, setTypes, name);

  const search = query => {
    setQuery(query);

    const results = index
      .search(query, {})
      .map(({ ref }) => index.documentStore.getDoc(ref));

    setResults(results);
  };

  const tagFilter = node => {
    for (let i = 0; i < node.tags.length; i++) {
      if (tags.find(tag => tag.name === node.tags[i].name).isActive) {
        return true;
      }
    }
    return false;
  };

  const typeFilter = node => {
    for (let i = 0; i < types.length; i++) {
      if (types[i].isActive && node.id.includes(types[i].name)) {
        return true;
      }
    }
    return false;
  };

  const isFilterActive = filter => {
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].isActive) return true;
    }
    return false;
  };

  const displayFilteredPosts = () => {
    let display = [...results];
    if (isFilterActive(types)) display = display.filter(typeFilter);
    if (isFilterActive(tags)) display = display.filter(tagFilter);
    return display;
  };

  // TODO refact search filters and input?
  return (
    <>
      <SEO title="Search" />
      <Header location={location} />
      <main style={{ marginBottom: "50px" }}>
        <div className="searchFiltersContainer">
          <label htmlFor="search">
            Search:
          </label>
          <input
            id="search"
            type="text"
            aria-label="search input"
            value={query}
            onChange={e => search(e.target.value)}
          />
          <div className="filterHeader">Refine your search</div>
          <div></div>
          <div></div>
          <div className="filterSubheader">Content:</div>
          <DesktopIndexFilter tags={types} toggleTag={handleToggleTypes} />
          <div className="filterSubheader">Tags:</div>
          <DesktopIndexFilter tags={tags} toggleTag={handleToggleTag} />
        </div>

        {displayFilteredPosts().map(item => (
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
