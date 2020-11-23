import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { isEmptyArray } from '../../../utils'
import { CALL_API } from '../../../apis/interface'

const PeriodDropdown = memo(({ setReviews, currentPeriod, setCurrentPeriod }) => {
  const [periods, setPeriods] = useState([])

  // Get all users for assign auditor function
  useEffect(() => {
    CALL_API.REVIEW.getPerformancePeriods().then((data) => {
      setPeriods(data)
    })
  }, [])

  if (isEmptyArray(periods)) return null

  const handleChangePeriod = (id) => {
    CALL_API.REVIEW.getPerformancePeriodById(id).then((data) => {
      setCurrentPeriod(id)
      setReviews(data)
    })
  }

  const renderDropdownItem = (period) => {
    return (
      <Dropdown.Item
        active={currentPeriod === period.id}
        key={`period_${period.id}`}
        id={period.id}
        onClick={() => handleChangePeriod(period.id)}
      >
        {period.title}
      </Dropdown.Item>
    )
  }

  const dropDownTitle =
    currentPeriod === 0 ? 'Periods' : periods.filter((period) => period.id === currentPeriod)[0].title

  return (
    <DropdownButton variant="outline-primary" id="dropdown-basic-button" title={dropDownTitle}>
      {periods.map(renderDropdownItem)}
    </DropdownButton>
  )
})

PeriodDropdown.propTypes = {
  currentPeriod: PropTypes.number.isRequired,
  setCurrentPeriod: PropTypes.func.isRequired,
  setReviews: PropTypes.func.isRequired,
}

export default PeriodDropdown
