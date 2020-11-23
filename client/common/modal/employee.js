import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const ModalEmployeeContent = memo(({ user, handleInputChange }) => {
  return (
    <>
      <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="input"
          defaultValue={user.first_name}
          onChange={(e) => handleInputChange(e, 'first_name')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="input" defaultValue={user.last_name} onChange={(e) => handleInputChange(e, 'last_name')} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          defaultValue={user.email}
          disabled={user.email !== undefined}
          onChange={(e) => handleInputChange(e, 'email')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="input" defaultValue="" onChange={(e) => handleInputChange(e, 'password')} />
      </Form.Group>
    </>
  )
})

ModalEmployeeContent.defaultProps = {
  user: {},
  handleInputChange: () => {},
}

ModalEmployeeContent.propTypes = {
  user: PropTypes.instanceOf(Object),
  handleInputChange: PropTypes.func,
}

export default ModalEmployeeContent
