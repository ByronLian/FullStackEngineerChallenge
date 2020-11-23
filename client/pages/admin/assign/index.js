import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../../../contexts/authContext'
import Header from '../../../common/header'
import PeriodDropdown from './periodDropdown'
import ToastComponent from '../../../common/toast'
import AssignTable from './assignTable'
import { isAdmin, isLogin, isEmptyArray } from '../../../utils'
import { CALL_API } from '../../../apis/interface'

const Assign = () => {
  const { user } = useContext(AuthContext)
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const [users, setUsers] = useState([])
  const [auditor, setAuditor] = useState(null)
  const [reviews, setReviews] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [message, setShowToastMessage] = useState('')

  useEffect(() => {
    // Get all reviews
    CALL_API.REVIEW.getPerformancePeriodById(0).then((data) => {
      setReviews(data)
    })

    // Get all users
    CALL_API.USER.getUsers().then((data) => {
      setUsers(data)
    })
  }, [])

  // Redirection by case
  if (!isLogin(user)) return <Redirect to="/" />
  if (!isAdmin(user)) return <Redirect to="/reviews" />
  if (isEmptyArray(users)) return null

  // Reset
  const init = () => {
    setAuditor(null)
  }

  // Select auditor to a review
  const handleSelectAuditor = (e) => {
    setAuditor(parseInt(e.target.value, 10))
  }

  // Save auditor after selected
  const handleAssignUser = (key) => {
    CALL_API.REVIEW.updateReviewByUser(key, {
      auditor_id: auditor,
      content: ' ',
    }).then(() => {
      setShowToast(true)
      setShowToastMessage('Assign auditor success')

      CALL_API.REVIEW.getPerformancePeriodById(currentPeriod).then((data) => {
        setReviews(data)
      })
    })
  }

  return (
    <Container fluid="lg">
      <Header />
      <ToastComponent setShowToast={setShowToast} showToast={showToast} message={message} />
      <PeriodDropdown setReviews={setReviews} currentPeriod={currentPeriod} setCurrentPeriod={setCurrentPeriod} />
      <br />
      <AssignTable
        users={users}
        reviews={reviews}
        handleSelectAuditor={handleSelectAuditor}
        handleAssignUser={handleAssignUser}
        init={init}
      />
    </Container>
  )
}

export default Assign
