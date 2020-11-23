import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const Popup = memo(
  ({ size, show, title, buttonText, children, onSave, init, disabled, hiddenSaveButton, hidden, block }) => {
    const [popup, setPopup] = useState(show)

    if (hidden) return null

    const handleClose = () => {
      init && init()
      setPopup(false)
    }

    const handleClick = () => {
      init && init()
      setPopup(true)
    }

    const handleSave = () => {
      onSave()
      setPopup(false)
    }

    return (
      <>
        <Button block={block} variant="outline-primary" onClick={handleClick} disabled={disabled}>
          {buttonText}
        </Button>
        <Modal size={size} show={popup} onHide={handleClose}>
          <Modal.Header className="modal_header" closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            {!hiddenSaveButton && (
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    )
  }
)

Popup.defaultProps = {
  hidden: false,
  show: false,
  block: true,
  hiddenSaveButton: false,
  init: () => {},
  onSave: () => {},
  size: '',
  buttonText: '',
  title: '',
  disabled: false,
  children: <></>,
}

Popup.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onSave: PropTypes.func,
  init: PropTypes.func,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  hiddenSaveButton: PropTypes.bool,
  hidden: PropTypes.bool,
  block: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
}

export default Popup
