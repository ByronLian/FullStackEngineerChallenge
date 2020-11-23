import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BadgeComponent from '../../common/badge'
import Popup from '../../common/modal/index'
import ModalReviewContent from '../../common/modal/review'
import TableComponent from '../../common/table'
import { isEmptyString, isEmptyArray } from '../../utils'

const ReviewTable = memo(({ reviews, handleUpdateComment, handleCommentChange, init }) => {
  // Table head content
  const titles = ['Period', 'Duration', 'Candidate', 'Comment', 'Updated Time', 'Action', 'Status']
  // Table CSS class
  const classes = ['', '', 'md_col', 'lg_col', '', '']

  // Table body content
  const tableRows =
    !isEmptyArray(reviews) &&
    reviews.map((review) => {
      const isClosed = review.is_closed === 1
      const title = `${review.title} : ${review.name}`
      const buttonText = isEmptyString(review.content) ? 'Add' : 'Edit'

      const renderUpdateContent = () => (
        <Popup
          size="lg"
          title={title}
          buttonText={isClosed ? 'View' : buttonText}
          hiddenSaveButton={isClosed}
          onSave={handleUpdateComment}
          init={init}
        >
          <ModalReviewContent review={review} disabled={isClosed} handleCommentChange={handleCommentChange} />
        </Popup>
      )

      const fields = [
        review.title,
        `${review.start} ~ ${review.end}`,
        review.name,
        review.content,
        review.updated_time,
        renderUpdateContent(),
        <BadgeComponent isClosed={isClosed} />,
      ]

      return fields
    })

  return (
    <>
      {!isEmptyArray(reviews) ? (
        <TableComponent classes={classes} titles={titles} rows={tableRows} />
      ) : (
        <h4>No review task now</h4>
      )}
    </>
  )
})

ReviewTable.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
}

export default ReviewTable
