import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'react-bootstrap'

const ToastComponent = ({ setShowToast, showToast, message, time }) => {
  const handleOnCloseClick = () => {
    setShowToast(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false)
    }, time)
  }, [showToast])

  return (
    <div
      style={{
        position: 'fixed',
        top: '25px',
        right: '30px',
        width: '300px',
      }}
    >
      <Toast show={showToast} onClose={handleOnCloseClick}>
        <Toast.Header className="toast_header">
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="toast_body">{message}</Toast.Body>
      </Toast>
    </div>
  )
}

ToastComponent.defaultProps = {
  time: 2000,
}

ToastComponent.propTypes = {
  setShowToast: PropTypes.func.isRequired,
  showToast: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.number,
}

export default ToastComponent
