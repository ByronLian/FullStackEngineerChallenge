import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import Popup from '../../../common/modal/index'
import ModalPeriodContent from '../../../common/modal/period'
import TableComponent from '../../../common/table'

const PeriodTable = ({ periods, handleInputChange, handleUpdatePeriod, init }) => {
  // Table head content
  const titles = ['Period', 'Duration', 'Status', 'Action']

  // Table body content
  const tableRows = periods.map((period) => {
    const isActive = period.is_closed === 0

    const renderUpdatePeriodStatus = () => (
      <Form.Check
        type="switch"
        id={`period_switch_${period.id}`}
        checked={isActive}
        onChange={() => handleUpdatePeriod(period, 'status')}
      />
    )

    const renderUpdatePeriodInfos = () => (
      <Popup
        title={`Update ${period.title}`}
        buttonText="Edit"
        disabled={!isActive}
        onSave={() => handleUpdatePeriod(period, 'info')}
        init={init}
      >
        <ModalPeriodContent period={period} handleInputChange={handleInputChange} />
      </Popup>
    )

    const fields = [
      period.title,
      `${period.start} ~ ${period.end}`,
      renderUpdatePeriodStatus(),
      renderUpdatePeriodInfos(),
    ]

    return fields
  })

  return <TableComponent titles={titles} rows={tableRows} />
}

PeriodTable.propTypes = {
  periods: PropTypes.instanceOf(Array).isRequired,
  handleUpdatePeriod: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
}

export default PeriodTable
