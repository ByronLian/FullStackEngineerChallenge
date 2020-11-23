import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import Popup from '../../../common/modal/index'
import Header from '../../../common/header'
import { isAdmin, isLogin, isEmptyString, isEmptyArray } from '../../../utils'
import { CALL_API } from '../../../apis/interface'
import ToastComponent from '../../../common/toast'
import ModalPeriodContent from '../../../common/modal/period'
import PeriodTable from './periodTable'

const Period = () => {
  const { user } = useContext(AuthContext)
  const [periods, setPeriods] = useState([])
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [message, setShowToastMessage] = useState('')

  // Get all performance periods
  useEffect(() => {
    CALL_API.REVIEW.getPerformancePeriods().then((data) => {
      setPeriods(data)
    })
  }, [])

  if (!isLogin(user)) return <Redirect to="/" />
  if (!isAdmin(user)) return <Redirect to="/reviews" />

  const handleInputChange = (e, key) => {
    switch (key) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'start':
        setStart(e.target.value)
        break
      case 'end':
        setEnd(e.target.value)
        break
      default:
        break
    }
  }

  // Reset
  const init = () => {
    setTitle('')
    setStart('')
    setEnd('')
  }

  // Create new performance period
  const handleCreatePerformance = () => {
    if (isEmptyString(title) || isEmptyString(start) || isEmptyString(end)) return

    CALL_API.REVIEW.addNewPerformancePeriod({
      title,
      start,
      end,
    }).then(() => {
      setShowToast(true)
      setShowToastMessage('Create new period success')

      CALL_API.REVIEW.getPerformancePeriods().then((data) => {
        setPeriods(data)
      })
    })
  }

  // Update performance period
  const handleUpdatePeriod = (reviewPeriod, type) => {
    const isUpdateStatus = type === 'status'
    const options = isUpdateStatus
      ? {
          is_closed: reviewPeriod.is_closed === 0 ? 1 : 0,
        }
      : { title, start, end }

    CALL_API.REVIEW.updatePerformancePeriod(reviewPeriod.id, options).then(() => {
      setShowToast(true)
      setShowToastMessage(isUpdateStatus ? 'Update period status success' : 'Update period info success')

      CALL_API.REVIEW.getPerformancePeriods().then((data) => {
        setPeriods(data)
      })
    })
  }

  return (
    <Container fluid="lg">
      <Header />
      <ToastComponent setShowToast={setShowToast} showToast={showToast} message={message} />
      <Popup
        title="Create New Period"
        buttonText="+ New Period"
        onSave={handleCreatePerformance}
        init={init}
        block={false}
      >
        <ModalPeriodContent handleInputChange={handleInputChange} />
      </Popup>
      <br />
      <br />
      {!isEmptyArray(periods) ? (
        <PeriodTable
          handleUpdatePeriod={handleUpdatePeriod}
          handleInputChange={handleInputChange}
          init={init}
          periods={periods}
        />
      ) : (
        <h4>Have no data</h4>
      )}
    </Container>
  )
}

export default Period
