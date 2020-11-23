import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import Popup from '../../../common/modal/index'
import BadgeComponent from '../../../common/badge'
import TableComponent from '../../../common/table'
import ModalReviewContent from '../../../common/modal/review'
import { isEmptyArray, isEmptyString } from '../../../utils'

const AssignTable = ({ users, reviews, handleSelectAuditor, handleAssignUser, init }) => {
  const renderModalBody = (candidateId) => {
    // Filter auditor: Performance must review by others
    const filterUsers = [...users].filter((user) => {
      return user.id !== candidateId
    })

    return (
      <Form>
        <Form.Group>
          <Form.Label>Select Auditor</Form.Label>
          <Form.Control as="select" htmlSize={15} custom>
            {filterUsers.map((user) => {
              return (
                <option onClick={(e) => handleSelectAuditor(e)} key={`auditor_selection_${user.id}`} value={user.id}>
                  {`${user.first_name} ${user.last_name}`}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    )
  }

  // Table head content
  const titles = ['Period', 'Candidate', 'Auditor', 'Content', 'Updated Time', 'View', 'Assign', 'Status']
  // Table CSS class
  const classes = ['', 'md_col', 'md_col', 'lg_col', 'md_col', '', 'md_col', 'md_col']
  // Table body content
  const tableRows =
    reviews &&
    reviews.map((review) => {
      const isClosed = review.is_closed === 1

      const renderViewContent = () => (
        <Popup size="lg" title={review.candidate_name} buttonText="View" init={init} hiddenSaveButton>
          <ModalReviewContent review={review} disabled />
        </Popup>
      )

      const renderAssignAuditor = () => {
        return (
          !isClosed && (
            <Popup
              title="Assign Auditor"
              buttonText={isEmptyString(review.auditor_name) ? 'Assign' : 'Edit'}
              disabled={isClosed}
              init={init}
              onSave={() => handleAssignUser(review.review_key)}
            >
              {renderModalBody(review.candidate_id)}
            </Popup>
          )
        )
      }

      const fields = [
        review.title,
        review.candidate_name,
        review.auditor_name,
        review.content,
        review.updated_time,
        renderViewContent(),
        renderAssignAuditor(),
        <BadgeComponent isClosed={isClosed} />,
      ]

      return fields
    })

  return (
    <>
      {!isEmptyArray(reviews) ? (
        <TableComponent classes={classes} titles={titles} rows={tableRows} />
      ) : (
        <h4>Have no review data</h4>
      )}
    </>
  )
}

AssignTable.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
  reviews: PropTypes.instanceOf(Array).isRequired,
  handleSelectAuditor: PropTypes.func.isRequired,
  handleAssignUser: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
}

export default AssignTable
