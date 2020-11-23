import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const ModalPeriodContent = memo(({ period = {}, handleInputChange }) => {
  return (
    <>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="input"
          defaultValue={period.title}
          placeholder="2020 1H"
          onChange={(e) => handleInputChange(e, 'title')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start:</Form.Label>
        <Form.Control
          type="date"
          defaultValue={period.start}
          placeholder="2020/07/01"
          onChange={(e) => handleInputChange(e, 'start')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End:</Form.Label>
        <Form.Control
          type="date"
          defaultValue={period.end}
          placeholder="2020/08/31"
          onChange={(e) => handleInputChange(e, 'end')}
        />
      </Form.Group>
    </>
  )
})

ModalPeriodContent.defaultProps = {
  period: {},
  handleInputChange: () => {},
}

ModalPeriodContent.propTypes = {
  period: PropTypes.instanceOf(Object),
  handleInputChange: PropTypes.func,
}

export default ModalPeriodContent
