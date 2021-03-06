import React, { useState, useEffect } from "react";
import { Index } from 'elasticlunr';
import { parseUrlQuery } from '../utilities';

import SEO from "../components/seo";
import Header from "../components/Header";

const SearchPage = ({ data, location }) => {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (location.search) {
      setQuery(parseUrlQuery(location.search).q);
      search({ target: { value: parseUrlQuery(location.search).q } });
    }
  }, [location.search]);
  
  const getOrCreateIndex = () => Index.load(data.siteSearchIndex.index);

  const search = (e) => {
    const query = e.target.value;
    setQuery(query);
    const index = getOrCreateIndex();

    const results = index
      .search(query, {})
      // Map over each ID and return the full document
      .map(({ ref }) => index.documentStore.getDoc(ref));

    setResults(results);
  };

  console.log('query', query);
  console.log('results', results);

  return (
    <>
      <SEO title="Search" />
      <Header location={location} />
      <main style={{ maxWidth: "1080px", padding: "8px", margin: "auto" }}>
        <h1>Coming soon!</h1>
        <p>Sooner than Half Life 3, at least.</p>
      </main>
    </>
  );
};

export const SearchPageQuery = graphql`
  query {
    siteSearchIndex {
      index
    }
  }
`;

export default SearchPage;
