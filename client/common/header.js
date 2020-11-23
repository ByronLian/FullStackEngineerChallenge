import React, { useContext } from 'react'
import { Breadcrumb, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'
import { isAdmin } from '../utils'
import { LOGOUT, LOCAL_STORAGE_KEY } from '../contexts/constants'

const Header = () => {
  const { user, dispatch } = useContext(AuthContext)

  const isActive = (path) => {
    return window.location.pathname === path
  }

  // Logout
  const handleLogout = () => {
    dispatch({ type: LOGOUT })
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    return <Redirect to="/" />
  }

  return (
    <header>
      <br />
      <Breadcrumb>
        <div className="header">
          <h4 className="header_title">Performance Review System</h4>
          <h6 className="header_user">
            {`Hi ${user.first_name} ${user.last_name}`}
            {',  '}
            <Button variant="warning" onClick={handleLogout}>
              Logout
            </Button>
          </h6>
        </div>
        <Breadcrumb.Item href="/reviews" active={isActive('/reviews')}>
          Review Tasks
        </Breadcrumb.Item>
        {isAdmin(user) && (
          <>
            <Breadcrumb.Item href="/employees" active={isActive('/employees')}>
              Employees
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/periods" active={isActive('/periods')}>
              Manage Period
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/assign" active={isActive('/assign')}>
              Assign Review
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb>
    </header>
  )
}

export default Header
