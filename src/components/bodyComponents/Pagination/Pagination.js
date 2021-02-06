import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { richTextToProse } from '../../../utilities';

import PaginationNav from '../../common/PaginationNav';

const Pagination = ({component}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { page } = component;

  return (
    <>
      <PaginationNav numberOfPages={page.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {page[currentPage].title && <h3>{page[currentPage].title}</h3>}
      {richTextToProse(page[currentPage].text)}
      <PaginationNav numberOfPages={page.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

Pagination.propTypes = {
  component: PropTypes.object.isRequired,
}

export default Pagination
