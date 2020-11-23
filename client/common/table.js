import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

const TableComponent = memo(({ classes, titles, rows }) => {
  const renderTH = (title, index) => {
    return (
      <th key={`th_${title}_${index}`} className={classes[index]}>
        {title}
      </th>
    )
  }

  const renderTBODY = (row, index) => {
    return (
      <tr key={`tr_row_${index}`}>
        {row.map((field, idx) => {
          return (
            <td key={`td_row_${idx}`} className={classes[idx]}>
              {field}
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <Table hover bordered responsive>
      <thead>
        <tr className="tr_header">{titles.map(renderTH)}</tr>
      </thead>
      <tbody>{rows.map(renderTBODY)}</tbody>
    </Table>
  )
})

TableComponent.defaultProps = {
  classes: [],
  titles: [],
  rows: [],
}

TableComponent.propTypes = {
  classes: PropTypes.instanceOf(Array),
  titles: PropTypes.instanceOf(Array),
  rows: PropTypes.instanceOf(Array),
}

export default TableComponent
