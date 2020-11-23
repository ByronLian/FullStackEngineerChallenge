import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import Popup from '../../../common/modal/index'
import TableComponent from '../../../common/table'
import ModalEmployeeContent from '../../../common/modal/employee'
import { isAdmin } from '../../../utils'

const EmployeeTable = ({ users, handleUserUpdated, handleInputChange, init }) => {
  // Table head content
  const titles = ['Name', 'Email', 'Role', 'Action', 'Activity']
  // Table CSS class
  const classes = ['md_col', '', 'sm_col', '', 'md_col']
  // Table body content
  const tableRows = users.map((user) => {
    const isActiveUser = user.active === 1
    const name = `${user.first_name} ${user.last_name}`

    const renderUpdateUser = () => (
      <Popup
        title={`Update ${name}`}
        buttonText="Edit"
        disabled={!isActiveUser}
        onSave={() => handleUserUpdated(user, 'info')}
        init={init}
      >
        <ModalEmployeeContent handleInputChange={handleInputChange} user={user} />
      </Popup>
    )

    const renderChangeActivity = () =>
      !isAdmin(user) && (
        <Form.Check
          type="switch"
          id={`user_status_switch_${user.id}`}
          checked={isActiveUser}
          label={isActiveUser ? 'Active' : 'Inactive'}
          onChange={() => handleUserUpdated(user, 'status')}
        />
      )

    const fields = [name, user.email, user.role, renderUpdateUser(), renderChangeActivity()]

    return fields
  })

  return <TableComponent classes={classes} titles={titles} rows={tableRows} />
}

EmployeeTable.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
  handleUserUpdated: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
}

export default EmployeeTable
