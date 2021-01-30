import React from 'react'
import PropTypes from 'prop-types'

const PostPage = ({data, pageContext, context}) => {
  console.log('data :>> ', data);
  console.log('pageContext :>> ', pageContext);
  console.log('context :>> ', context);

  return (
    <div>
      <h1>POST</h1>
    </div>
  )
}

PostPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PostPage
