import React from 'react'
import PropTypes from 'prop-types'

const TagPage = ({data}) => {
  console.log('data :>> ', data);

  return (
    <div>
      TAG
    </div>
  )
}

TagPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TagPage
