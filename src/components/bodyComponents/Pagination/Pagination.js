import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { parseUrlQuery, richTextToProse } from '../../../utilities';

import PaginationNav from '../../common/PaginationNav';

const Pagination = ({component, location}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { page } = component;

  const switchToPage = useCallback(targetPage => {
    setCurrentPage(targetPage);
    window.history.pushState({}, '', location.pathname + '?p=' + (targetPage + 1));
  }, [location.pathname]);
  
  useEffect(() => {
    const jumpToPage = Number(parseUrlQuery(location.search).p - 1);
    if (jumpToPage) {
      switchToPage(jumpToPage);
    }
    
  }, [location.search, switchToPage]);

  return (
    <>
      <PaginationNav numberOfPages={page.length} currentPage={currentPage} switchToPage={switchToPage} />
      {page[currentPage].title && <h3>{page[currentPage].title}</h3>}
      {richTextToProse(page[currentPage].text)}
      <PaginationNav numberOfPages={page.length} currentPage={currentPage} switchToPage={switchToPage} />
    </>
  )
}

Pagination.propTypes = {
  component: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Pagination
