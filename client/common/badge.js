import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'react-bootstrap'

const BadgeComponent = ({ isClosed }) => {
  const message = isClosed ? 'Closed' : 'Ongoing'
  const variant = isClosed ? 'secondary' : 'primary'

  return <Badge variant={variant}>{message}</Badge>
}

BadgeComponent.propTypes = {
  isClosed: PropTypes.bool.isRequired,
}

export default BadgeComponent
