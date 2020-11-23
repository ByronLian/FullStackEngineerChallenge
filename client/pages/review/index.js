import React, { useState, useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import Header from '../../common/header'
import ReviewTable from './reviewTable'
import ToastComponent from '../../common/toast'
import { isLogin, isEmptyString } from '../../utils'
import { CALL_API } from '../../apis/interface'

const Reviews = () => {
  const { user } = useContext(AuthContext)
  const [updatedReview, setUpdatedReview] = useState({})
  const [reviews, setReviews] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [message, setShowToastMessage] = useState('')

  // Get all reviews which were assigned to current user
  useEffect(() => {
    CALL_API.REVIEW.getReviewsByUser(user.id).then((data) => {
      setReviews(data)
    })
  }, [])

  // Redirect to login page if not login
  if (!isLogin(user)) return <Redirect to="/" />

  // Reset
  const init = () => {
    setUpdatedReview({})
  }

  const handleCommentChange = (e, key) => {
    e.preventDefault()
    setUpdatedReview({
      key,
      content: e.target.value,
    })
  }

  // Update review content
  const handleUpdateComment = () => {
    if (isEmptyString(updatedReview.content)) return
    CALL_API.REVIEW.updateReviewByUser(updatedReview.key, {
      content: updatedReview.content,
    }).then(() => {
      setShowToast(true)
      setShowToastMessage('Update Review success')

      CALL_API.REVIEW.getReviewsByUser(user.id).then((data) => {
        setReviews(data)
      })
    })
  }

  return (
    <Container fluid="lg">
      <Header />
      <ToastComponent setShowToast={setShowToast} showToast={showToast} message={message} />
      <ReviewTable
        reviews={reviews}
        handleUpdateComment={handleUpdateComment}
        handleCommentChange={handleCommentChange}
        init={init}
      />
    </Container>
  )
}

export default Reviews
