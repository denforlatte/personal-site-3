import React, { useState } from "react";
import { navigate } from "gatsby";

import * as styles from './searchWidget.module.scss';

const SearchWidget = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    navigate(`/search?q=${query}`);
  };

  const handleKeypress = e => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.searchWidget}>
      <h4>Search</h4>
      <input
        className={styles.input}
        type="text"
        aria-label="search input"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={handleKeypress}
      />
      <button className={styles.button} type="button" onClick={() => handleSubmit()}>
        Search
      </button>
    </div>
  );
};

export default SearchWidget;
