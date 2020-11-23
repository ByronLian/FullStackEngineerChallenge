import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const ModalReviewContent = memo(({ review, disabled, handleCommentChange }) => {
  return (
    <>
      <Form.Group>
        <h5>Comment</h5>
        <Form.Control
          defaultValue={review.content}
          disabled={disabled}
          as="textarea"
          rows={10}
          onChange={(e) => handleCommentChange(e, review.review_key)}
        />
      </Form.Group>
    </>
  )
})

ModalReviewContent.defaultProps = {
  review: {},
  disabled: false,
  handleCommentChange: () => {},
}

ModalReviewContent.propTypes = {
  review: PropTypes.instanceOf(Object),
  disabled: PropTypes.bool,
  handleCommentChange: PropTypes.func,
}

export default ModalReviewContent
