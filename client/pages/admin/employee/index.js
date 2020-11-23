import React, { useState, useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../../contexts/authContext'
import Popup from '../../../common/modal/index'
import Header from '../../../common/header'
import { isAdmin, isLogin, isEmptyString, isEmptyArray } from '../../../utils'
import { CALL_API } from '../../../apis/interface'
import ToastComponent from '../../../common/toast'
import ModalEmployeeContent from '../../../common/modal/employee'
import EmployeeTable from './employeeTable'

const Employees = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [message, setShowToastMessage] = useState('')

  // Get all users
  useEffect(() => {
    CALL_API.USER.getUsers().then((data) => {
      setUsers(data)
    })
  }, [])

  if (!isLogin(user)) return <Redirect to="/" />
  if (!isAdmin(user)) return <Redirect to="/reviews" />
  if (isEmptyArray(users)) return null

  const handleInputChange = (e, key) => {
    switch (key) {
      case 'first_name':
        setFirstName(e.target.value)
        break
      case 'last_name':
        setLastName(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  // Reset
  const init = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  // Add new user
  const handleAddNewUser = () => {
    if (isEmptyString(password) || isEmptyString(email) || isEmptyString(firstName) || isEmptyString(lastName)) return

    CALL_API.USER.addNewUser({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    }).then(() => {
      setShowToast(true)
      setShowToastMessage('Add new employee success')

      CALL_API.USER.getUsers().then((data) => {
        setUsers(data)
      })
    })
  }

  // Update user info
  const handleUserUpdated = (user, type) => {
    const isUpdateUserStatus = type === 'status'

    const options = isUpdateUserStatus
      ? {
          active: user.active === 0 ? 1 : 0,
        }
      : {
          first_name: firstName,
          last_name: lastName,
          password,
          active: user.active,
        }

    CALL_API.USER.updateUserById(user.id, options).then(() => {
      setShowToast(true)
      setShowToastMessage(isUpdateUserStatus ? 'Update employee status success' : 'Update employee info success')

      CALL_API.USER.getUsers().then((data) => {
        setUsers(data)
      })
    })
  }

  return (
    <Container fluid="lg">
      <Header />
      <ToastComponent setShowToast={setShowToast} showToast={showToast} message={message} />
      <Popup title="Add New Employee" buttonText="+ New Employee" onSave={handleAddNewUser} block={false}>
        <ModalEmployeeContent handleInputChange={handleInputChange} />
      </Popup>
      <br />
      <br />
      <EmployeeTable
        handleInputChange={handleInputChange}
        handleUserUpdated={handleUserUpdated}
        init={init}
        users={users}
      />
    </Container>
  )
}

export default Employees
